import { useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'
import {
  AppLangs,
  fallbackLang,
  Lang,
  LangRecoil,
  LangSettingsRecoil,
} from 'src/recoil/state/LangRecoil'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useLangDetector } from 'src/utils/lang/useLangDetector'
import arrIsNonEmpty = TypeUtils.arrIsNonEmpty



export const useLangSetup = ()=>{
  const [langSettings,setLangSettings] = useRecoilState(LangSettingsRecoil)
  const [lang,setLang] = useRecoilState(LangRecoil)
  const systemLangs = useLangDetector()
  
  //console.log('lang',lang)
  //console.log('systemLangs',systemLangs)
  
  useLayoutEffect(
    ()=>{
      if (arrIsNonEmpty(systemLangs)) setLang(s=>({
        ...s,
        systemLangAvailable: true,
      }))
      else setLang(s=>({
        ...s,
        systemLangAvailable: false,
      }))
    },
    [setLang, systemLangs]
  )
  
  
  useLayoutEffect(()=>{
    if (langSettings.setting==='system'){
      const matchedLangs = systemLangs?.filter(
        (it): it is Lang => AppLangs.includes(it as any)
      )
      //console.log('matchedLangs',matchedLangs)
      if (arrIsNonEmpty(matchedLangs)) setLang(s=>({
        ...s,
        lang: matchedLangs,
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
  },[systemLangs, langSettings, setLang, setLangSettings])
  
  
  useLayoutEffect(()=>{
    if (lang.lang){
      const html = document.documentElement
      html.lang = lang.lang[0]
    }
  },[lang.lang])
  
}