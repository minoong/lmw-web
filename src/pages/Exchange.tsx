import { useAtomValue, useSetAtom } from 'jotai'
import React, { useEffect } from 'react'
import Orderbook from '~/components/ui/Market/Trade/Orderbook/orderbook'
import Table from '~/components/ui/Market/Trade/Table/table'
import useMarketsQuery from '~/hooks/useMarkets.query'
import useUpbit from '~/hooks/useUpbit.websocket'
import { krwMarketsAtom, marketsAtom } from '~/stores'
import { tickersAtom } from '~/stores/atoms/tickers'

function Exchange() {
 const dispatch = useSetAtom(marketsAtom)
 const dispatchTicker = useSetAtom(tickersAtom)
 const krwMarkets = useAtomValue(krwMarketsAtom)
 useMarketsQuery({
  staleTime: Infinity,
  suspense: true,
  onSuccess(data) {
   dispatch(data)
  },
 })

 const { socketData } = useUpbit(krwMarkets, 'ticker')

 useEffect(() => {
  dispatchTicker(socketData)
 }, [socketData])

 return (
  <div className="grid grid-cols-[990px_400px] w-[1410px] m-auto gap-5 mt-4">
   <div className="bg-white h-[1500px]">
    <Orderbook />
   </div>
   <Table />
  </div>
 )
}

export default Exchange
