import type { Change } from '~/types/api/upbit/common'

export type Trade = {
 type: string
 code: string
 trade_price: string
 trade_volume: string
 ask_bid: 'ASK' | 'BID'
 prev_closing_price: string
 change: Change
 change_price: string
 trade_date: string
 trade_time: string
 trade_timestamp: string
 timestamp: string
 sequential_id: string
 stream_type: 'SNAPSHOT' | 'REALTIME'
}
