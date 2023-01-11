import { useAtomValue } from 'jotai'
import React, { useState } from 'react'
import VirtualScroll from '~/components/ui/Common/VirtualScroll/virtualScroll'
import Row from '~/components/ui/Market/Trade/Table/row'
import { tickersAboutMarketsAtom } from '~/stores/atoms/tickers'
import { motion } from 'framer-motion'

function Table() {
 const [y, setY] = useState<number>(0)
 const tickersAboutMarkets = useAtomValue(tickersAboutMarketsAtom)

 return (
  <div className="h-[865px] sticky top-20 webkit" onScroll={(e) => setY(e.currentTarget.scrollTop)} id="coin-table">
   <VirtualScroll height={865} itemHeight={46} offsetY={y}>
    {tickersAboutMarkets.map((ticker) => (
     <motion.div
      key={ticker.market}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
     >
      <Row {...ticker} />
     </motion.div>
    ))}
   </VirtualScroll>
  </div>
 )
}

export default React.memo(Table)
