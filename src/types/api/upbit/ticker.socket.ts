export type Ticker = {
 type: string
 code: string
 opening_price: string
 high_price: string
 low_price: string
 trade_price: string
 prev_closing_price: string
 change: 'RISE' | 'EVEN' | 'FALL'
 change_price: string
 signed_change_price: string
 change_rate: string
 signed_change_rate: number
 trade_volume: string
 acc_trade_volume: string
 acc_trade_volume_24h: string
 acc_trade_price: string
 acc_trade_price_24h: string
 trade_date: string
 trade_time: string
 trade_timestamp: string
 ask_bid: 'ASK' | 'BID'
 acc_ask_volume: string
 acc_bid_volume: string
 highest_52_week_price: string
 highest_52_week_date: string
 lowest_52_week_price: string
 lowest_52_week_date: string
 trade_status: string
 market_state: 'PREVIEW' | 'ACTIVE' | 'DELISTED'
 market_state_for_ios: string
 is_trading_suspended: string
 delisting_date: string
 market_warning: 'NONE' | 'CAUTION'
 timestamp: string
 stream_type: 'SNAPSHOT' | 'REALTIME'
}
