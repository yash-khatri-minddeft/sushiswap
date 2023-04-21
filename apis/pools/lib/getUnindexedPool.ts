import { constantProductPoolAbi, uniswapV2PairAbi } from '@sushiswap/abi'
import { Protocol } from '@sushiswap/database'
import { allChains, allProviders } from '@sushiswap/wagmi-config'
import { Address, configureChains, createClient, fetchToken, FetchTokenResult, readContracts } from '@wagmi/core'

import type { getEarnPool } from './api/index.js'

const { provider } = configureChains(allChains, allProviders)

createClient({
  autoConnect: true,
  provider,
})

interface GetPoolArgs {
  chainId: number
  address: string
  protocol?: Protocol
}

interface Pool {
  tokens: Address[]
  totalSupply: string
  swapFee: number
  twapEnabled: boolean
  protocol: Protocol
}

async function getV2Pool({ chainId, address }: GetPoolArgs): Promise<Pool> {
  const [token0, token1, totalSupply] = await readContracts({
    allowFailure: false,
    contracts: [
      { address: address as Address, abi: uniswapV2PairAbi, functionName: 'token0', chainId },
      { address: address as Address, abi: uniswapV2PairAbi, functionName: 'token1', chainId },
      { address: address as Address, abi: uniswapV2PairAbi, functionName: 'totalSupply', chainId },
    ],
  })

  return {
    tokens: [token0, token1],
    totalSupply: totalSupply.toString(),
    swapFee: 0.003,
    twapEnabled: true,
    protocol: Protocol.BENTOBOX_CLASSIC,
  }
}

async function getTridentPool({ chainId, address, protocol }: GetPoolArgs): Promise<Pool> {
  if (!protocol) throw new Error('Protocol is required for Trident pools.')
  // These methods should be identical for all pool types
  const [token0, token1, totalSupply, swapFee] = await readContracts({
    allowFailure: false,
    contracts: [
      { address: address as Address, abi: constantProductPoolAbi, functionName: 'token0', chainId },
      { address: address as Address, abi: constantProductPoolAbi, functionName: 'token1', chainId },
      { address: address as Address, abi: constantProductPoolAbi, functionName: 'totalSupply', chainId },
      { address: address as Address, abi: constantProductPoolAbi, functionName: 'swapFee', chainId },
    ],
  })

  return {
    tokens: [token0, token1],
    totalSupply: totalSupply.toString(),
    // 30 => 0.003%
    swapFee: swapFee.toNumber() / 10000,
    twapEnabled: true,
    protocol
  }
}

// Thought ReturnType would be enough, needed to wrap it to make TS happy
export async function getUnindexedPool(poolId: string): Promise<Awaited<ReturnType<typeof getEarnPool>>> {
  const [chainId, address] = [Number(poolId.split(':')[0]), poolId.split(':')[1]]
  if (!chainId || !address) throw new Error('Invalid pool id.')

  const { name: lpTokenName } = await fetchToken({ address: address as Address, chainId })

  let protocol: Protocol
  let pool: Pool
  switch (lpTokenName) {
    case 'Sushi Stable LP Token':
      protocol = Protocol.BENTOBOX_STABLE
      pool = await getTridentPool({ chainId, address, protocol })
      break
    case 'Sushi Constant Product LP Token':
      protocol = Protocol.BENTOBOX_CLASSIC
      pool = await getTridentPool({ chainId, address, protocol })
      break;
    case 'SushiSwap LP Token':
      protocol = Protocol.SUSHISWAP_V2
      pool = await getV2Pool({ chainId, address })
      break
    default:
      throw new Error('Pool type not found.')
  }

  const tokens = await Promise.all(pool.tokens.map((token) => fetchToken({ address: token, chainId })))
  const poolName = tokens.map(({ symbol }) => symbol).join('-')
  const [token0, token1] = tokens as [FetchTokenResult, FetchTokenResult]

  return {
    id: poolId,
    address,
    name: poolName,
    chainId: Number(chainId),
    token0: {
      id: `${chainId}:${token0.address.toLowerCase()}`,
      address: token0.address.toLowerCase(),
      symbol: token0.symbol,
      name: token0.name,
      decimals: token0.decimals,
    },
    token1: {
      id: `${chainId}:${token1.address.toLowerCase()}`,
      address: token1.address.toLowerCase(),
      symbol: token1.symbol,
      name: token1.name,
      decimals: token1.decimals,
    },
    liquidityUSD: '0',
    volumeUSD: '0',
    feeApr1h: 0,
    feeApr1d: 0,
    feeApr1w: 0,
    feeApr1m: 0,
    totalApr1h: 0,
    totalApr1d: 0,
    totalApr1w: 0,
    totalApr1m: 0,
    incentiveApr: 0,
    isIncentivized: false,
    wasIncentivized: false,
    volume1h: '0',
    volume1d: '0',
    volume1w: '0',
    volume1m: '0',
    fees1h: '0',
    fees1d: '0',
    fees1w: '0',
    fees1m: '0',
    isBlacklisted: false,
    incentives: [],
    ...pool,
  } as Awaited<ReturnType<typeof getEarnPool>>
}
