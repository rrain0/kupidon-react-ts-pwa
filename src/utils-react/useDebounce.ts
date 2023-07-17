import {useCallback, useEffect} from "react";


export const useDebounce = (fn: (...args: any[])=>any, delay: number, deps: any[] = []) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(fn,deps)
  
  useEffect(()=>{
    const handler = setTimeout(callback,delay)
    return ()=>clearTimeout(handler)
  },[callback])
}