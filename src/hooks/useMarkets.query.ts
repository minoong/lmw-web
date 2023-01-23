import { useQuery } from '@tanstack/react-query'
import { getMarkets } from '~/apis/upbit/getMarkets'
import type { UniversalUseQueryOptions } from '~/types/react-query/universal'

type GetMarkets = typeof getMarkets

function useMarketsQuery<T = GetMarkets>(options: UniversalUseQueryOptions<GetMarkets, T> = {}) {
 return useQuery(['market', 'all'], getMarkets, {
  ...options,
 })
}

export default useMarketsQuery
