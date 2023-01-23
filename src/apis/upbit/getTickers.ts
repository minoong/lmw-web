import axios from 'axios'
import type { CandleMinute } from '~/types/api/upbit/candle.api'

export async function getTickers(symbol: string, datetime: string, count = 200) {
 const { data } = await axios.get<CandleMinute[]>(
  `https://api.upbit.com/v1/candles/minutes/1?market=${symbol}&to=${datetime}&count=${count}`,
 )

 return data
}
