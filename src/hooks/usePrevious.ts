import { useEffect, useRef } from 'react'

function usePrevious<T>(initialValue: T) {
 const value = useRef<T>()

 useEffect(() => {
  value.current = initialValue
 }, [initialValue])

 return value.current
}

export default usePrevious
