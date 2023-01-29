/* eslint-disable camelcase */
import { atom } from 'jotai'
import { marketsAtom } from '~/stores/atoms/markets'
import type { Ticker } from '~/types/api/upbit/ticker.socket'
import type { Market } from '~/types/api/upbit/market'
import { candlesAtom, symbolAtom } from '~/stores/atoms/symbolState'

export const tickersAtom = atom<Ticker[]>([])

export const updateCandlesWithTickers = atom(null, (get, set, data: Ticker[]) => {
 const current = get(candlesAtom)
 set(tickersAtom, () => data)

 const lastCandle = current?.candles.slice(-1)[0]
 const target = data.find((d) => d.code === current?.symbol)

 if (!lastCandle || !target) return
 const { open } = lastCandle
 const high = lastCandle.high > target.trade_price ? lastCandle.high : target.trade_price
 const low = lastCandle.low < target.trade_price ? lastCandle.low : target.trade_price
 const close = target.trade_price
 const needUpdate = current.candles.find((candle) => {
  return (
   new Intl.DateTimeFormat(navigator.language, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
   }).format(candle.date) ===
   new Intl.DateTimeFormat(navigator.language, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
   }).format(new Date(target.timestamp))
  )
 })

 if (needUpdate) {
  const volume = needUpdate.volume + target.trade_volume
  const newData = [...current.candles]
  newData.pop()
  newData.push({
   open,
   high,
   low,
   close,
   volume,
   date: lastCandle.date,
  })

  set(candlesAtom, () => ({ symbol: current.symbol, candles: newData }))
 } else {
  set(candlesAtom, () => ({
   symbol: current.symbol,
   candles: [
    ...current.candles,
    {
     open: close,
     high: close,
     low: close,
     close,
     volume: target.trade_volume,
     date: new Date(target.timestamp),
    },
   ],
  }))
 }
})

export const tickersAboutMarketsAtom = atom((get) => {
 const markets = get(marketsAtom)
 const tickers = get(tickersAtom)

 return tickers
  .filter((ticker) => markets.findIndex((market) => ticker.code === market.market) > -1)
  .map((ticker) => ({ ...ticker, ...(markets.find((market) => ticker.code === market.market) as Market) }))
  .map(
   ({
    market,
    korean_name,
    english_name,
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
    english_name,
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
  .sort((a, b) => b.signed_change_rate - a.signed_change_rate)
})

export const selectedCoinAtom = atom((get) => {
 const [market] = get(marketsAtom).filter((v) => v.market === get(symbolAtom))
 const [result] = get(tickersAtom)
  .filter((ticker) => ticker.code === market.market)
  .map((ticker) => ({ ...ticker, ...market }))
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
    acc_trade_volume_24h,
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
    acc_trade_volume_24h,
   }),
  )

 return result
})

export const getTickerBySymbolAtom = (symbol: string) =>
 atom((get) => get(tickersAtom).filter(({ code }) => code === symbol)[0])
