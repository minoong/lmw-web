import React, { useEffect, useState } from 'react'
import usePrevious from '~/hooks/usePrevious'
import type { Change } from '~/types/api/upbit/common'
import { MarketUtils } from '~/utils/utils.market'

interface Props {
 tradePrice: number
 yesterdayChnage: Change
 isFirstRender: boolean
}

function Price(props: Props) {
 const { tradePrice, yesterdayChnage, isFirstRender } = props
 console.log(isFirstRender)
 const [currentChange, setCurrentChange] = useState<Change>('EVEN')
 const previousTradePrice = usePrevious(tradePrice)

 useEffect(() => {
  if (previousTradePrice !== tradePrice) {
   setCurrentChange(tradePrice > previousTradePrice ? 'RISE' : tradePrice < previousTradePrice ? 'FALL' : 'EVEN')
  }
  const id = setTimeout(() => {
   setCurrentChange('EVEN')
  }, 300)

  return () => clearTimeout(id)
 }, [tradePrice, previousTradePrice])

 const change = MarketUtils.getChageColor('text-', yesterdayChnage, '[#333333]')
 const highlight = MarketUtils.getChageColor('border border-', currentChange)

 return (
  <div
   className={`${change} transition-all ease-in ${
    !isFirstRender ? highlight : ''
   } text-xs h-10 flex justify-end pr-2 pt-1`}
  >
   {MarketUtils.getPricePretty(tradePrice)}
  </div>
 )
}

export default React.memo(Price)
