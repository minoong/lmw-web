/* eslint-disable react/no-array-index-key */
/* eslint-disable react/style-prop-object */
import React from 'react'
import { Tabs } from '~/components/ui/Common/Tab/tabs'
import TradeHistory from '~/components/ui/Market/Trade/TradeHistory/tradeHistory'

function HistoryTab() {
 return (
  <article className="h-[436px] bg-white">
   <Tabs.Group aria-label="Tabs with underline" style="underline">
    <Tabs.Item active title={<div className="font-bold text-base hover:underline w-full">체결</div>}>
     <TradeHistory />
    </Tabs.Item>
    <Tabs.Item title={<div className="font-bold text-base hover:underline w-full">일별</div>}>일별</Tabs.Item>
   </Tabs.Group>
  </article>
 )
}

export default HistoryTab
