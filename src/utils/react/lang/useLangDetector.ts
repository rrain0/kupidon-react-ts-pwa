import { useMemo } from 'react'


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
  let browserLangs: readonly string[] | undefined = navigator.languages
  if ((!browserLangs || !browserLangs.length) && navigator.language)
    browserLangs = [navigator.language]
  if (!browserLangs || !browserLangs.length) browserLangs = undefined
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