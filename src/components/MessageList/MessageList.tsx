import {ethers} from 'ethers'
import {FastField, Form, Formik, FormikHelpers} from 'formik'

import {Button, Stack, Textarea} from '@chakra-ui/react'

import ChatJSON from 'Chat.json'

interface MessageListProps {
  isWalletConnected: boolean
}

interface Values {
  message: string
}

export function MessageList({isWalletConnected}: MessageListProps) {
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
        <Button colorScheme="blue" disabled={!isWalletConnected} type="submit">
          Send Message
        </Button>
      </Stack>
    </Formik>
  )

  async function handleSubmit(
    values: Values,
    formikBag: FormikHelpers<Values>
  ) {
    console.log(`values: `, values)
    // @ts-expect-error
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS as string,
      ChatJSON.abi,
      signer
    )

    const txn = await contract['createMessage(string,string)'](
      values.message,
      'hosmelq'
    )

    await txn.wait()

    const messages = await contract.getMessages()
    console.log(`messages: `, messages)

    formikBag.resetForm()
  }
}
