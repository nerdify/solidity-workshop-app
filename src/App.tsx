import {useEffect, useState} from 'react'

import {Alert, Button, ChakraProvider, Container, Stack} from '@chakra-ui/react'

import {MessageList} from 'components'
import theme from 'theme'

export function App() {
  const [isEthereumEnabled, setIsEthereumEnabled] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  useEffect(() => {
    // @ts-expect-error
    if (typeof window.ethereum !== 'undefined') {
      setIsEthereumEnabled(true)
    }
  }, [])

  useEffect(() => {
    if (!isEthereumEnabled) {
      return
    }

    async function getAccount() {
      // @ts-expect-error
      const accounts = await window.ethereum.request({method: 'eth_accounts'})

      if (accounts.length > 0) {
        setIsWalletConnected(true)
      }
    }

    getAccount()
  }, [isEthereumEnabled])

  useEffect(() => {
    if (!isEthereumEnabled) {
      return
    }

    function handleAccountsChanged(accounts: string[]) {
      setIsWalletConnected(accounts.length > 0)
    }

    // @ts-expect-error
    window.ethereum.on('accountsChanged', handleAccountsChanged)

    return () => {
      // @ts-expect-error
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
    }
  }, [isEthereumEnabled])

  return (
    <ChakraProvider theme={theme}>
      <Container paddingBlockStart="4">
        <Stack spacing="4">
          {!isEthereumEnabled && (
            <Alert borderRadius="base" status="warning">
              Please enable your MetaMask wallet to use this app.
            </Alert>
          )}
          {!isWalletConnected && (
            <Button colorScheme="green" onClick={handleConnect}>
              Connect to MetaMask
            </Button>
          )}
          <MessageList isWalletConnected={isWalletConnected} />
        </Stack>
      </Container>
    </ChakraProvider>
  )

  function handleConnect() {
    async function requestAccounts() {
      // const accounts =
      // @ts-expect-error
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      // if (accounts.length > 0) {
      //   setIsWalletConnected(true)
      // }
    }

    requestAccounts()
  }
}
