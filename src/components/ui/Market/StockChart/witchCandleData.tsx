import { useAtomValue, useSetAtom } from 'jotai'
import React, { useEffect } from 'react'
import { candlesAtom, symbolAtom, writeOnlyAtom } from '~/stores/atoms/symbolState'
import type { StockCandle } from '~/types/api/upbit/candle.api'

interface WithCandleDataProps {
 data: StockCandle[]
 handleMoreFetch: () => Promise<void>
}

function witchCandleData() {
 return <TProps extends WithCandleDataProps>(OriginalComponent: React.ComponentClass<TProps>) => {
  return function WithCandleData(props: Omit<TProps, 'data' | 'handleMoreFetch'>) {
   const symbol = useAtomValue(symbolAtom)
   const datasets = useAtomValue(candlesAtom)
   const dispatch = useSetAtom(writeOnlyAtom)

   useEffect(() => {
    dispatch()
   }, [symbol])

   const handleMoreFetch = async () => {
    dispatch()
   }

   if (datasets?.candles.length === 0) return null

   return <OriginalComponent {...(props as TProps)} data={datasets?.candles} handleMoreFetch={handleMoreFetch} />
  }
 }
}

export default witchCandleData
