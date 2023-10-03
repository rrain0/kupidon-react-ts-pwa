/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LangSettingsUiOptions } from 'src/components/LangSettings/LangSettingsUiOptions'
import { Themes } from 'src/utils/theme/Themes'
import { CountryFlag } from 'src/utils/lang/CountryFlag'
import { useUiOptionsContainer } from 'src/utils/lang/useUiOptions'
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import { SheetState } from 'src/views/BottomSheet/useBottomSheet'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import RadioInput from 'src/views/Inputs/RadioInput'
import { RadioInputStyle } from 'src/views/Inputs/RadioInputStyle'
import { LangRecoil, LangSettingsRecoil } from 'src/recoil/state/LangRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Setter = TypeUtils.Setter
import col = EmotionCommon.col
import row = EmotionCommon.row
import Theme = Themes.Theme
import BrowserIc = SimpleSvgIcons.BrowserIc



const sheetSnaps = [0,'20%','free','fit-content','free','50%','free','80%']

export type SettingsProps = {
  open: boolean
  setOpen: Setter<boolean>
}
const LangSettings = (props: SettingsProps)=>{
  const { open, setOpen } = props
  
  
  const [sheetState, setSheetState] = useState<SheetState>('closed')
  const [snapIdx,setSnapIdx] = useState(3)
  const openIdx = 3
  
  const langRecoil = useRecoilValue(LangRecoil)
  
  const [langSettings, setLangSettings] = useRecoilState(LangSettingsRecoil)
  
  const uiOptions0 = useUiOptionsContainer(LangSettingsUiOptions)
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
      header={<div css={css`height: 1em;`}/>}
    >
      <div
        css={css`
          ${col};
          padding-bottom: 20px;
        `}
      >
        
        
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
        
        
      
      </div>
    </BottomSheetBasic>}
  </>
}
export default LangSettings


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