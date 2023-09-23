/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { QuickSettingsUiOptions } from 'src/components/QuickSettings/QuickSettingsUiOptions'
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import { SheetSnapPoints, SheetState } from 'src/views/BottomSheet/useBottomSheet'
import RadioInput from 'src/views/Inputs/RadioInput'
import { RadioInputStyle } from 'src/views/Inputs/RadioInputStyle'
import { LangRecoil } from 'src/recoil/state/LangRecoil'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { TypeUtils } from 'src/utils/TypeUtils'
import Setter = TypeUtils.Setter
import col = EmotionCommon.col



export type SettingsProps = {
  open: boolean
  setOpen: Setter<boolean>
}
const QuickSettings = (props: SettingsProps)=>{
  
  
  const [sheetState, setSheetState] = useState<SheetState>('closed')
  const [sheetSnaps] = useState([0,200,'fit-content','50%','80%'])
  const [snapIdx,setSnapIdx] = useState(2)
  const openIdx = 2
  
  
  const [theme, setTheme] = useRecoilState(ThemeRecoil)
  const [lang, setLang] = useRecoilState(LangRecoil)
  
  const themeOptions = useMemo(
    ()=>QuickSettingsUiOptions.theme.filter(it=>it.lang===lang)
    ,[lang]
  )
  
  
  useEffect(()=>{
    if (props.open){
      setSheetState('opening')
      setSnapIdx(openIdx)
    }
  },[props.open])
  useEffect(()=>{
    if (sheetState==='closed'){
      props.setOpen(false)
    }
  },[sheetState])
  
  
  const bottomSheetProps = {
    state: sheetState,
    setState: setSheetState,
    snapPoints: sheetSnaps,
    snapIdx: snapIdx,
    setSnapIdx: setSnapIdx,
  }
  
  
  return <>
    {props.open && <BottomSheetBasic
      {...bottomSheetProps}
      header={'Настройки'}
    >
      <div
        css={css`
          ${col};
          padding-bottom: 20px;
        `}
      >
        {
          themeOptions
            .map(opt=><RadioInput
              css={RadioInputStyle.radio}
              childrenPosition='start'
              role='option'
              aria-selected={opt.value===theme.type}
              checked={opt.value===theme.type}
              value={opt.value}
              key={opt.value}
              onChange={ev=>{
                setTheme(()=>({...theme, type: opt.value}))
                setSheetState('closing')
              }}
              onClick={ev=>{
                setTheme(()=>({...theme, type: opt.value}))
                setSheetState('closing')
              }}
            >
              <div
                css={css`
                  flex: 1;
                  padding-top: 4px;
                  padding-bottom: 4px;
                `}
              >{opt.text}</div>
            </RadioInput>)
        }
      
      </div>
    </BottomSheetBasic>}
  </>
}
export default QuickSettings