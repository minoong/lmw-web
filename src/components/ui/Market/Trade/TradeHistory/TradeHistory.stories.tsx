import React from 'react'
import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { withJotai } from 'storybook-addon-jotai'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TradeHistory from '~/components/ui/Market/Trade/TradeHistory/tradeHistory'
import { marketsAtom } from '~/stores'
import { tickersAtom } from '~/stores/atoms/tickers'
import { symbolAtom } from '~/stores/atoms/symbolState'

const queryClient = new QueryClient()

export default {
 title: 'Market/Trade/TradeHistory',
 component: TradeHistory,
 decorators: [
  withJotai,
  (Story) => (
   <QueryClientProvider client={queryClient}>
    <Story />
   </QueryClientProvider>
  ),
 ],
} as ComponentMeta<typeof TradeHistory>

const Template: ComponentStory<typeof TradeHistory> = () => <TradeHistory />

export const Primary = Template.bind({})
Primary.parameters = {
 jotai: {
  atoms: {
   symbolAtom,
   marketsAtom,
   tickersAtom,
  },
  values: {
   symbolAtom: 'KRW-BTC',
   marketsAtom: [
    {
     market: 'KRW-BTC',
     korean_name: '비트코인',
     english_name: 'Bitcoin',
    },
   ],
   tickersAtom: [
    {
     type: 'ticker',
     code: 'KRW-BTC',
     opening_price: 28930000,
     high_price: 28992000,
     low_price: 28456000,
     trade_price: 28807000,
     prev_closing_price: 28930000,
     acc_trade_price: 70755668907.168,
     change: 'FALL',
     change_price: 123000,
     signed_change_price: -123000,
     change_rate: 0.0042516419,
     signed_change_rate: -0.0042516419,
     ask_bid: 'ASK',
     trade_volume: 0.001,
     acc_trade_volume: 2461.58721434,
     trade_date: '20230127',
     trade_time: '120409',
     trade_timestamp: 1674821049457,
     acc_ask_volume: 1332.27771221,
     acc_bid_volume: 1129.30950213,
     highest_52_week_price: 57678000,
     highest_52_week_date: '2022-03-28',
     lowest_52_week_price: 20700000,
     lowest_52_week_date: '2022-12-30',
     market_state: 'ACTIVE',
     is_trading_suspended: false,
     delisting_date: null,
     market_warning: 'NONE',
     timestamp: 1674821049523,
     acc_trade_price_24h: 122409893104.69154,
     acc_trade_volume_24h: 4246.55643297,
     stream_type: 'SNAPSHOT',
    },
   ],
  },
 },
}
