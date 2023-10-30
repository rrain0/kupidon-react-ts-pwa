/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import {
  ClearSiteConfirmationUiOptions
} from 'src/components/ClearSiteConfirmation/ClearSiteConfirmationUiOptions'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { clearSiteData } from 'src/utils/app/clearSiteData'
import { Setter } from 'src/utils/common/TypeUtils'
import { useUiOptionsContainer } from 'src/utils/lang/useUiOptions'
import { Themes } from 'src/utils/theme/Themes'
import { SheetState } from 'src/views/BottomSheet/useBottomSheet'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import col = EmotionCommon.col
import fixed = EmotionCommon.fixed
import textLarge1 = EmotionCommon.textLarge1
import center = EmotionCommon.center
import row = EmotionCommon.row
import Spinner8LinesIc = SimpleSvgIcons.Spinner8LinesIc
import Theme = Themes.Theme
import ClearTrashIc = SimpleSvgIcons.ClearTrashIc
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'





const sheetSnaps = [0,'fit-content','50%']
const openIdx = 1


const ClearSiteConfirmation = (props:{
  open: boolean
  setOpen: Setter<boolean>
})=>{
  
  
  const [sheetState, setSheetState] = useState<SheetState>('closed')
  const [snapIdx,setSnapIdx] = useState(openIdx)
  const bottomSheetProps = {
    state: sheetState,
    setState: setSheetState,
    snapPoints: sheetSnaps,
    snapIdx: snapIdx,
    setSnapIdx: setSnapIdx,
  }
  
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
  },[props.setOpen, sheetState])
  
  
  const [doClear, setDoClear] = useState(false)
  useEffect(()=>{
    if (doClear){
      ;(async()=>{
        await clearSiteData()
        window.location.reload()
      })()
    }
  },[doClear])
  
  
  const uiOptions = useUiOptionsContainer(ClearSiteConfirmationUiOptions)
  
  return <>
    
    { props.open && <BottomSheetBasic
      {...bottomSheetProps}
      header={uiOptions.clearAppData[0].text+'?'}
    >
      <div
        css={css`
          ${col};
          padding-bottom: 20px;
        `}
      >
        <div
          css={css`
            ${row};
            justify-content: center;
            gap: 20px;
          `}
        >
          
          <Button css={[ButtonStyle.roundedNormal, button]}
            onClick={()=>setSheetState('closing')}
          >
            {uiOptions.no[0].text}
          </Button>
          
          <Button css={[ButtonStyle.roundedDanger, button]}
            onClick={()=>setDoClear(true)}
          >
            <ClearTrashIc css={[icon,iconOnDanger]}/>
            {uiOptions.yes[0].text}
          </Button>
          
        </div>
      </div>
    </BottomSheetBasic> }
    
    { doClear && <div
      css={t => css`
        ${fixed};
        z-index: 40;
        background: ${t.page.bgc[1]}9a;
        color: ${t.page.text[0]};
        ${textLarge1};
        ${center};
      `}
    >
      <div
        css={css`
          ${row};
          gap: 0.3em;
          align-items: center;
        `}
      >
        {<Spinner8LinesIc css={icon}/>}
        {uiOptions.reloading[0].text}
      </div>
    </div> }
  
  </>
}
export default ClearSiteConfirmation



const icon = (t:Theme)=>css`
  &.rrainuiIcon {
    height: 1.333em;
    width: 1.333em;
    --icon-color: ${t.page.text[0]};
  }
`
const iconOnDanger = (t:Theme)=>css`
  &.rrainuiIcon {
    --icon-color: ${t.element.danger.text[0]};
  }
`
const button = (t:Theme)=>css`
  &.rrainuiButton {
    min-width: 90px;
    gap: 0.3em;
  }
`