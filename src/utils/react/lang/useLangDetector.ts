import { useLayoutEffect, useMemo, useState } from 'react'


/*
  https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
  css 'color-scheme: light dark;'
 
  https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
  css '@media (prefers-color-scheme: dark) { }'
*/


/*

  Examples:
  navigator.language => "ru-RU"
  navigator.languages => ["ru-RU", "en", "en-us", "en-US", "zh-CN", "ja-JP"]

*/



// returns array of at least 1 language or undefined
export const useLangDetector = (): [string, ...string[]] | undefined => {
  
  const [browserLangs,setBrowserLangs] = useState(undefined as undefined|[string, ...string[]])
  
  const updateBrowserLangs = ()=>{
    let langs: readonly string[] | undefined = navigator.languages
    if ((!langs || !langs.length) && navigator.language)
      langs = [navigator.language]
    if (!langs || !langs.length) langs = undefined
    setBrowserLangs(langs as [string, ...string[]] | undefined)
  }
  
  useLayoutEffect(()=>{
    updateBrowserLangs()
    const onLangChange = ()=>updateBrowserLangs()
    window.addEventListener('languagechange',onLangChange)
    return ()=>window.removeEventListener('languagechange',onLangChange)
  },[])
  
  
  const langs = useMemo(
    ()=>browserLangs?.map(it=>{
        if (it.startsWith('en')) return 'en-US'
        if (it.startsWith('ru')) return 'ru-RU'
        return it
    }),
    browserLangs
  ) as [string, ...string[]] | undefined
  
  
  return langs
}