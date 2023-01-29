import { useAtomValue } from 'jotai'
import Hangul from 'hangul-js'
import React, { useMemo, useState } from 'react'
import VirtualScroll from '~/components/ui/Common/VirtualScroll/virtualScroll'
import Row from '~/components/ui/Market/Trade/Table/row'
import { searchState } from '~/stores/atoms/searchState'
import { tickersAboutMarketsAtom } from '~/stores/atoms/tickers'

function Table() {
 const search = useAtomValue(searchState)
 const [y, setY] = useState<number>(0)
 const tickersAboutMarkets = useAtomValue(tickersAboutMarketsAtom)

 const datasets = useMemo(() => {
  if (!search) {
   return tickersAboutMarkets
  }

  const reg = new RegExp(search, 'ig')
  const korReg = new RegExp(
   Hangul.d(search, true)
    .map((s) => s[0])
    .join(''),
   'ig',
  )

  return tickersAboutMarkets.filter(
   (marketData) =>
    reg.test(marketData.english_name) ||
    reg.test(marketData.market.split('-')[1]) ||
    Hangul.disassembleToString(marketData.korean_name).includes(Hangul.disassembleToString(search)) ||
    (!Hangul.isComplete(search) &&
     korReg.test(
      Hangul.d(marketData.korean_name, true)
       .map((kor) => kor[0])
       .join(''),
     )),
  )
 }, [tickersAboutMarkets, search])

 return (
  <div className="coin-table h-[865px] sticky top-20" onScroll={(e) => setY(e.currentTarget.scrollTop)}>
   <VirtualScroll height={865} itemHeight={46} offsetY={y}>
    {datasets.map((ticker) => (
     <Row key={ticker.market} {...ticker} />
    ))}
   </VirtualScroll>
  </div>
 )
}

export default React.memo(Table)
