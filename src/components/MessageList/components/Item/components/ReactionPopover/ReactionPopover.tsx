import {
  Box,
  SimpleGrid,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'
import {faFaceSmile as falFaceSmile} from '@fortawesome/pro-light-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {REACTION_ICONS} from 'components/MessageList/constants'

export function ReactionPopover() {
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Box
          as="button"
          aria-label="Pick your reaction"
          _hover={{
            color: `blue.500`,
          }}
        >
          <FontAwesomeIcon fixedWidth icon={falFaceSmile} size="lg" />
        </Box>
      </PopoverTrigger>
      <PopoverContent width="auto">
        <PopoverArrow />
        <PopoverBody paddingInline="2">
          <SimpleGrid columns={4}>
            {Object.entries(REACTION_ICONS).map(([name, {icon, label}]) => (
              <Box
                as="button"
                aria-label={`React with ${label} emoji`}
                boxSize="8"
                key={name}
                _hover={{
                  '& > svg': {
                    transform: 'scale(1.25)',
                  },
                }}
              >
                <Box
                  as={FontAwesomeIcon}
                  fixedWidth
                  icon={icon}
                  transition="transform 0.15s"
                />
              </Box>
            ))}
          </SimpleGrid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

// Undo reaction with ${icon.label} emoji
