import {useEffect, useState} from 'react'

import {Center, Spinner, Stack} from '@chakra-ui/react'

import {useWeb3} from 'context/Web3Provider'
import {messageTransformer} from 'utilities/web3/transformers'

import {Item} from './components'

export function MessageList() {
  const {contract, isEthereumLoaded} = useWeb3()
  const [isLoading, setIsLoading] = useState(isEthereumLoaded)
  const [messages, setMessages] = useState<
    ReturnType<typeof messageTransformer>[]
  >([])

  useEffect(() => {
    function handleMessageCreated(message: ContractMessage) {
      setMessages([messageTransformer(message), ...messages])
    }

    if (isEthereumLoaded) {
      contract?.on('MessageCreated', handleMessageCreated)
    }

    return () => {
      if (isEthereumLoaded) {
        contract?.removeListener('MessageCreated', handleMessageCreated)
      }
    }
  }, [contract, isEthereumLoaded, messages])

  useEffect(() => {
    async function loadMessages() {
      const messages = await contract?.getMessages()

      setMessages([...messages.map(messageTransformer).reverse()])
      setIsLoading(false)
    }

    if (isEthereumLoaded) {
      loadMessages()
    }
  }, [contract, isEthereumLoaded])

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }

  return (
    <Stack spacing="4">
      {messages.map((message, index) => (
        <Item key={index} message={message} />
      ))}
    </Stack>
  )
}
