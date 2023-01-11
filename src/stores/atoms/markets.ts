import { atom } from 'jotai'
import { selectAtom } from 'jotai/utils'
import deepEquals from 'fast-deep-equal'
import type { Market } from '~/types/api/upbit/market'

export const marketsAtom = atom<Market[]>([])

export const krwMarketsAtom = selectAtom(
 marketsAtom,
 (markets) => markets.filter(({ market }) => market.startsWith('KRW-')),
 deepEquals,
)

export const btcMarketsAtom = selectAtom(
 marketsAtom,
 (markets) => markets.filter(({ market }) => market.startsWith('BTC-')),
 deepEquals,
)

export const usdtMarketsAtom = selectAtom(
 marketsAtom,
 (markets) => markets.filter(({ market }) => market.startsWith('USDT-')),
 deepEquals,
)
