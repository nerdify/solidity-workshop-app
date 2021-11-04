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
import {
  faEyes as fadEyes,
  faFaceConfused as fadFaceConfused,
  faFaceSmile as fadFaceSmile,
  faHeart as fadHeart,
  faPartyHorn as fadPartyHorn,
  faRocketLaunch as fadRocketLaunch,
  faThumbsDown as fadThumbsDown,
  faThumbsUp as fadThumbsUp,
} from '@fortawesome/pro-duotone-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const REACTION_ICONS = [
  {
    icon: fadThumbsUp,
    label: `thumbs up`,
    name: 'thumbs-up',
  },
  {
    icon: fadThumbsDown,
    label: `thumbs down`,
    name: 'thumbs-down',
  },
  {
    icon: fadFaceSmile,
    label: `laugh`,
    name: 'face-smile',
  },
  {
    icon: fadPartyHorn,
    label: `hooray`,
    name: 'party-horn',
  },
  {
    icon: fadFaceConfused,
    label: `confused`,
    name: 'face-confused',
  },
  {
    icon: fadHeart,
    label: `heart`,
    name: 'heart',
  },
  {
    icon: fadRocketLaunch,
    label: `rocket`,
    name: 'rocket-launch',
  },
  {
    icon: fadEyes,
    label: `eyes`,
    name: 'eyes',
  },
]

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
            {REACTION_ICONS.map((icon) => (
              <Box
                as="button"
                aria-label={`React with ${icon.label} emoji`}
                boxSize="8"
                key={icon.name}
                _hover={{
                  '& > svg': {
                    transform: 'scale(1.25)',
                  },
                }}
              >
                <Box
                  as={FontAwesomeIcon}
                  fixedWidth
                  icon={icon.icon}
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
