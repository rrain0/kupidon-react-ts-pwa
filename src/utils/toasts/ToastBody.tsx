/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
import SpinnerCircleQuarterIc = SvgIcons.SpinnerCircleQuarterIc
import InfoToastifyIc = SvgIcons.InfoToastifyIc
import CheckmarkCircleToastifyIc = SvgIcons.CheckmarkCircleToastifyIc
import WarnTriangleToastifyIc = SvgIcons.WarnTriangleToastifyIc
import DangerRoundToastifyIc = SvgIcons.DangerRoundToastifyIc
import CrossIc = SvgIcons.CrossIc
import row = EmotionCommon.row
import resetButton = EmotionCommon.resetButton
import center = EmotionCommon.center
import Txt = EmotionCommon.Txt
import hoverable = EmotionCommon.hoverable



export type ToastType = 'normal'|'loading'|'info'|'ok'|'warn'|'danger'
export type ToastBodyProps = {
  closeToast?: (()=>void) | undefined
  showCloseButton?: boolean|undefined
  type?: ToastType|undefined
  children?: React.ReactNode
}
export const ToastBody = React.memo((props: ToastBodyProps)=>{
  const showClose = props.showCloseButton ?? true
  const type = props.type ?? 'normal'
  
  return <Body
    css={css`
      ${props.showCloseButton && css`padding-right: 30px;`}
    `}
  >
    
    
    { type==='loading' && <SpinnerCircleQuarterIc
      css={t=>css`
        width: 20px;
        height: 20px;
        ${SvgIcStyle.Prop.color}: ${t.toast.loading.accent[0]};
        ${SvgIcStyle.Prop.accentColor}: ${t.toast.loading.accent[1]};
      `}
    />}
    
    { type==='info' && <InfoToastifyIc
      css={t=>css`
        width: 20px;
        height: 20px;
        --icon-color: ${t.toast.info.accent[0]};
      `}
    />}
    
    { type==='ok' && <CheckmarkCircleToastifyIc
      css={t=>css`
        width: 20px;
        height: 20px;
        ${SvgIcStyle.Prop.color}: ${t.toast.ok.accent[0]};
      `}
    />}
    
    { type==='warn' && <WarnTriangleToastifyIc
      css={t=>css`
        width: 20px;
        height: 20px;
        ${SvgIcStyle.Prop.color}: ${t.toast.warn.accent[0]};
      `}
    />}
    
    { type==='danger' && <DangerRoundToastifyIc
      css={t=>css`
        width: 20px;
        height: 20px;
        ${SvgIcStyle.Prop.color}: ${t.toast.danger.accent[0]};
      `}
    />}
    
    
    
    <Content>
      {props.children}
    </Content>
    
    
    { showClose && <CloseButton
      onClick={props.closeToast}
    >
      <CrossIc/>
    </CloseButton>}
  
  
  </Body>
})

const Body = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px 14px;
  position: relative;
  ${row};
  gap: 10px;
  align-items: center;
  background: ${p=>p.theme.toast.normal.bgc[0]};
`

const Content = styled.div`
  ${row};
  flex: 1;
  color: ${p=>p.theme.toast.normal.content[0]};
  white-space: break-spaces;
  ${Txt.small2};
`

const CloseButton = styled.button`
  ${resetButton};
  position: absolute;
  top: 3px; right: 3px;
  width: 28px;
  height: 28px;
  padding: 7px;
  ${center};
  cursor: pointer;

  >${SvgIcStyle.El.iconClass} {
    width: 100%;
    height: 100%;
    ${SvgIcStyle.Prop.color}: ${p=>p.theme.toast.normal.content[1]};
  }
  
  ${hoverable}{
    :hover>${SvgIcStyle.El.iconClass} {
      ${SvgIcStyle.Prop.color}: ${p=>p.theme.toast.normal.content[2]};
    }
  }
`
