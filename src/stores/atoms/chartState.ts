import { atom } from 'jotai'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { symbolAtom } from '~/stores/atoms/symbolState'
import { getTickers } from '~/apis/upbit/getTickers'

dayjs.extend(isBetween)

export const chartAtom = atom(async (get) => {
 const symbol = get(symbolAtom)

 const current = new Date()
 const isAfter = dayjs(current).isAfter(dayjs(current).set('h', 9).set('m', 0).set('second', 0))
 const open = dayjs(isAfter ? current : dayjs(current).subtract(1, 'd'))
  .set('h', 9)
  .set('m', 0)
  .set('second', 0)
 const close = isAfter
  ? dayjs(current).add(1, 'd').set('h', 8).set('m', 59).set('second', 0)
  : dayjs(current).set('h', 8).set('m', 59).set('second', 0)

 let gap = dayjs(current).diff(open, 'm') + 1
 const fromTo = []
 while (gap > -1) {
  const l = gap >= 200 ? 200 : gap
  gap -= 200

  fromTo.push(l)
 }

 let c = 0
 const result = fromTo.map((v, i) => {
  c += i === 0 ? 0 : 200
  return [dayjs(current).subtract(c, 'm').toISOString(), v] as [string, number]
 })

 const data = await Promise.all(result.map(([to, count]) => getTickers(symbol, to, count)))

 return data
  .flat()
  .reverse()
  .map((candle) => ({
   close: candle.trade_price,
   date: new Date(candle.timestamp),
   high: candle.high_price,
   low: candle.low_price,
   open: candle.opening_price,
   volume: candle.candle_acc_trade_volume,
  }))
})
