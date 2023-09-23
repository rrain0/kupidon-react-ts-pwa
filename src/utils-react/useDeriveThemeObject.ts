import { useLayoutEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ThemeObjectRecoil, ThemeSettingsRecoil } from 'src/recoil/state/ThemeRecoil'
import { Themes } from 'src/theme/Themes'
import { useThemeDetector } from 'src/utils-react/media/useThemeDetector'


export const useDeriveThemeObject = ()=>{
  const themeSettings = useRecoilValue(ThemeSettingsRecoil)
  const [,setThemeObject] = useRecoilState(ThemeObjectRecoil)
  const systemThemeType = useThemeDetector()
  
  useLayoutEffect(()=>{
    let type = themeSettings.type
    if (type==='system')
      type = systemThemeType
    if (type==='dark')
      setThemeObject(Themes.themeByName(themeSettings.dark)!)
    if (type==='light')
      setThemeObject(Themes.themeByName(themeSettings.light)!)
  },[systemThemeType,themeSettings])
  
  
}