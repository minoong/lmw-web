/* eslint-disable camelcase */
import clsx from 'clsx'
import dayjs from 'dayjs'
import React from 'react'
import type { Trade } from '~/types/api/upbit/trade.socket'
import { MarketUtils } from '~/utils/utils.market'

interface Props {
 data: Trade
}

function Body(props: Props) {
 const {
  data: { ask_bid, change, trade_price, trade_volume, trade_timestamp },
 } = props

 const currentChange = MarketUtils.getChageColor('text-', change, '[#333333]')
 const askBid = `text-${clsx(ask_bid === 'BID' && 'trade-rise', ask_bid === 'ASK' && 'trade-fall')}`

 return (
  <div className="w-fit flex text-[11px] text-[#666666] text-right items-center h-[35px] odd:bg-[#F9FAFC]">
   <div className="w-[96px] text-center">
    <span className="text-[#333333]">{dayjs(trade_timestamp).format('MM.DD')}</span>
    <span className={`before:content-['_'] text-[#999999]`}>{dayjs(trade_timestamp).format('HH.mm')}</span>
   </div>
   <div className={`w-[300px] pr-[14px] ${currentChange} font-medium`}>{MarketUtils.getPricePretty(trade_price)}</div>
   <div className={`w-[280px] pr-[14px] ${askBid}`}>{trade_volume}</div>
   <div className="w-[314px] pr-[14px] font-medium">{MarketUtils.getPricePretty(trade_price * trade_volume)}</div>
  </div>
 )
}

export default Body
