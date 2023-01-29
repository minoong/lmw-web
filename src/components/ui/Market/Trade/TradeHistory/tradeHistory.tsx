import { useAtomValue } from 'jotai'
import React, { useMemo, useState } from 'react'
import VirtualScroll from '~/components/ui/Common/VirtualScroll/virtualScroll'
import Body from '~/components/ui/Market/Trade/TradeHistory/body'
import Header from '~/components/ui/Market/Trade/TradeHistory/header'
import useUpbit from '~/hooks/useUpbit.websocket'
import { getMarketBySymbolAtom } from '~/stores'
import { symbolAtom } from '~/stores/atoms/symbolState'

function TradeHistory() {
 const [y, setY] = useState<number>(0)
 const symbol = useAtomValue(symbolAtom)

 const marketCodes = useAtomValue(
  useMemo(() => {
   return getMarketBySymbolAtom(symbol)
  }, [symbol]),
 )

 const { socketData = [] } = useUpbit(marketCodes, 'trade')

 const [shortcutSymbol, currency] = useMemo(() => {
  const [currency, shortcutSymbol] = symbol.split('-')

  return [shortcutSymbol, currency] as [string, string]
 }, [symbol])

 const datasets = socketData

 return (
  <div className="w-[990px] -m-4">
   <Header symbol={shortcutSymbol} currency={currency} />
   <div className="coin-table h-[332px]" onScroll={(e) => setY(e.currentTarget.scrollTop)}>
    <VirtualScroll height={332} itemHeight={35} offsetY={y}>
     {datasets.map((data) => (
      <Body key={data.sequential_id} data={data} />
     ))}
    </VirtualScroll>
   </div>
  </div>
 )
}

export default TradeHistory
