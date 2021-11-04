import {FastField, Form, Formik} from 'formik'
import type {FormikHelpers, FormikProps} from 'formik'
import {useRef} from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'

import {Button, Stack, Textarea} from '@chakra-ui/react'
import {asLayoutEffect, useMachine} from '@xstate/react'

import {useWeb3} from 'context/Web3Provider'

import {createMessageMachine} from './createMessageMachine'

interface Values {
  message: string
}

export function MessageForm() {
  const formikRef = useRef<FormikProps<Values>>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const {contract, isWalletConnected} = useWeb3()
  const [createMessageState, sendToCreateMachine] = useMachine(
    createMessageMachine,
    {
      actions: {
        resetForm: asLayoutEffect(() => {
          formikRef.current?.resetForm()
          textareaRef.current?.focus()
        }),
      },
      services: {
        confirmTransaction: (ctx, event) => {
          return contract?.['createMessage(string)'](event.values.message)
        },
        confirmMined: (ctx, event) => {
          return event.data.wait()
        },
      },
    }
  )

  return (
    <Formik
      initialValues={{
        message: '',
      }}
      innerRef={formikRef}
      onSubmit={handleSubmit}
    >
      <Stack
        as={Form}
        bgColor="white"
        borderRadius="base"
        boxShadow="base"
        padding="4"
        spacing="4"
      >
        <FastField name="message">
          {({field}) => (
            <Textarea
              {...field}
              as={ReactTextareaAutosize}
              autoFocus
              disabled={
                !isWalletConnected ||
                createMessageState.matches('waitingForConfirmation') ||
                createMessageState.matches('waitingForTransaction')
              }
              placeholder="Type a message..."
              ref={textareaRef}
            />
          )}
        </FastField>
        <Button
          colorScheme="blue"
          disabled={!isWalletConnected}
          isLoading={
            createMessageState.matches('waitingForConfirmation') ||
            createMessageState.matches('waitingForTransaction')
          }
          loadingText={
            createMessageState.meta[`createMessage.${createMessageState.value}`]
              ?.loadingText
          }
          type="submit"
        >
          Send Message
        </Button>
      </Stack>
    </Formik>
  )

  async function handleSubmit(
    values: Values,
    formikBag: FormikHelpers<Values>
  ) {
    sendToCreateMachine({
      type: `SUBMIT`,
      values,
    })
  }
}
