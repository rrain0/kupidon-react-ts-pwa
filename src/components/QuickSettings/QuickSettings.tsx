/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { QuickSettingsUiOptions } from 'src/components/QuickSettings/QuickSettingsUiOptions'
import { Themes } from 'src/theme/Themes'
import { CountryFlag } from 'src/utils/react/lang/CountryFlag'
import { useUiOptionObject } from 'src/utils/react/lang/useUiOptions'
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import { SheetState } from 'src/views/BottomSheet/useBottomSheet'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import RadioInput from 'src/views/Inputs/RadioInput'
import { RadioInputStyle } from 'src/views/Inputs/RadioInputStyle'
import { LangRecoil, LangSettingsRecoil } from 'src/recoil/state/LangRecoil'
import { ThemeSettingsRecoil } from 'src/recoil/state/ThemeRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Setter = TypeUtils.Setter
import col = EmotionCommon.col
import row = EmotionCommon.row
import Theme = Themes.Theme
import BrowserIc = SimpleSvgIcons.BrowserIc
import DayIc = SimpleSvgIcons.DayIc
import DayNightIc = SimpleSvgIcons.DayNightIc
import NightIc = SimpleSvgIcons.NightIc




export type SettingsProps = {
  open: boolean
  setOpen: Setter<boolean>
}
const QuickSettings = (props: SettingsProps)=>{
  const { open, setOpen } = props
  
  
  const [sheetState, setSheetState] = useState<SheetState>('closed')
  const [sheetSnaps] = useState([0,200,'fit-content','50%','80%'])
  const [snapIdx,setSnapIdx] = useState(2)
  const openIdx = 2
  
  const langRecoil = useRecoilValue(LangRecoil)
  
  const [themeSettings, setThemeSettings] = useRecoilState(ThemeSettingsRecoil)
  const [langSettings, setLangSettings] = useRecoilState(LangSettingsRecoil)
  
  const uiOptions0 = useUiOptionObject(QuickSettingsUiOptions)
  const uiOptions = useMemo(
    ()=>{
      const uiOptions = {...uiOptions0}
      if (!langRecoil.systemLangAvailable)
        uiOptions.languageOptions = uiOptions.languageOptions.filter(it=>it.value!=='system')
      return uiOptions
    },
    [langRecoil.systemLangAvailable, uiOptions0]
  )
  
  
  
  
  useEffect(()=>{
    if (open){
      setSheetState('opening')
      setSnapIdx(openIdx)
    }
  },[open])
  useEffect(()=>{
    if (sheetState==='closed'){
      setOpen(false)
    }
  },[setOpen, sheetState])
  
  
  const bottomSheetProps = {
    state: sheetState,
    setState: setSheetState,
    snapPoints: sheetSnaps,
    snapIdx: snapIdx,
    setSnapIdx: setSnapIdx,
  }
  
  
  return <>
    {open && <BottomSheetBasic
      {...bottomSheetProps}
      header={uiOptions.settings[0].text}
    >
      <div
        css={css`
          ${col};
          padding-bottom: 20px;
        `}
      >
        
        <div
          css={css`
            padding: 8px 6px;
          `}
        >
          {uiOptions.theme[0].text}:
        </div>
        
        {
          uiOptions.themeOptions
            .map(opt=><RadioInput
              css={RadioInputStyle.radio}
              childrenPosition='start'
              role='option'
              aria-selected={function(){
                if (themeSettings.setting==='system' && opt.value==='system')
                  return true
                if (themeSettings.setting!=='system' && opt.value===themeSettings.userSetting)
                  return true
                return false
              }()}
              checked={function(){
                if (themeSettings.setting==='system' && opt.value==='system')
                  return true
                if (themeSettings.setting!=='system' && opt.value===themeSettings.userSetting)
                  return true
                return false
              }()}
              value={opt.value}
              key={opt.value}
              onChange={ev=>{
                setThemeSettings(s=>({
                  ...s,
                  setting: opt.value==='system' ? 'system' : 'user',
                  userSetting: opt.value==='system' ? s.userSetting : opt.value,
                }))
              }}
              onClick={ev=>{
                setThemeSettings(s=>({
                  ...s,
                  setting: opt.value==='system' ? 'system' : 'user',
                  userSetting: opt.value==='system' ? s.userSetting : opt.value,
                }))
              }}
            >
              <OptionContainer>
                {opt.value==='system' && <DayNightIc css={icon} />}
                {opt.value==='light' && <DayIc css={icon} />}
                {opt.value==='dark' && <NightIc css={icon} />}
                {opt.text}
              </OptionContainer>
            </RadioInput>)
        }
        
        
        <div
          css={css`
            padding: 8px 6px;
          `}
        >
          {uiOptions.language[0].text}:
        </div>
        
        {
          uiOptions.languageOptions
            .map(opt=><RadioInput
              css={RadioInputStyle.radio}
              childrenPosition='start'
              role='option'
              aria-selected={function(){
                if (langSettings.setting==='system' && opt.value==='system')
                  return true
                if (langSettings.setting!=='system' && opt.value===langSettings.userSetting?.[0])
                  return true
                return false
              }()}
              checked={function(){
                if (langSettings.setting==='system' && opt.value==='system')
                  return true
                if (langSettings.setting!=='system' && opt.value===langSettings.userSetting?.[0])
                  return true
                return false
              }()}
              value={opt.value}
              key={opt.value}
              onChange={ev=>{
                if (opt.value==='system') setLangSettings({
                  ...langSettings,
                  setting: 'system',
                })
                else {
                  setLangSettings({
                    setting: 'user',
                    userSetting: [opt.value],
                  })
                }
              }}
              onClick={ev=>{
                if (opt.value==='system') setLangSettings({
                  ...langSettings,
                  setting: 'system',
                })
                else {
                  setLangSettings({
                    setting: 'user',
                    userSetting: [opt.value],
                  })
                }
              }}
            >
              <OptionContainer>
                {opt.value!=='system' && <Flag src={CountryFlag[opt.value]}/>}
                {opt.value==='system' && <BrowserIc css={icon} />}
                {opt.text}
              </OptionContainer>
            </RadioInput>)
        }
        
        
      
      </div>
    </BottomSheetBasic>}
  </>
}
export default QuickSettings


const OptionContainer = styled.div`
  flex: 1;
  padding-top: 4px;
  padding-bottom: 4px;
  ${row};
  gap: 0.3em;
  align-items: center;
`
const Flag = styled.img`
  width: 1.333em;
  aspect-ratio: 4/3;
  object-position: center;
  object-fit: cover;
  vertical-align: middle;
`
const icon = (t:Theme)=>css`
  &.rrainuiIcon {
    width: 1.333em;
    --icon-color: ${t.page.text[0]};
  }
`