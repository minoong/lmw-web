import { useAtomValue, useSetAtom } from 'jotai'
import React, { Suspense, useEffect } from 'react'
import Header from '~/components/ui/Market/Header/header'
import { MinutesStockChart } from '~/components/ui/Market/StockChart/stockChart'
import Orderbook from '~/components/ui/Market/Trade/Orderbook/orderbook'
import Table from '~/components/ui/Market/Trade/Table/table'
import HistoryTab from '~/components/ui/Market/Trade/HistoryTab/historyTab'
import useMarketsQuery from '~/hooks/useMarkets.query'
import useUpbit from '~/hooks/useUpbit.websocket'
import { krwMarketsAtom, marketsAtom } from '~/stores'
import { updateCandlesWithTickers } from '~/stores/atoms/tickers'

function Exchange() {
 const dispatch = useSetAtom(marketsAtom)
 const dispatchTicker = useSetAtom(updateCandlesWithTickers)
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
   <div className="flex flex-col gap-2">
    <Suspense fallback={<div>loading</div>}>
     <Header />
    </Suspense>
    <div className="h-[500px] bg-white">
     <MinutesStockChart dateTimeFormat="%Y-%m-%d %H:%M" />
    </div>
    <Orderbook />
    <HistoryTab />
   </div>
   <Table />
  </div>
 )
}

export default Exchange
