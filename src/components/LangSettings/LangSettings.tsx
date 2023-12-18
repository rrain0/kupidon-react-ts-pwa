/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LangSettingsUiText } from 'src/components/LangSettings/uiText'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { Themes } from 'src/utils/theme/Themes'
import { CountryFlag } from 'src/utils/lang/CountryFlag'
import { useUiTextContainer } from 'src/utils/lang/useUiText'
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import { SheetState } from 'src/views/BottomSheet/useBottomSheet'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
import RadioInput from 'src/views/Inputs/RadioInput/RadioInput'
import { RadioInputStyle } from 'src/views/Inputs/RadioInput/RadioInputStyle'
import { Lang, LangRecoil, LangSettingsRecoil } from 'src/recoil/state/LangRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Setter = TypeUtils.Setter
import col = EmotionCommon.col
import row = EmotionCommon.row
import Theme = Themes.Theme
import BrowserIc = SvgIcons.BrowserIc
import Mem = ReactUtils.Mem




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
  
  const lang = useRecoilValue(LangRecoil)
  
  const [langSettings, setLangSettings] = useRecoilState(LangSettingsRecoil)
  
  
  const uiText = useUiTextContainer(LangSettingsUiText)
  const languageOptions = useMemo(
    ()=>{
      let text = [
        {
          value: 'system',
          text: uiText.systemLanguage[0].text,
        },{
          value: 'ru-RU',
          text: uiText.russian[0].text,
        },{
          value: 'en-US',
          text: uiText.english[0].text,
        }
      ] satisfies { value: Lang|'system', text: string }[]
      if (!lang.availableSystemLangs?.length) text = text.filter(it=>it.value!=='system')
      return text
    },
    [uiText, lang.availableSystemLangs]
  )
  const isLanguageOptionChecked = useCallback(
    function (value: Lang|'system') {
      return langSettings.setting === 'system' && value === 'system'
        || langSettings.setting !== 'system' && value === langSettings.manualSetting?.[0]
    },
    [langSettings]
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
          languageOptions.map(opt => <RadioInput
            css={RadioInputStyle.radio}
            childrenPosition="start"
            checked={isLanguageOptionChecked(opt.value)}
            value={opt.value}
            key={opt.value}
            onChange={ev => {
              if (opt.value === 'system') setLangSettings({
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
              {opt.value !== 'system' && <Flag src={CountryFlag[opt.value]}/>}
              {opt.value === 'system' && <BrowserIc css={icon}/>}
              {opt.text}
            </OptionContainer>
          </RadioInput>)
        }
        
        
      
      </div>
    </BottomSheetBasic>}
  </>
}
export default Mem(LangSettings)



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
  ${SvgIcStyle.El.iconThis} {
    width: 1.333em;
    ${SvgIcStyle.Prop.color}: ${t.page.content[0]};
  }
`