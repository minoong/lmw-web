import axios from 'axios'
import { Market } from '~/types/api/upbit/market'

export async function getMarkets() {
 const { data } = await axios.get<Market[]>('https://api.upbit.com/v1/market/all')

 return data
}
