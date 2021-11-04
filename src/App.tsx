import {ChakraProvider, Container, Stack} from '@chakra-ui/react'

import {Header, MessageForm, MessageList} from 'components'
import {Web3Provider} from 'context/Web3Provider'
import theme from 'theme'

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Web3Provider>
        <Container paddingBlockEnd="8" paddingBlockStart="4">
          <Stack spacing="4">
            <Header />
            <MessageForm />
            <MessageList />
          </Stack>
        </Container>
      </Web3Provider>
    </ChakraProvider>
  )
}
