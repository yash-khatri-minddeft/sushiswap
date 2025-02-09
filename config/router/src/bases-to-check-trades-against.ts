import { ChainId } from 'sushi/chain'
import {
  DAI,
  FRAX,
  LINK,
  LUSD,
  MATIC,
  MIM,
  NFTX,
  OHM,
  QUICK,
  SUSHI,
  Token,
  USDC,
  USDT,
  WBTC,
  WETH9,
  WNATIVE,
} from 'sushi/currency'

export const BASES_TO_CHECK_TRADES_AGAINST: {
  readonly [chainId: number]: Token[]
} = {
  [ChainId.ETHEREUM]: [
    WNATIVE[ChainId.ETHEREUM],
    WBTC[ChainId.ETHEREUM],
    USDC[ChainId.ETHEREUM],
    USDT[ChainId.ETHEREUM],
    DAI[ChainId.ETHEREUM],
    MIM[ChainId.ETHEREUM],
    FRAX[ChainId.ETHEREUM],
    OHM[ChainId.ETHEREUM],
    NFTX[ChainId.ETHEREUM],
    LINK[ChainId.ETHEREUM],
    SUSHI[ChainId.ETHEREUM],
  ],
  [ChainId.RINKEBY]: [WNATIVE[ChainId.RINKEBY], USDC[ChainId.RINKEBY]],
  [ChainId.KOVAN]: [WNATIVE[ChainId.KOVAN], USDC[ChainId.KOVAN]],
  [ChainId.POLYGON]: [
    WNATIVE[ChainId.POLYGON],
    WETH9[ChainId.POLYGON],
    WBTC[ChainId.POLYGON],
    USDC[ChainId.POLYGON],
    USDT[ChainId.POLYGON],
    DAI[ChainId.POLYGON],
    MIM[ChainId.POLYGON],
    FRAX[ChainId.POLYGON],
    QUICK[ChainId.POLYGON],
    new Token({
      chainId: ChainId.POLYGON,
      address: '0x2F800Db0fdb5223b3C3f354886d907A671414A7F',
      decimals: 18,
      name: 'Toucan Protocol: Base Carbon Tonne',
      symbol: 'BCT',
    }),
  ],
  [ChainId.POLYGON_TESTNET]: [
    WNATIVE[ChainId.POLYGON_TESTNET],
    USDC[ChainId.POLYGON_TESTNET],
  ],
  [ChainId.FANTOM]: [
    WNATIVE[ChainId.FANTOM],
    WETH9[ChainId.FANTOM],
    WBTC[ChainId.FANTOM],
    USDC[ChainId.FANTOM],
    USDT[ChainId.FANTOM],
    DAI[ChainId.FANTOM],
    MIM[ChainId.FANTOM],
    FRAX[ChainId.FANTOM],
  ],
  [ChainId.GNOSIS]: [
    WNATIVE[ChainId.GNOSIS],
    USDC[ChainId.GNOSIS],
    USDT[ChainId.GNOSIS],
    DAI[ChainId.GNOSIS],
  ],
  [ChainId.BSC]: [
    WNATIVE[ChainId.BSC],
    WETH9[ChainId.BSC],
    USDC[ChainId.BSC],
    USDT[ChainId.BSC],
    DAI[ChainId.BSC],
    MIM[ChainId.BSC],
    FRAX[ChainId.BSC],
  ],
  [ChainId.ARBITRUM]: [
    WNATIVE[ChainId.ARBITRUM],
    WBTC[ChainId.ARBITRUM],
    USDC[ChainId.ARBITRUM],
    USDT[ChainId.ARBITRUM],
    DAI[ChainId.ARBITRUM],
    // MIM[ChainId.ARBITRUM],
    // FRAX[ChainId.ARBITRUM],
    // new Token({
    //   chainId: ChainId.ARBITRUM,
    //   address: '0x539bdE0d7Dbd336b79148AA742883198BBF60342',
    //   decimals: 18,
    //   symbol: 'MAGIC',
    //   name: 'MAGIC',
    // }),
    // new Token({
    //   chainId: ChainId.ARBITRUM,
    //   address: '0x8D9bA570D6cb60C7e3e0F31343Efe75AB8E65FB1',
    //   decimals: 18,
    //   symbol: 'gOHM',
    //   name: 'Governance OHM',
    // }),
  ],
  [ChainId.ARBITRUM_NOVA]: [
    WNATIVE[ChainId.ARBITRUM_NOVA],
    WBTC[ChainId.ARBITRUM_NOVA],
    USDC[ChainId.ARBITRUM_NOVA],
    USDT[ChainId.ARBITRUM_NOVA],
    DAI[ChainId.ARBITRUM_NOVA],
  ],
  [ChainId.AVALANCHE]: [
    WNATIVE[ChainId.AVALANCHE],
    WETH9[ChainId.AVALANCHE],
    WBTC[ChainId.AVALANCHE],
    new Token({
      chainId: ChainId.AVALANCHE,
      address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
      decimals: 18,
      symbol: 'USDC.e',
      name: 'USD Coin',
    }),
    USDC[ChainId.AVALANCHE],
    USDT[ChainId.AVALANCHE],
    new Token({
      chainId: ChainId.AVALANCHE,
      address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
      decimals: 18,
      symbol: 'USDT.e',
      name: 'Tether USD',
    }),
    DAI[ChainId.AVALANCHE],
    MIM[ChainId.AVALANCHE],
    FRAX[ChainId.AVALANCHE],
    new Token({
      chainId: ChainId.AVALANCHE,
      address: '0x0da67235dD5787D67955420C84ca1cEcd4E5Bb3b',
      decimals: 18,
      name: 'Wrapped MEMO',
      symbol: 'WMEMO',
    }),
  ],

  [ChainId.HECO]: [
    WNATIVE[ChainId.HECO],
    USDC[ChainId.HECO],
    USDT[ChainId.HECO],
    DAI[ChainId.HECO],
  ],
  [ChainId.HARMONY]: [
    WNATIVE[ChainId.HARMONY],
    USDC[ChainId.HARMONY],
    USDT[ChainId.HARMONY],
    DAI[ChainId.HARMONY],
    FRAX[ChainId.HARMONY],
  ],
  [ChainId.OKEX]: [
    WNATIVE[ChainId.OKEX],
    USDC[ChainId.OKEX],
    USDT[ChainId.OKEX],
    DAI[ChainId.OKEX],
  ],
  [ChainId.CELO]: [
    WNATIVE[ChainId.CELO],
    USDC[ChainId.CELO],
    USDT[ChainId.CELO],
    DAI[ChainId.CELO],
    new Token({
      chainId: ChainId.CELO,
      address: '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73',
      decimals: 18,
      symbol: 'cEUR',
      name: 'Celo Euro',
    }),
    new Token({
      chainId: ChainId.CELO,
      address: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
      decimals: 18,
      symbol: 'cUSD',
      name: 'Celo Dollar',
    }),
    new Token({
      chainId: ChainId.CELO,
      address: '0x2DEf4285787d58a2f811AF24755A8150622f4361',
      decimals: 18,
      symbol: 'cETH',
      name: 'Celo Ether',
    }),
    new Token({
      chainId: ChainId.CELO,
      address: '0xD629eb00dEced2a080B7EC630eF6aC117e614f1b',
      decimals: 18,
      symbol: 'cBTC',
      name: 'Celo Bitcoin',
    }),
  ],
  [ChainId.PALM]: [WNATIVE[ChainId.PALM]],
  [ChainId.MOONRIVER]: [
    WNATIVE[ChainId.MOONRIVER],
    USDC[ChainId.MOONRIVER],
    USDT[ChainId.MOONRIVER],
    DAI[ChainId.MOONRIVER],
    MIM[ChainId.MOONRIVER],
    FRAX[ChainId.MOONRIVER],
  ],
  [ChainId.FUSE]: [
    WNATIVE[ChainId.FUSE],
    USDC[ChainId.FUSE],
    USDT[ChainId.FUSE],
    DAI[ChainId.FUSE],
  ],
  [ChainId.TELOS]: [
    WNATIVE[ChainId.TELOS],
    USDC[ChainId.TELOS],
    USDT[ChainId.TELOS],
  ],
  [ChainId.MOONBEAM]: [
    WNATIVE[ChainId.MOONBEAM],
    USDC[ChainId.MOONBEAM],
    USDT[ChainId.MOONBEAM],
    DAI[ChainId.MOONBEAM],
    FRAX[ChainId.MOONBEAM],
  ],
  [ChainId.OPTIMISM]: [
    WNATIVE[ChainId.OPTIMISM],
    WBTC[ChainId.OPTIMISM],
    USDC[ChainId.OPTIMISM],
    USDT[ChainId.OPTIMISM],
    DAI[ChainId.OPTIMISM],
    LUSD[ChainId.OPTIMISM],
    FRAX[ChainId.OPTIMISM],
  ],
  [ChainId.KAVA]: [
    WNATIVE[ChainId.KAVA],
    WETH9[ChainId.KAVA],
    WBTC[ChainId.KAVA],
    USDC[ChainId.KAVA],
    USDT[ChainId.KAVA],
    DAI[ChainId.KAVA],
  ],
  [ChainId.METIS]: [WNATIVE[ChainId.METIS]],
  [ChainId.BOBA]: [
    WNATIVE[ChainId.BOBA],
    WBTC[ChainId.BOBA],
    USDC[ChainId.BOBA],
    USDT[ChainId.BOBA],
    DAI[ChainId.BOBA],
    FRAX[ChainId.BOBA],
  ],
  [ChainId.BOBA_AVAX]: [
    WNATIVE[ChainId.BOBA_AVAX],
    new Token({
      chainId: ChainId.BOBA_AVAX,
      address: '0x4200000000000000000000000000000000000023',
      decimals: 18,
      symbol: 'AVAX',
      name: 'Avax',
    }),
    USDT[ChainId.BOBA_AVAX],
    USDC[ChainId.BOBA_AVAX],
  ],
  [ChainId.BOBA_BNB]: [
    WNATIVE[ChainId.BOBA_BNB],
    new Token({
      chainId: ChainId.BOBA_BNB,
      address: '0x4200000000000000000000000000000000000023',
      decimals: 18,
      symbol: 'BNB',
      name: 'Binance Coin',
    }),
    USDT[ChainId.BOBA_BNB],
    USDC[ChainId.BOBA_BNB],
  ],
  [ChainId.BTTC]: [
    WNATIVE[ChainId.BTTC],
    WETH9[ChainId.BTTC],
    USDC[ChainId.BTTC],
    USDT[ChainId.BTTC],
  ],
  [ChainId.POLYGON_ZKEVM]: [
    WNATIVE[ChainId.POLYGON_ZKEVM],
    MATIC[ChainId.POLYGON_ZKEVM],
    USDC[ChainId.POLYGON_ZKEVM],
    USDT[ChainId.POLYGON_ZKEVM],
    DAI[ChainId.POLYGON_ZKEVM],
    WBTC[ChainId.POLYGON_ZKEVM],
  ],
  [ChainId.THUNDERCORE]: [
    WNATIVE[ChainId.THUNDERCORE],
    WETH9[ChainId.THUNDERCORE],
    WBTC[ChainId.THUNDERCORE],
    USDC[ChainId.THUNDERCORE],
    USDT[ChainId.THUNDERCORE],
  ],
  [ChainId.HAQQ]: [
    WNATIVE[ChainId.HAQQ],
    WETH9[ChainId.HAQQ],
    WBTC[ChainId.HAQQ],
    USDC[ChainId.HAQQ],
    USDT[ChainId.HAQQ],
    DAI[ChainId.HAQQ],
  ],
  [ChainId.CORE]: [
    WNATIVE[ChainId.CORE],
    WETH9[ChainId.CORE],
    USDC[ChainId.CORE],
    USDT[ChainId.CORE],
  ],
  [ChainId.ZKSYNC_ERA]: [
    WNATIVE[ChainId.ZKSYNC_ERA],
    WBTC[ChainId.ZKSYNC_ERA],
    USDC[ChainId.ZKSYNC_ERA],
  ],
  [ChainId.LINEA]: [
    WNATIVE[ChainId.LINEA],
    USDC[ChainId.LINEA],
    DAI[ChainId.LINEA],
  ],
  [ChainId.BASE]: [
    WNATIVE[ChainId.BASE],
    USDC[ChainId.BASE],
    DAI[ChainId.BASE],
  ],
  [ChainId.SCROLL]: [
    WNATIVE[ChainId.SCROLL],
    WBTC[ChainId.SCROLL],
    USDC[ChainId.SCROLL],
    USDT[ChainId.SCROLL],
  ],
}
