import {Box, HStack} from '@chakra-ui/react'
import type {StackProps} from '@chakra-ui/react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {REACTION_ICONS} from 'components/MessageList/constants'

interface ReactionSummaryProps extends StackProps {}

export function ReactionSummary(props: ReactionSummaryProps) {
  return (
    <HStack {...props}>
      {Object.entries(REACTION_ICONS).map(([name, {icon, label}]) => (
        <HStack
          bgColor="gray.100"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="full"
          height="6"
          key={name}
          paddingInline="2"
          spacing="2"
        >
          <FontAwesomeIcon fixedWidth icon={icon} size="sm" />
          <Box fontSize="xs">1</Box>
        </HStack>
      ))}
    </HStack>
  )
}
