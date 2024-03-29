/* eslint-disable camelcase */
import type { Atom } from 'jotai'
import React, { useMemo } from 'react'
import { NavLink, useNavigate, useNavigation } from 'react-router-dom'
import { ReactComponent as Star } from '~/assets/svg/star_fill.svg'
import Candle from '~/components/ui/Chart/candle'
import Price from '~/components/ui/Market/Trade/Table/price'
import useIsMounted from '~/hooks/useIsMounted'
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
 const isMounted = useIsMounted()
 const navigation = useNavigation()
 const navigate = useNavigate()

 const marketKrwSymbol = useMemo(() => {
  const [krw, symbol] = market.split('-')

  return `${symbol}/${krw}`
 }, [market])

 const currentChange = MarketUtils.getChageColor('text-', change, '[#333333]')

 const isPending = () => navigation.state === 'loading'

 const handleSelectedMarket = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, market: string) => {
  e.stopPropagation()
  if (isPending()) {
   return
  }
  navigate(`/exchange/${market}`)
 }

 return (
  <div
   className="flex w-[400px] max-w-[400px] bg-white flex-wrap h-[46px] items-center cursor-default text-[#333333] text-xs hover:bg-[#f4f5f8]"
   onClick={(e) => handleSelectedMarket(e, market)}
   aria-hidden
  >
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
    <NavLink
     className="text-xs font-bold !cursor-pointer hover:underline"
     to={`/exchange/${market}`}
     onClick={isPending}
    >
     {korean_name}
    </NavLink>
    <div className="text-[6px] text-gray-500 font-semibold">{marketKrwSymbol}</div>
   </div>
   <div className="w-[88px]">
    <Price tradePrice={trade_price} yesterdayChnage={change} isFirstRender={!isMounted()} />
   </div>
   <div className="w-[78px]">
    <div className={`${currentChange} text-[6px] font-semibold text-right`}>
     <div>
      {signed_change_rate > 0 ? '+' : ''}
      {(signed_change_rate * 100).toFixed(2)}%
     </div>
     <div>{MarketUtils.getPricePretty(signed_change_price)}</div>
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
