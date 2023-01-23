import { useAtomValue } from 'jotai'
import React, { useMemo } from 'react'
import { selectedCoinAtom } from '~/stores/atoms/tickers'
import { MarketUtils } from '~/utils/utils.market'

function Header() {
 const coin = useAtomValue(selectedCoinAtom)

 const marketKrwSymbol = useMemo(() => {
  if (!coin?.market) return ''
  const [krw, symbol] = coin.market.split('-')

  return `${symbol}/${krw}`
 }, [coin?.market])

 const simpleSymbol = coin ? coin.market.split('-')[1] : ''
 const krw = coin ? coin.market.split('-')[0] : ''

 const change = coin ? MarketUtils.getChageColor('text-', coin.change, '[#333333]') : ''

 return (
  <div className="flex flex-col p-2 gap-2 pb-10 border-b">
   {coin && (
    <>
     <div className="flex gap-3 items-center border-b pb-2">
      <img src={`https://static.upbit.com/logos/${simpleSymbol}.png`} alt={coin.korean_name} className="h-6" />
      <div className="flex font-bold gap-1 items-end">
       <span className="text-xl">{coin.korean_name}</span>
       <span className="text-[12px] text-[#666666] font-normal">{marketKrwSymbol}</span>
      </div>
     </div>
     <div className={`flex items-center pb-2 ${change} justify-between`}>
      <div>
       <div className="font-semibold gap-1 text-[32px]">
        {MarketUtils.getPricePretty(coin.trade_price)}
        <span className="text-[14px] font-semibold pl-1">{krw}</span>
       </div>
       <div className="flex items-center gap-1 font-semibold">
        <span className="text-[11px] text-[#666666]">전일대비</span>
        <span>
         {coin.change === 'RISE' ? '+' : ''}
         {(coin.signed_change_rate * 100).toFixed(2)}%
        </span>
        {coin.change === 'RISE' && <img src="/src/assets/images/ico_up.png" className="inline-block" alt="rise" />}
        {coin.change === 'FALL' && <img src="/src/assets/images/ico_down.png" className="inline-block" alt="fall" />}
        <span className={`items-center ${coin.change === 'EVEN' && 'm-2'}`}>
         {MarketUtils.getPricePretty(coin.signed_change_price)}
        </span>
       </div>
      </div>
      <div className="grid grid-cols-[245px_245px] w-[490px] justify-items-stretch text-trade-even text-xs">
       <div className="flex justify-between p-2 items-center border-b">
        <div>고가</div>
        <div className="text-sm text-trade-rise font-semibold">{MarketUtils.getPricePretty(coin.high_price)}</div>
       </div>
       <div className="flex justify-between p-2 items-center border-b">
        <div>거래량(24H)</div>
        <div className="text-sm">
         {MarketUtils.getPricePretty(coin.acc_trade_volume_24h)}
         <span className="text-[11px] font-light text-[#999999] pl-1">{simpleSymbol}</span>
        </div>
       </div>
       <div className="flex justify-between p-2 items-center border-b">
        <div>저가</div>
        <div className="text-sm text-trade-fall font-semibold">{MarketUtils.getPricePretty(coin.low_price)}</div>
       </div>
       <div className="flex justify-between p-2 items-center border-b">
        <div>거래대금(24H)</div>
        <div className="text-xs">
         {MarketUtils.getPricePretty(coin.acc_trade_price_24h)}
         <span className="text-[11px] font-light text-[#999999] pl-1">{krw}</span>
        </div>
       </div>
      </div>
     </div>
    </>
   )}
  </div>
 )
}

export default React.memo(Header)
