import React from 'react'

interface Props {
 symbol: string
 currency: string
}

function Header(props: Props) {
 const { symbol, currency } = props
 return (
  <div className="w-fit flex text-[11px] text-[#666666] text-right items-center h-[35px] bg-[#f9fafc] border-b font-normal">
   <div className="w-[96px] text-center">체결시간</div>
   <div className="w-[300px] pr-[14px]">체결가격({currency})</div>
   <div className="w-[280px] pr-[14px]">체결량({symbol})</div>
   <div className="w-[314px] pr-[14px]">체결금액({currency})</div>
  </div>
 )
}

export default Header
