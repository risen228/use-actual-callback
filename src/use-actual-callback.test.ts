import { act, renderHook } from '@testing-library/react-hooks'
import { useCallback, useState } from 'react'
import { useActualCallback } from './use-actual-callback'

type Callback = (...args: unknown[]) => unknown
const scope = (callback: Callback) => callback()

it('works in simple case', () => {
  const { result } = renderHook(() => useActualCallback(() => 5))
  expect(result.current()).toBe(5)
})

function run() {
  const { result } = renderHook(() => {
    const [state, setState] = useState(1)

    const actualCallback = useActualCallback(() => {
      return { state }
    })

    const simpleCallback = useCallback(() => {
      return { state }
    }, [])

    const simpleCallbackWithDeps = useCallback(() => {
      return { state }
    }, [state])

    return {
      state,
      setState,
      actualCallback,
      simpleCallback,
      simpleCallbackWithDeps,
    }
  })

  return result
}

it('reacts to external variables update', () => {
  const result = run()

  act(() => {
    result.current.setState(2)
  })

  scope(() => {
    const { state } = result.current.actualCallback()
    expect(state).toBe(2)
  })

  scope(() => {
    const { state } = result.current.simpleCallback()
    expect(state).toBe(1)
  })

  scope(() => {
    const { state } = result.current.simpleCallbackWithDeps()
    expect(state).toBe(2)
  })
})

it('has the same reference after update', () => {
  const result = run()

  const previousReferences = {
    ...result.current,
  }

  act(() => {
    result.current.setState(2)
  })

  scope(() => {
    expect(result.current.actualCallback).toBe(
      previousReferences.actualCallback
    )
  })

  scope(() => {
    expect(result.current.simpleCallback).toBe(
      previousReferences.simpleCallback
    )
  })

  scope(() => {
    expect(result.current.simpleCallbackWithDeps).not.toBe(
      previousReferences.simpleCallbackWithDeps
    )
  })
})
