import {Box, HStack, Text, Spacer, Stack} from '@chakra-ui/react'

import {
  ReactionPopover,
  // ReactionSummary
} from './components'

interface ItemProps {
  message: {
    sender: string
    text: string
    username: string | null
  }
}

export function Item({message}: ItemProps) {
  return (
    <Box
      bgColor="white"
      borderRadius="base"
      boxShadow="base"
      position="relative"
    >
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
      <Stack padding="4" spacing="4">
        <Text fontSize="sm" whiteSpace="pre-line">
          {message.text}
        </Text>
        {/* <ReactionSummary /> */}
      </Stack>
    </Box>
  )
}
