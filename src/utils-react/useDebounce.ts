import { useCallback, useEffect, useState } from 'react';


export const useDebounce = (fn: (...args: any[])=>any, delay: number, deps: any[] = []) => {
  
  const [start, setStart] = useState(()=>+new Date())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>setStart(+new Date()), deps)
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(fn,deps)
  
  useEffect(()=>{
    const timerId = setTimeout(callback,+new Date()+delay-start)
    return ()=>clearTimeout(timerId)
  },[callback,start,delay])
  
}