import { Dispatch, SetStateAction, useState } from 'react';


export const usePrevState = <S>(initialState: S | (() => S)) => {
  const [prev, setPrev] = useState(initialState)
  const [now, setNow] = useState(initialState)
  
  const setValue: Dispatch<SetStateAction<S>> = (value) => {
    if (value!==now){
      setPrev(now)
      setNow(value)
    }
  }
  
  return [now, prev, setValue] as const
}