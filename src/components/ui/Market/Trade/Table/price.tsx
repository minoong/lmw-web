import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import usePrevious from '~/hooks/usePrevious'
import type { Change } from '~/types/api/upbit/common'
import { MarketUtils } from '~/utils/utils.market'

interface Props {
 tradePrice: number
 change: Change
 yesterdayChnage: Change
 isFirstRender: boolean
}

function Price(props: Props) {
 const { tradePrice, change, yesterdayChnage, isFirstRender } = props
 const [currentChange, setCurrentChange] = useState<Change>(change)
 const previousChange = usePrevious(change)

 useEffect(() => {
  if (previousChange !== change) {
   setCurrentChange(change)
  }
  const id = setTimeout(() => {
   setCurrentChange('EVEN')
  }, 300)

  return () => clearTimeout(id)
 }, [change, previousChange])

 const isRise = `text-${clsx({
  '[#c84a31]': yesterdayChnage === 'RISE',
  '[#1261c4]': yesterdayChnage === 'FALL',
 })}`

 const highlight = `border border-${clsx(
  currentChange === 'RISE' && 'border border-[#c84a31]',
  currentChange === 'FALL' && 'border border-[#1261c4]',
  currentChange === 'EVEN' && 'border border-transparent',
 )}`

 return (
  <div
   className={`${isRise} transition-all ease-in ${
    !isFirstRender ? highlight : ''
   } text-xs h-10 flex justify-end pr-2 pt-1`}
  >
   {MarketUtils.getPricePretty(tradePrice)}
  </div>
 )
}

export default React.memo(Price)
