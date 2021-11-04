import {useEffect, useState} from 'react'

import {Box, Center, HStack, Spacer, Spinner, Stack} from '@chakra-ui/react'

import {useWeb3} from 'context/Web3Provider'
import {messageTransformer} from 'utilities/web3/transformers'

import {ReactionPopover} from './components'

export function MessageList() {
  const {contract, isEthereumLoaded} = useWeb3()
  const [isLoading, setIsLoading] = useState(isEthereumLoaded)
  const [messages, setMessages] = useState<
    ReturnType<typeof messageTransformer>[]
  >([])

  useEffect(() => {
    async function loadMessages() {
      const messages = await contract?.getMessages()

      setMessages(messages.map(messageTransformer))
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
        <Box bgColor="white" borderRadius="base" boxShadow="base" key={index}>
          <HStack
            borderBottom="1px solid"
            borderBottomColor="gray.100"
            fontSize="sm"
            fontWeight="semibold"
            paddingBlock="2"
            paddingInline="4"
          >
            {message.username && (
              <>
                <Box>{message.username}</Box>
                <Box>•</Box>
              </>
            )}
            <Box isTruncated>{message.sender}</Box>
            <Spacer />
            <ReactionPopover />
          </HStack>
          <Box fontSize="sm" padding="4">
            {message.text}
          </Box>
        </Box>
      ))}
    </Stack>
  )
}
