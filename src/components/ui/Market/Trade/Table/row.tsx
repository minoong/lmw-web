/* eslint-disable camelcase */
import clsx from 'clsx'
import type { Atom } from 'jotai'
import React, { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Star } from '~/assets/svg/star_fill.svg'
import Candle from '~/components/ui/Chart/candle'
import Price from '~/components/ui/Market/Trade/Table/price'
import usePrevious from '~/hooks/usePrevious'
import type { tickersAboutMarketsAtom } from '~/stores/atoms/tickers'
import { MarketUtils } from '~/utils/utils.market'

type ExtractAtomValue<AtomType> = AtomType extends Atom<infer Value> ? (Value extends (infer E)[] ? E : never) : never

function Row(props: ExtractAtomValue<typeof tickersAboutMarketsAtom>) {
 const {
  market,
  korean_name,
  change,
  opening_price,
  trade_price,
  high_price,
  low_price,
  signed_change_rate,
  signed_change_price,
  acc_trade_price_24h,
 } = props
 const previousChange = usePrevious(trade_price)

 const marketKrwSymbol = useMemo(() => {
  const [krw, symbol] = market.split('-')

  return `${symbol}/${krw}`
 }, [market])

 const isRise = clsx({
  'text-[#c84a31]': change === 'RISE',
  'text-[#1261c4]': change === 'FALL',
 })

 return (
  <div className="flex w-[400px] max-w-[400px] bg-white flex-wrap h-[46px] items-center cursor-default text-[#333333] text-xs hover:bg-[#f4f5f8]">
   <div className="w-[26px] flex justify-center pl-3">
    <Star fill="#DDDDDD" width={15} />
   </div>
   <div className="w-[26px] flex justify-center">
    <svg width={7} height={27}>
     <Candle
      fill={change === 'RISE' ? '#c84a31' : '#1261c4'}
      width={7}
      height={27}
      price={{
       opening: opening_price,
       trade: trade_price,
       high: high_price,
       low: low_price,
      }}
     />
    </svg>
   </div>
   <div className="w-[94px]">
    <NavLink className="text-xs font-bold !cursor-pointer hover:underline" to="/exchange/KRW-BTC">
     {korean_name}
    </NavLink>
    <div className="text-[6px] text-gray-500 font-semibold">{marketKrwSymbol}</div>
   </div>
   <div className="w-[88px]">
    <Price
     tradePrice={trade_price}
     yesterdayChnage={change}
     change={trade_price > (previousChange ?? 0) ? 'RISE' : trade_price < (previousChange ?? 0) ? 'FALL' : 'EVEN'}
     isFirstRender={previousChange === undefined}
    />
   </div>
   <div className="w-[78px]">
    <div className={`${isRise} text-[6px] font-semibold text-right`}>
     <div>
      {signed_change_rate > 0 ? '+' : ''}
      {(signed_change_rate * 100).toFixed(2)}%
     </div>
     <div>{signed_change_price.toLocaleString()}</div>
    </div>
   </div>
   <div className="w-[88px]">
    <div className="text-right pr-3">
     <span className="text-[6px] font-semibold">{MarketUtils.numberToHuman(acc_trade_price_24h)[0]}</span>
     <span className="text-[6px] text-gray-500 font-semibold">{MarketUtils.numberToHuman(acc_trade_price_24h)[1]}</span>
    </div>
   </div>
  </div>
 )
}

export default React.memo(Row)
