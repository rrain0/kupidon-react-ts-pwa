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
import { useLangDetector } from 'src/utils/react/lang/useLangDetector'
import arrIsNonEmpty = TypeUtils.arrIsNonEmpty



export const useLangSetup = ()=>{
  const [langSettingsRecoil,setLangSettingsRecoil] = useRecoilState(LangSettingsRecoil)
  const [langRecoil,setLangRecoil] = useRecoilState(LangRecoil)
  const systemLangs = useLangDetector()
  
  //console.log('langRecoil',langRecoil)
  
  useLayoutEffect(
    ()=>{
      if (arrIsNonEmpty(systemLangs)) setLangRecoil(s=>({
        ...s,
        systemLangAvailable: true,
      }))
      else setLangRecoil(s=>({
        ...s,
        systemLangAvailable: false,
      }))
    },
    [setLangRecoil, systemLangs]
  )
  
  
  useLayoutEffect(()=>{
    if (langSettingsRecoil.setting==='system'){
      const matchedSystemLangs = systemLangs?.filter((it): it is Lang => AppLangs.includes(it as any))
      if (arrIsNonEmpty(matchedSystemLangs)) setLangRecoil(s=>({
        ...s,
        lang: matchedSystemLangs,
        askUser: false,
      }))
      else setLangSettingsRecoil({
        ...langSettingsRecoil,
        setting: 'user',
      })
    }
    else if (langSettingsRecoil.setting==='user') {
      if (langSettingsRecoil.userSetting) setLangRecoil(s=>({
        ...s,
        lang: langSettingsRecoil.userSetting!,
        askUser: false,
      }))
      else setLangRecoil(s=>({
        ...s,
        lang: [fallbackLang],
        askUser: true, // todo really ask user
      }))
    }
  },[systemLangs, langSettingsRecoil, setLangRecoil, setLangSettingsRecoil])
  
  
  useLayoutEffect(()=>{
    if (langRecoil.lang){
      const html = document.documentElement
      html.lang = langRecoil.lang[0]
    }
  },[langRecoil.lang])
  
}