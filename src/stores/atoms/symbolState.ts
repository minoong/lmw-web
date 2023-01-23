/* eslint-disable camelcase */
import axios from 'axios'
import { atom } from 'jotai'
import type { CandleMinute, StockCandle } from '~/types/api/upbit/candle.api'

export const symbolAtom = atom<string>('')

export const candlesAtom = atom<{ symbol: string; candles: StockCandle[] } | null>(null)
export const candlesPendingAtom = atom<boolean>(false)

export const writeOnlyAtom = atom(null, async (get, set) => {
 const pending = get(candlesPendingAtom)

 if (pending) return

 set(candlesPendingAtom, true)

 const symbol = get(symbolAtom)
 const current = get(candlesAtom)

 const isMatched = symbol === current?.symbol

 const datetime = !isMatched
  ? new Date().toISOString()
  : current?.candles[0].date.toISOString() || new Date().toISOString()

 const data = await axios
  .get<CandleMinute[]>(`https://api.upbit.com/v1/candles/minutes/1?market=${symbol}&to=${datetime}&count=200`)
  .then(({ data }) =>
   data.reverse().map((candle) => ({
    close: candle.trade_price,
    date: new Date(candle.timestamp),
    high: candle.high_price,
    low: candle.low_price,
    open: candle.opening_price,
    volume: candle.candle_acc_trade_volume,
   })),
  )

 if (symbol !== current?.symbol) {
  set(candlesAtom, () => ({
   symbol,
   candles: data,
  }))
 } else {
  set(candlesAtom, () => ({
   symbol,
   candles: [...data, ...current.candles],
  }))
 }
 set(candlesPendingAtom, false)
})
