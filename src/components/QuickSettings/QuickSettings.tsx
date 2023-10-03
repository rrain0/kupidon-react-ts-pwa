/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import ClearSiteConfirmation from 'src/components/ClearSiteConfirmation/ClearSiteConfirmation'
import { QuickSettingsUiOptions } from 'src/components/QuickSettings/QuickSettingsUiOptions'
import { Themes } from 'src/utils/theme/Themes'
import { CountryFlag } from 'src/utils/lang/CountryFlag'
import { useUiOptionsContainer } from 'src/utils/lang/useUiOptions'
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import { SheetState } from 'src/views/BottomSheet/useBottomSheet'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import RadioInput from 'src/views/Inputs/RadioInput'
import { RadioInputStyle } from 'src/views/Inputs/RadioInputStyle'
import { LangRecoil, LangSettingsRecoil } from 'src/recoil/state/LangRecoil'
import { ThemeRecoil, ThemeSettingsRecoil } from 'src/recoil/state/ThemeRecoil'
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




const sheetSnaps = [0,'20%','free','fit-content','free','50%','free','80%']
const openIdx = 3

export type SettingsProps = {
  open: boolean
  setOpen: Setter<boolean>
}
const QuickSettings = (props: SettingsProps)=>{
  const { open, setOpen } = props
  
  
  const [sheetState, setSheetState] = useState<SheetState>('closed')
  const [snapIdx,setSnapIdx] = useState(openIdx)
  
  const lang = useRecoilValue(LangRecoil)
  const theme = useRecoilValue(ThemeRecoil)
  const [themeSettings, setThemeSettings] = useRecoilState(ThemeSettingsRecoil)
  const [langSettings, setLangSettings] = useRecoilState(LangSettingsRecoil)
  
  
  const [clearSite, setClearSite] = useState(false)
  
  
  const uiOptions0 = useUiOptionsContainer(QuickSettingsUiOptions)
  const uiOptions = useMemo(
    ()=>{
      const uiOptions = {...uiOptions0}
      if (!lang.systemLangAvailable)
        uiOptions.languageOptions = uiOptions.languageOptions.filter(it=>it.value!=='system')
      if (!theme.systemThemeAvailable)
        uiOptions.themeOptions = uiOptions.themeOptions.filter(it=>it.value!=='system')
      return uiOptions
    },
    [lang.systemLangAvailable, theme.systemThemeAvailable, uiOptions0]
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
                if (themeSettings.setting!=='system' && opt.value===themeSettings.manualSetting)
                  return true
                return false
              }()}
              checked={function(){
                if (themeSettings.setting==='system' && opt.value==='system')
                  return true
                if (themeSettings.setting!=='system' && opt.value===themeSettings.manualSetting)
                  return true
                return false
              }()}
              value={opt.value}
              key={opt.value}
              onChange={ev=>{
                setThemeSettings(s=>({
                  ...s,
                  setting: opt.value==='system' ? 'system' : 'manual',
                  manualSetting: opt.value==='system' ? s.manualSetting : opt.value,
                }))
              }}
              onClick={ev=>{
                setThemeSettings(s=>({
                  ...s,
                  setting: opt.value==='system' ? 'system' : 'manual',
                  manualSetting: opt.value==='system' ? s.manualSetting : opt.value,
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
                if (langSettings.setting!=='system' && opt.value===langSettings.manualSetting?.[0])
                  return true
                return false
              }()}
              checked={function(){
                if (langSettings.setting==='system' && opt.value==='system')
                  return true
                if (langSettings.setting!=='system' && opt.value===langSettings.manualSetting?.[0])
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
                    setting: 'manual',
                    manualSetting: [opt.value],
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
                    setting: 'manual',
                    manualSetting: [opt.value],
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
        
        <div
          css={css`
            ${col};
            align-items: center;
          `}
        >
          <Button css={ButtonStyle.roundedNormal}
            onClick={()=>setClearSite(true)}
          >
            {uiOptions.clearAppData[0].text}
          </Button>
        </div>
      
      </div>
    </BottomSheetBasic>}
    
    <ClearSiteConfirmation open={clearSite} setOpen={setClearSite} />
    
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
    height: 1.333em;
    width: 1.333em;
    --icon-color: ${t.page.text[0]};
  }
`




