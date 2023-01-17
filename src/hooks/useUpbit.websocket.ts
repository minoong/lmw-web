import { cloneDeep, throttle } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Market } from '~/types/api/upbit/market'
import type { Ticker } from '~/types/api/upbit/ticker.socket'
import type { Orderbook } from '~/types/api/upbit/orderbook.socket'
import type { Trade } from '~/types/api/upbit/trade.socket'

type RequestType = 'ticker' | 'orderbook' | 'trade'

type ResultInfer<T> = T extends 'ticker' ? Ticker : T extends 'orderbook' ? Orderbook : Trade

function socketDataEncoder(socketData: any) {
 const encoder = new TextDecoder('utf-8')
 const rawData = new Uint8Array(socketData)
 const data = JSON.parse(encoder.decode(rawData))

 return data
}

function getLastBuffers<T extends { code: string }>(buffer: T[], bufferSize: number) {
 return cloneDeep(buffer)
  .reverse()
  .reduce((prev, curr, _, arr) => {
   const isExist = prev.some((value) => value.code === curr.code)
   if (!isExist) {
    return [...prev, curr]
   }
   if (bufferSize <= prev.length) arr.slice(1)
   return prev
  }, [] as T[])
}

function sortBuffers<T extends { code: string }>(buffer: T[], marketCodes: Market[]) {
 return marketCodes.reduce(
  (prev, curr) => [...prev, buffer.find((v) => v.code === curr.market)].filter((v) => v) as T[],
  [] as T[],
 )
}

function updateSocketData<T extends { code: string }>(originData: T[], newData: T[]) {
 const data = cloneDeep(originData).map((acc) => {
  const search = newData.filter((v) => v.code === acc.code).at(-1)

  return search || acc
 })

 return [...data, ...newData.filter((value) => data.every((matchedData) => matchedData.code !== value.code))]
}

function updateQueueBuffer<T extends { code: string }>(buffer: T[], maxSize: number) {
 return [...buffer].slice(-maxSize)
}

function useUpbit<T extends RequestType>(marketCodes: Market[], type: T) {
 const socket = useRef<WebSocket | null>(null)
 const buffer = useRef<ResultInfer<T>[]>([])

 const [isConnected, setIsConnected] = useState<boolean>(false)
 const [loadingBuffer, setLoadingBuffer] = useState<ResultInfer<T>[]>([])
 const [socketData, setSocketData] = useState<ResultInfer<T>[]>([])

 const throttled = useCallback(
  throttle(() => {
   if (type === 'ticker' || type === 'orderbook') {
    const lastBuffers = getLastBuffers(buffer.current, marketCodes.length)

    if (type === 'ticker') {
     const sortedBuffers = sortBuffers(lastBuffers, marketCodes)
     setLoadingBuffer(sortedBuffers)
     buffer.current = []
    } else {
     if (lastBuffers) setSocketData([lastBuffers[0]])
     buffer.current = []
    }
   } else {
    const updatedBuffer = updateQueueBuffer(buffer.current, 100)
    buffer.current = updatedBuffer
    setSocketData(updatedBuffer)
   }
  }, 400),
  [marketCodes],
 )

 useEffect(() => {
  function connect() {
   socket.current = new WebSocket('wss://api.upbit.com/websocket/v1')
   socket.current.binaryType = 'arraybuffer'

   socket.current.onopen = () => {
    setIsConnected(true)

    if (socket.current?.readyState === 1) {
     const payload = [
      { ticket: type },
      {
       type,
       codes: marketCodes.map(({ market }) => market),
      },
     ]
     socket.current.send(JSON.stringify(payload))
    }
   }

   socket.current.onmessage = (ev) => {
    const data = socketDataEncoder(ev.data)
    buffer.current?.push(data)
    throttled()
   }

   //  socket.current.onclose = () => {
   //   console.log('closecloseclosecloseclosecloseclosecloseclosecloseclosecloseclosecloseclosecloseclosev')
   //   console.log('close', marketCodes[0].market)
   //   setIsConnected(false)
   //   setLoadingBuffer([])
   //   setSocketData([])
   //   buffer.current = []
   //  }

   socket.current.onerror = () => {
    socket.current?.close()

    setTimeout(() => {
     connect()
    }, 400)
   }
  }

  connect()

  return () => {
   if (socket.current && socket.current.readyState !== 0) {
    socket.current.close()
    socket.current = null
    setIsConnected(false)
    setLoadingBuffer([])
    setSocketData([])
    buffer.current = []
   }
  }
 }, [marketCodes])

 useEffect(() => {
  if (loadingBuffer.length < 1) {
   return
  }

  if (!socketData) {
   setSocketData(loadingBuffer)
  } else {
   setSocketData((prev) => {
    return updateSocketData(prev, loadingBuffer)
   })
   setLoadingBuffer([])
  }
 }, [loadingBuffer])

 return { socket: socket.current, isConnected, socketData }
}

export default useUpbit
