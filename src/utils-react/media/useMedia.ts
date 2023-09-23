import { useMemo, useState, useEffect } from 'react'


export const useMedia = (media: string) => {
  
  
  const mediaQuery = useMemo(()=>{
    const mq = window.matchMedia(media)
    mq.onchange = ()=>{
      setMatches(mq.matches)
      console.log('mq',mq)
    }
    return mq
  }, [media])
  
  const [matches, setMatches] = useState(mediaQuery.matches)
  
  return matches
}


