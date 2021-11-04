import {FastField, Form, Formik, FormikHelpers} from 'formik'
import {useState} from 'react'

import {Button, Stack, Textarea} from '@chakra-ui/react'

import {useWeb3} from 'context/Web3Provider'

interface Values {
  message: string
}

export function MessageForm() {
  const [isWaitingForConfirmation, setIsWaitingForConfirmation] =
    useState(false)
  const [isWaitingForTransaction, setIsWaitingForTransaction] = useState(false)
  const {contract, isWalletConnected} = useWeb3()

  const loadingText = isWaitingForConfirmation
    ? 'Waiting for confirmation'
    : isWaitingForTransaction
    ? 'Waiting transaction to be mined'
    : ''

  return (
    <Formik
      initialValues={{
        message: '',
      }}
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
              disabled={!isWalletConnected}
              placeholder="Type a message..."
            />
          )}
        </FastField>
        <Button
          colorScheme="blue"
          disabled={!isWalletConnected}
          isLoading={isWaitingForConfirmation || isWaitingForTransaction}
          loadingText={loadingText}
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
    setIsWaitingForConfirmation(true)

    const txn = await contract?.['createMessage(string,string)'](
      values.message,
      'hosmelq'
    )

    setIsWaitingForConfirmation(false)
    setIsWaitingForTransaction(true)

    await txn.wait()

    formikBag.resetForm()
    setIsWaitingForTransaction(false)
  }
}
