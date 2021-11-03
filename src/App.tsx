import {ChakraProvider} from '@chakra-ui/react'

import {MessageList} from 'components'
import theme from 'theme'

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <MessageList />
    </ChakraProvider>
  )
}
