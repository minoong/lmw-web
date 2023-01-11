/* eslint-disable camelcase */
import { atom } from 'jotai'
import { marketsAtom } from '~/stores/atoms/markets'
import type { Ticker } from '~/types/api/upbit/ticker.socket'
import type { Market } from '~/types/api/upbit/market'

export const tickersAtom = atom<Ticker[]>([])

export const tickersAboutMarketsAtom = atom((get) => {
 const markets = get(marketsAtom)
 const tickers = get(tickersAtom)

 return tickers
  .filter((ticker) => markets.findIndex((market) => ticker.code === market.market))
  .map((ticker) => ({ ...ticker, ...(markets.find((market) => ticker.code === market.market) as Market) }))
  .map(
   ({
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
   }) => ({
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
   }),
  )
})
