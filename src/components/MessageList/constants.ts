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

export const REACTION_ICONS = {
  'thumbs-up': {
    icon: fadThumbsUp,
    label: `thumbs up`,
  },
  'thumbs-down': {
    icon: fadThumbsDown,
    label: `thumbs down`,
  },
  'face-smile': {
    icon: fadFaceSmile,
    label: `laugh`,
  },
  'party-horn': {
    icon: fadPartyHorn,
    label: `hooray`,
  },
  'face-confused': {
    icon: fadFaceConfused,
    label: `confused`,
  },
  heart: {
    icon: fadHeart,
    label: `heart`,
  },
  'rocket-launch': {
    icon: fadRocketLaunch,
    label: `rocket`,
  },
  eyes: {
    icon: fadEyes,
    label: `eyes`,
  },
}
