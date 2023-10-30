import { useLayoutEffect, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import {
  fallbackLang,
  Lang,
  LangRecoil,
  LangSettingsRecoil,
} from 'src/recoil/state/LangRecoil'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { useLangDetector } from 'src/utils/lang/useLangDetector'
import arrIsNonEmpty = ArrayUtils.arrIsNonEmpty



function getAvailableSystemLangs(systemLangs: string[] | undefined): Lang[] {
  return (systemLangs??[]).filter(sl=>AppLangs.includes(sl as any)) as Lang[]
}



export const useLangSetup = ()=>{
  const [langSettings,setLangSettings] = useRecoilState(LangSettingsRecoil)
  const [lang,setLang] = useRecoilState(LangRecoil)
  const systemLangs = useLangDetector()
  
  //console.log('lang',lang)
  //console.log('systemLangs',systemLangs)
  
  
  useLayoutEffect(
    ()=>{
      setLang(s=>({
        ...s,
        availableSystemLangs: getAvailableSystemLangs(systemLangs),
      }))
    },
    [setLang, systemLangs]
  )
  
  
  
  useLayoutEffect(
    ()=>{
      if (langSettings.setting==='system'){
        const available = lang.availableSystemLangs
        if (!available) return
        if (arrIsNonEmpty(available)) setLang(s=>({
          ...s,
          lang: [...available,fallbackLang],
        }))
        else setLangSettings({
          ...langSettings,
          setting: 'manual',
        })
      }
      else if (langSettings.setting==='manual') {
        if (langSettings.manualSetting) setLang(s=>({
          ...s,
          lang: langSettings.manualSetting!,
        }))
        else setLang(s=>({
          ...s,
          lang: [fallbackLang],
        }))
      }
    },
    [lang.availableSystemLangs, langSettings, setLang, setLangSettings]
  )
  
  
  useLayoutEffect(()=>{
    if (lang.lang){
      setHtmlTags(lang.lang)
    }
  },[lang.lang])
  
}