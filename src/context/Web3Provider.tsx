import {ethers} from 'ethers'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {Center, Spinner} from '@chakra-ui/react'

import ChatJSON from 'Chat.json'

interface Web3ContextInterface {
  account: string | null
  chainId: number | null
  connectWallet(): void
  contract: ethers.Contract | null
  isEthereumLoaded: boolean
  isWalletConnected: boolean
}

const Web3Context = createContext<Web3ContextInterface>({
  account: null,
  chainId: null,
  connectWallet() {},
  contract: null,
  isEthereumLoaded: false,
  isWalletConnected: false,
})

interface Web3ProviderProps {
  children: ReactNode
}

export function Web3Provider({children}: Web3ProviderProps) {
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [isEthereumLoaded, setIsEthereumLoaded] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const {ethereum} = window as any

    async function createContract() {
      const provider = new ethers.providers.Web3Provider(ethereum)
      let signerOrProvider:
        | ethers.providers.JsonRpcSigner
        | ethers.providers.Web3Provider = provider

      if (account) {
        signerOrProvider = provider.getSigner()
      }

      const contract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS as string,
        ChatJSON.abi,
        signerOrProvider
      )

      setContract(contract)
    }

    async function getChainId() {
      const chainId = await ethereum.request({method: 'eth_chainId'})

      if (chainId) {
        setChainId(chainId)
      }
    }

    async function getConnectedAccount() {
      const accounts = await ethereum.request({method: 'eth_accounts'})

      if (accounts.length > 0) {
        setAccount(accounts[0])
      }
    }

    async function handleAccountsChanged(acconts: string[]) {
      setAccount(acconts?.[0] ?? null)
    }

    async function handleChainChanged(chainId: number) {
      setChainId(chainId)
    }

    async function loadWeb3() {
      setIsEthereumLoaded(true)

      createContract()
      await getChainId()
      await getConnectedAccount()

      setIsLoading(false)

      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('chainChanged', handleChainChanged)
    }

    if (ethereum) {
      loadWeb3()
    } else {
      setIsLoading(false)
    }

    return () => {
      if (ethereum) {
        ethereum.removeListener('accountsChanged', handleAccountsChanged)
        ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [account])

  const handleConnectWallet = useCallback(async () => {
    try {
      // @ts-expect-error
      await window.ethereum.request({method: 'eth_requestAccounts'})
    } catch (error) {
      console.log(`error: `, error)
    }
  }, [])

  const value = useMemo(() => {
    return {
      account,
      chainId,
      connectWallet: handleConnectWallet,
      contract,
      isEthereumLoaded,
      isWalletConnected: !!account,
    }
  }, [account, chainId, contract, handleConnectWallet, isEthereumLoaded])

  if (isLoading) {
    return (
      <Center paddingBlock="8">
        <Spinner size="lg" />
      </Center>
    )
  }

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

export function useWeb3() {
  const context = useContext(Web3Context)

  if (context === null) {
    throw new Error('useWeb3 must be used within a Web3Provider.')
  }

  return context
}
