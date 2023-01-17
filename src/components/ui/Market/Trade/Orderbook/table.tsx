import { useAtomValue } from 'jotai'
import React, { useMemo } from 'react'
import Spinner from '~/components/ui/Common/Spinner/spinner'
import useUpbit from '~/hooks/useUpbit.websocket'
import { getMarketBySymbolAtom } from '~/stores'
import { symbolAtom } from '~/stores/atoms/symbolState'
import { getTickerBySymbolAtom } from '~/stores/atoms/tickers'
import type { Orderbook } from '~/types/api/upbit/orderbook.socket'
import { MarketUtils } from '~/utils/utils.market'

const getChangeRate = (currentValue: number, prevClose: number) => {
 const result = ((currentValue - prevClose) / prevClose) * 100
 return +result
}

function Table() {
 const symbol = useAtomValue(symbolAtom)
 const marketCodes = useAtomValue(
  useMemo(() => {
   return getMarketBySymbolAtom(symbol)
  }, [symbol]),
 )
 const ticker = useAtomValue(
  useMemo(() => {
   return getTickerBySymbolAtom(symbol)
  }, [symbol]),
 )

 const { socketData } = useUpbit(marketCodes, 'orderbook')

 return <div className="w-[490px]">{socketData.length > 0 && ticker ? <Row data={socketData[0]} /> : <Spinner />}</div>
}

interface RowProps {
 data: Orderbook
}

function Row(props: RowProps) {
 const { data } = props

 const symbol = useAtomValue(symbolAtom)
 const ticker = useAtomValue(
  useMemo(() => {
   return getTickerBySymbolAtom(symbol)
  }, [symbol]),
 )

 if (!data) return null

 const maxSize = Math.max(
  ...data.orderbook_units.map((v) => v.ask_size),
  ...data.orderbook_units.map((v) => v.bid_size),
 )

 return (
  <div className="h-[700px]" id="coin-table">
   <table className="w-[490px]">
    <colgroup>
     <col width="42" />
     <col width="120" />
     <col width="*" />
     <col width="120" />
     <col width="42" />
    </colgroup>
    <tbody className="text-[12px]">
     {[...data.orderbook_units].reverse().map((ele) => {
      const width = `${(ele.ask_size / maxSize) * 100}%`
      return (
       <tr key={`ask_${ele.ask_price}`} className="bg-[#EEF2FB] h-[45px] hover:bg-[#D2DFF3]">
        <th className="border-white border">&nbsp;</th>
        <th className="border-white border text-trade-even font-normal">
         <div className="relative w-full h-full text-right">
          <div className="p-1">{(+ele.ask_size.toFixed(3)).toLocaleString()}</div>
          <div
           className="absolute bottom-0 right-0 top-0"
           style={{ width, backgroundColor: 'rgba(18,97,196,.14901960784313725)' }}
          />
         </div>
        </th>
        <th className="border-white border text-trade-rise">
         <div className="flex w-full">
          <div className="flex-1">{MarketUtils.getPricePretty(ele.ask_price)}</div>
          <div className="pr-2">
           {getChangeRate(ele.ask_price, ticker.prev_closing_price) > 0 && '+'}
           {getChangeRate(ele.ask_price, ticker.prev_closing_price).toFixed(2)}%
          </div>
         </div>
        </th>
        <th colSpan={2} className="bg-white">
         &nbsp;
        </th>
       </tr>
      )
     })}
     {[...data.orderbook_units].map((ele) => {
      const width = `${(ele.bid_size / maxSize) * 100}%`
      return (
       <tr key={`bid_${ele.bid_price}`} className="bg-[#FCF0F0] h-[45px] hover:bg-[#F5DCD6]">
        <th colSpan={2} className="bg-white">
         &nbsp;
        </th>
        <th className="border-white border text-trade-fall">
         <div className="flex w-full">
          <div className="flex-1">{MarketUtils.getPricePretty(ele.bid_price)}</div>
          <div className="pr-2">
           {getChangeRate(ele.ask_price, ticker.prev_closing_price) > 0 && '+'}
           {getChangeRate(ele.ask_price, ticker.prev_closing_price).toFixed(2)}%
          </div>
         </div>
        </th>

        <th className="border-white border text-trade-even font-normal">
         <div className="relative w-full h-full text-left">
          <div className="p-1">{(+ele.bid_size.toFixed(3)).toLocaleString()}</div>
          <div
           className="absolute bottom-0 left-0 top-0"
           style={{ width, backgroundColor: 'rgba(200,74,49,.14901960784313725)' }}
          />
         </div>
        </th>

        <th className="border-white border">&nbsp;</th>
       </tr>
      )
     })}
    </tbody>
   </table>
  </div>
 )
}

export default Table
