import { Dispatch, useCallback, useState } from 'react';


export const usePrevState = <S>(initialState: S | (() => S)) => {
  // @ts-ignore
  const initialValue: S = typeof initialState==='function' ? initialState() : initialState
  const [container, setContainer] = useState<{ now: S, prev: S }>(
    { now: initialValue, prev: initialValue }
  )
  
  const setValue: Dispatch<S | ((state: S, prevState: S) => S)> = useCallback((value) => {
    setContainer(v=>{
      // @ts-ignore
      const newValue = typeof value==='function' ? value(v.now, v.prev) : value
      if (newValue===v.now) return v
      return { now: newValue, prev: v.now }
    })
  },[])
  
  return [container.now, container.prev, setValue] as const
}