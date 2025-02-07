import { Token } from 'sushi/currency'

import { FeeAmount } from '../constants'
import { encodeSqrtRatioX96 } from '../utils/encodeSqrtRatioX96'
import { NonfungiblePositionManager, Staker, SushiSwapV3Pool } from '.'

describe.skip('Staker', () => {
  const reward = new Token({
    chainId: 1,
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    decimals: 18,
    symbol: 'r',
    name: 'reward',
  })
  const token0 = new Token({
    chainId: 1,
    address: '0x0000000000000000000000000000000000000001',
    decimals: 18,
    symbol: 't0',
    name: 'token0',
  })
  const token1 = new Token({
    chainId: 1,
    address: '0x0000000000000000000000000000000000000002',
    decimals: 18,
    symbol: 't1',
    name: 'token1',
  })

  const pool_0_1 = new SushiSwapV3Pool(
    token0,
    token1,
    FeeAmount.MEDIUM,
    encodeSqrtRatioX96(1, 1),
    0,
    0,
    [],
  )

  const incentiveKey = {
    rewardToken: reward,
    pool: pool_0_1,
    startTime: 100,
    endTime: 200,
    refundee: '0x0000000000000000000000000000000000000001',
  }

  const incentiveKeys = [incentiveKey]
  incentiveKeys.push({
    rewardToken: reward,
    pool: pool_0_1,
    startTime: 50,
    endTime: 100,
    refundee: '0x0000000000000000000000000000000000000089',
  })

  const recipient = '0x0000000000000000000000000000000000000003'
  const sender = '0x0000000000000000000000000000000000000004'
  const tokenId = 1

  describe('#collectRewards', () => {
    it('succeeds with amount', () => {
      const { calldata, value } = Staker.collectRewards(incentiveKey, {
        tokenId: tokenId,
        recipient: recipient,
        amount: 1,
      })

      expect(calldata).toEqual(
        '0xac9650d80000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000c4f549ab420000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000004fa63b0dea87d2cd519f3b67a5ddb145779b7bd2000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c8000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000642f2d783d0000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f984000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c4f2d2909b0000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000004fa63b0dea87d2cd519f3b67a5ddb145779b7bd2000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c80000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000',
      )
      expect(value).toEqual('0x00')
    })

    it('succeeds no amount', () => {
      const { calldata, value } = Staker.collectRewards(incentiveKey, {
        tokenId: tokenId,
        recipient: recipient,
      })

      expect(calldata).toEqual(
        '0xac9650d80000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000c4f549ab420000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000004fa63b0dea87d2cd519f3b67a5ddb145779b7bd2000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c8000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000642f2d783d0000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f984000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c4f2d2909b0000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000004fa63b0dea87d2cd519f3b67a5ddb145779b7bd2000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c80000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000',
      )
      expect(value).toEqual('0x00')
    })
    it('succeeds multiple keys', () => {
      const { calldata, value } = Staker.collectRewards(incentiveKeys, {
        tokenId: tokenId,
        recipient: recipient,
      })

      expect(calldata).toEqual(
        '0xac9650d80000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000000000000026000000000000000000000000000000000000000000000000000000000000003600000000000000000000000000000000000000000000000000000000000000460000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000000c4f549ab420000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000004fa63b0dea87d2cd519f3b67a5ddb145779b7bd2000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c8000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000642f2d783d0000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f984000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c4f2d2909b0000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000004fa63b0dea87d2cd519f3b67a5ddb145779b7bd2000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c8000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c4f549ab420000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000004fa63b0dea87d2cd519f3b67a5ddb145779b7bd200000000000000000000000000000000000000000000000000000000000000320000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000008900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000642f2d783d0000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f984000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c4f2d2909b0000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000004fa63b0dea87d2cd519f3b67a5ddb145779b7bd2000000000000000000000000000000000000000000000000000000000000003200000000000000000000000000000000000000000000000000000000000000640000000000000000000000000000000000000000000000000000000000000089000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000',
      )
      expect(value).toEqual('0x00')
    })
  })
  describe('#withdrawToken', () => {
    it('succeeds with one keys', () => {
      const { calldata, value } = Staker.withdrawToken(incentiveKey, {
        tokenId: tokenId,
        recipient: recipient,
        amount: 0,
        owner: sender,
        data: '0x0000000000000000000000000000000000000008',
      })

      expect(calldata).toEqual(
        '0xac9650d80000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000c4f549ab420000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000004fa63b0dea87d2cd519f3b67a5ddb145779b7bd2000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c8000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000642f2d783d0000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f984000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a43c423f0b0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000',
      )
      expect(value).toEqual('0x00')
    })

    it('succeeds with multiple keys', () => {
      const { calldata, value } = Staker.withdrawToken(incentiveKeys, {
        tokenId: tokenId,
        recipient: recipient,
        amount: 0,
        owner: sender,
        data: '0x0000000000000000000000000000000000000008',
      })

      expect(calldata).toEqual(
        '0xac9650d80000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000240000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000003e000000000000000000000000000000000000000000000000000000000000000c4f549ab420000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000004fa63b0dea87d2cd519f3b67a5ddb145779b7bd2000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c8000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000642f2d783d0000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f984000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c4f549ab420000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000004fa63b0dea87d2cd519f3b67a5ddb145779b7bd200000000000000000000000000000000000000000000000000000000000000320000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000008900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000642f2d783d0000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f984000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a43c423f0b0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000',
      )
      expect(value).toEqual('0x00')
    })
  })

  describe('#encodeDeposit', () => {
    it('succeeds single key', () => {
      const deposit = Staker.encodeDeposit(incentiveKey)

      expect(deposit).toEqual(
        '0x0000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000004fa63b0dea87d2cd519f3b67a5ddb145779b7bd2000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c80000000000000000000000000000000000000000000000000000000000000001',
      )
    })

    it('succeeds multiple keys', () => {
      const deposit = Staker.encodeDeposit(incentiveKeys)

      expect(deposit).toEqual(
        '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000004fa63b0dea87d2cd519f3b67a5ddb145779b7bd2000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c800000000000000000000000000000000000000000000000000000000000000010000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000004fa63b0dea87d2cd519f3b67a5ddb145779b7bd2000000000000000000000000000000000000000000000000000000000000003200000000000000000000000000000000000000000000000000000000000000640000000000000000000000000000000000000000000000000000000000000089',
      )
    })
  })

  describe('#safeTransferFrom with correct data for staker', () => {
    it('succeeds', () => {
      const data = Staker.encodeDeposit(incentiveKey)

      const options = {
        sender,
        recipient,
        tokenId,
        data,
      }
      const { calldata, value } =
        NonfungiblePositionManager.safeTransferFromParameters(options)

      expect(calldata).toEqual(
        '0xb88d4fde000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000004fa63b0dea87d2cd519f3b67a5ddb145779b7bd2000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c80000000000000000000000000000000000000000000000000000000000000001',
      )
      expect(value).toEqual('0x00')
    })
  })
})
