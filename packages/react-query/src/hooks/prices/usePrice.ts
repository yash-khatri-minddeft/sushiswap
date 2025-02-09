import { useQuery } from '@tanstack/react-query'
import { Fraction } from 'sushi/math'
import { parseUnits } from 'viem'

interface UsePrice {
  chainId: number | undefined
  address: string | undefined
}

export const usePrice = ({ chainId, address }: UsePrice) => {
  return useQuery({
    queryKey: [`https://token-price.sushi.com/v1/${chainId}/${address}`],
    queryFn: async () => {
      const data = await fetch(
        `https://token-price.sushi.com/v1/${chainId}/${address}`,
      ).then((response) => response.json())
      return new Fraction(
        parseUnits(data.toFixed(18), 18).toString(),
        parseUnits('1', 18).toString(),
      )
    },
    enabled: Boolean(chainId && address),
    staleTime: 900000, // 15 mins
    cacheTime: 3600000, // 1hr
    refetchOnWindowFocus: false,
  })
}
