import { useCallback, useRef } from 'react'

type AnyCallback = (...args: unknown[]) => unknown

export function useActualCallback<T extends AnyCallback>(callback: T): T {
  const callbackRef = useRef<T>(callback)
  callbackRef.current = callback
  const wrapper = (...args: Parameters<T>) => callbackRef.current(...args)
  return useCallback(wrapper as T, [])
}
