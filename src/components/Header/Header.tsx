import {Alert, AlertDescription, Button, Flex, Spacer} from '@chakra-ui/react'

import {useWeb3} from 'context/Web3Provider'

export function Header() {
  const {account, connectWallet, isEthereumLoaded, isWalletConnected} =
    useWeb3()

  return (
    <Flex>
      {!isEthereumLoaded && (
        <Alert status="warning" variant="left-accent">
          <AlertDescription>
            Please enable your MetaMask wallet to use this app.
          </AlertDescription>
        </Alert>
      )}
      {isEthereumLoaded && !isWalletConnected && (
        <>
          <Spacer />
          <Button colorScheme="green" onClick={connectWallet}>
            Connect to MetaMask
          </Button>
        </>
      )}
      {account && (
        <>
          <Spacer />
          <Flex
            alignItems="center"
            bgColor="gray.200"
            borderRadius="base"
            boxShadow="base"
            fontSize="sm"
            fontWeight="semibold"
            height="10"
            paddingInline="4"
          >
            {account}
          </Flex>
        </>
      )}
    </Flex>
  )
}
