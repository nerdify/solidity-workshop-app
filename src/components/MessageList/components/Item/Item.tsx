import {Box, HStack, Spacer} from '@chakra-ui/react'

import {ReactionPopover} from './components'

interface ItemProps {
  message: {
    sender: string
    text: string
    username: string | null
  }
}

export function Item({message}: ItemProps) {
  return (
    <Box bgColor="white" borderRadius="base" boxShadow="base">
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
  )
}
