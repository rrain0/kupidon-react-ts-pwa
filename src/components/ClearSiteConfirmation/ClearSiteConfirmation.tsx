/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import {
  ClearSiteConfirmationUiText
} from 'src/components/ClearSiteConfirmation/uiText'
import ModalPortal from 'src/components/Modal/ModalPortal'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { clearSiteData } from 'src/utils/app/clearSiteData'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useUiTextContainer } from 'src/utils/lang/useUiText'
import { AppTheme } from 'src/utils/theme/AppTheme'
import UseBottomSheetState from 'src/views/BottomSheet/UseBottomSheetState'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import col = EmotionCommon.col
import fixed = EmotionCommon.fixed
import center = EmotionCommon.center
import row = EmotionCommon.row
import Spinner8LinesIc = SvgIcons.Spinner8LinesIc
import Theme = AppTheme.Theme
import ClearTrashIc = SvgIcons.ClearTrashIc
import BottomSheetBasic, {
  BasicSheetOpenIdx,
  BasicSheetSnaps,
} from 'src/views/BottomSheet/BottomSheetBasic'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
import Setter = TypeUtils.Callback1
import Txt = EmotionCommon.Txt







export type ClearSiteConfirmationProps = {
  open: boolean
  setOpen: Setter<boolean>
}
const ClearSiteConfirmation =
React.memo(
(props: ClearSiteConfirmationProps)=>{
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
    
    <UseBottomSheetState
      open={open}
      onClosed={()=>setOpen(false)}
      snapPoints={BasicSheetSnaps}
      openIdx={BasicSheetOpenIdx}
      render={props => <ModalPortal><BottomSheetBasic
        {...props.sheetProps}
        header={uiText.clearAppData[0].text + '?'}
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
            
            <Button css={[ButtonStyle.roundedAccent, button]}
              onClick={props.setClosing}
            >
              {uiText.no[0].text}
            </Button>
            
            <Button css={[ButtonStyle.roundedDanger, button]}
              onClick={() => setDoClear(true)}
            >
              <ClearTrashIc css={[icon, iconOnDanger]}/>
              {uiText.yes[0].text}
            </Button>
          
          </div>
        </div>
      </BottomSheetBasic></ModalPortal> }
    />
    
    { doClear && <div
      css={t => css`
        ${fixed};
        z-index: 40;
        background: ${t.page.bgc[0]}9a;
        color: ${t.page.content[0]};
        ${Txt.large2};
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
})
export default ClearSiteConfirmation




const icon = (t:Theme)=>css`
  ${SvgIcStyle.El.thiz.icon} {
    height: 1.333em;
    width: 1.333em;
    ${SvgIcStyle.Prop.prop.color}: ${t.page.content[0]};
  }
`
const iconOnDanger = (t:Theme)=>css`
  ${SvgIcStyle.El.thiz.icon} {
    ${SvgIcStyle.Prop.prop.color}: ${t.elementDanger.content[0]};
  }
`
const button = (t:Theme)=>css`
  ${ButtonStyle.El.thiz.btn} {
    min-width: 90px;
    gap: 0.3em;
  }
`