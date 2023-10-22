/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { cssTransition, ToastContainer, ToastTransition } from 'react-toastify'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import mobileWidth = EmotionCommon.mobileWidth
import center = EmotionCommon.center
import row = EmotionCommon.row
import SpinnerCircleQuarterIc = SimpleSvgIcons.SpinnerCircleQuarterIc
import resetButton = EmotionCommon.resetButton
import onHover = EmotionCommon.onHover
import CrossIc = SimpleSvgIcons.CrossIc
import CheckmarkCircleToastifyIc = SimpleSvgIcons.CheckmarkCircleToastifyIc
import DangerRoundToastifyIc = SimpleSvgIcons.DangerRoundToastifyIc
import InfoToastifyIc = SimpleSvgIcons.InfoToastifyIc
import WarnTriangleToastifyIc = SimpleSvgIcons.WarnTriangleToastifyIc
import textSmall2 = EmotionCommon.textSmall2
import ReactMemoTyped = ReactUtils.ReactMemoTyped



const ToastifySetup = React.memo(()=>{
  
  return <div
    css={css`
        display: contents;
        
        .Toastify {
          display: block;
          
          .Toastify__toast-container {
            display: block;
            * {
              display: flex;
              flex-flow: row nowrap;
            }

            .Toastify__toast {
              border-radius: 15px;
              ${mobileWidth(css`
                margin: 6px;
                border-radius: 15px;
              `)}
              padding: 0;
              background: none;

              .Toastify__toast-body {
                margin: 0;
                padding: 0;
                
                >div:first-of-type {
                  display: contents;
                }
                
                .Toastify__close-button {
                  flex-shrink: 0;
                  ${center};
                }
              }
            }
          }
        }
      `}
  >
    <ToastContainer
      position="top-center"
      autoClose={false}
      closeButton={false}
      closeOnClick={false}
      draggable
      draggablePercent={30}
      hideProgressBar={true}
      newestOnTop={true}
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme='light'
      transition={slideInDownThenFadeOut}
    />
  </div>
  
})
export default ReactMemoTyped(ToastifySetup)




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
        --icon-color: ${t.toast.loading.accent[0]};
        --accent-color: ${t.toast.loading.accent[1]};
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
        --icon-color: ${t.toast.ok.accent[0]};
      `}
    />}
    
    { type==='warn' && <WarnTriangleToastifyIc
      css={t=>css`
        width: 20px;
        height: 20px;
        --icon-color: ${t.toast.warn.accent[0]};
      `}
    />}
    
    { type==='danger' && <DangerRoundToastifyIc
      css={t=>css`
        width: 20px;
        height: 20px;
        --icon-color: ${t.toast.danger.accent[0]};
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
  ${textSmall2};
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
  
  .rrainuiIcon {
    width: 100%;
    height: 100%;
    --icon-color: ${p=>p.theme.toast.normal.content[1]};
  }
  ${p=>onHover(css`
    .rrainuiIcon {
      --icon-color: ${p.theme.toast.normal.content[2]};
    }
  `)}
`




const ShakeX: ToastTransition = cssTransition({
  enter: 'animate__animated animate__shakeX',
  exit: 'animate__animated animate__shakeX',
  collapse: false,
})

const Bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut",
  collapse: false,
})

const Scale: ToastTransition = cssTransition({
  enter: 'scale-up-center',
  exit: 'scale-down-center',
})

const noAnimation: ToastTransition = cssTransition({
  enter: 'no-animation',
  exit: 'no-animation',
  collapse: false,
})

const slideInDownThenFadeOut: ToastTransition = cssTransition({
  enter: 'animate__animated animate__faster animate__slideInDown',
  exit: 'animate__animated animate__faster animate__fadeOut',
  collapse: false,
})

const noAnimationThenFadeOut: ToastTransition = cssTransition({
  enter: 'no-animation',
  exit: 'animate__animated animate__faster animate__fadeOut',
  collapse: false,
})