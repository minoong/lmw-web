export type CandleMinute = {
 market: string
 candle_date_time_utc: string
 candle_date_time_kst: string
 opening_price: number
 high_price: number
 low_price: number
 trade_price: number
 timestamp: number
 candle_acc_trade_price: number
 candle_acc_trade_volume: number
 unit: number
}

export type StockCandle = {
 close: number
 date: Date
 high: number
 low: number
 open: number
 volume: number
}
