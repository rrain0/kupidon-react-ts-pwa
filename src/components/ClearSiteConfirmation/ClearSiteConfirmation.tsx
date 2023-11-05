/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import {
  ClearSiteConfirmationUiText
} from 'src/components/ClearSiteConfirmation/uiText'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { clearSiteData } from 'src/utils/app/clearSiteData'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useUiTextContainer } from 'src/utils/lang/useUiText'
import { Themes } from 'src/utils/theme/Themes'
import UseModalSheetState from 'src/views/BottomSheet/UseModalSheetState'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import col = EmotionCommon.col
import fixed = EmotionCommon.fixed
import textLarge1 = EmotionCommon.textLarge2
import center = EmotionCommon.center
import row = EmotionCommon.row
import Spinner8LinesIc = SimpleSvgIcons.Spinner8LinesIc
import Theme = Themes.Theme
import ClearTrashIc = SimpleSvgIcons.ClearTrashIc
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import Setter = TypeUtils.Setter





const sheetSnaps = [0,'fit-content','50%']
const sheetOpenIdx = 1


const ClearSiteConfirmation = (props:{
  open: boolean
  setOpen: Setter<boolean>
})=>{
  const { open, setOpen } = props
  
  const uiText = useUiTextContainer(ClearSiteConfirmationUiText)
  
  
  
  const [doClear, setDoClear] = useState(false)
  useEffect(
    ()=>{
      if (doClear){
        ;(async()=>{
          await clearSiteData()
          window.location.reload()
        })()
      }
    },
    [doClear]
  )
  
  
  
  return <>
    
    <UseModalSheetState
      open={open}
      setOpen={setOpen}
      snapPoints={sheetSnaps}
      openIdx={sheetOpenIdx}
      render={props => open && <BottomSheetBasic
        {...props.sheetProps}
        header={uiText.clearAppData[0].text+'?'}
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
              onClick={props.setClosing}
            >
              {uiText.no[0].text}
            </Button>
            
            <Button css={[ButtonStyle.roundedDanger, button]}
              onClick={()=>setDoClear(true)}
            >
              <ClearTrashIc css={[icon,iconOnDanger]}/>
              {uiText.yes[0].text}
            </Button>
            
          </div>
        </div>
      </BottomSheetBasic> }
    />
    
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
        {uiText.reloading[0].text}
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