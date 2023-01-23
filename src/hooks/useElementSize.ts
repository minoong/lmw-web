import { useCallback, useLayoutEffect, useState } from 'react'
import type { RefObject } from 'react'

export default function useElementSize(ref: RefObject<HTMLElement>, callback?: (entry: DOMRectReadOnly) => void) {
 const [width, setWidth] = useState<number>(0)
 const [height, setHeight] = useState<number>(0)

 const handleResize = useCallback(
  (entries: ResizeObserverEntry[]) => {
   if (!Array.isArray(entries)) {
    return
   }

   const entry = entries[0]
   const { width, height } = entry.contentRect

   setWidth(width)
   setHeight(height)

   if (callback) {
    callback(entry.contentRect)
   }
  },
  [callback],
 )

 useLayoutEffect(() => {
  if (!ref.current) {
   return
  }

  const ro = new ResizeObserver((entries) => handleResize(entries))
  ro.observe(ref.current, { box: 'border-box' })

  // eslint-disable-next-line consistent-return
  return () => {
   ro.disconnect()
  }
 }, [handleResize, ref])

 return [width, height]
}
