/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { cssTransition, ToastContainer, ToastTransition } from 'react-toastify'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import mobileWidth = EmotionCommon.mobileWidth
import center = EmotionCommon.center
import ReactMemoTyped = ReactUtils.Mem



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
      transition={ToastAnimations.slideInDownThenFadeOut}
    />
  </div>
  
})
export default ReactMemoTyped(ToastifySetup)




export namespace ToastAnimations {
  
  export const ShakeX: ToastTransition = cssTransition({
    enter: 'animate__animated animate__shakeX',
    exit: 'animate__animated animate__shakeX',
    collapse: false,
  })
  
  export const Bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut",
    collapse: false,
  })
  
  export const Scale: ToastTransition = cssTransition({
    enter: 'scale-up-center',
    exit: 'scale-down-center',
  })
  
  export const noAnimation: ToastTransition = cssTransition({
    enter: 'no-animation',
    exit: 'no-animation',
    collapse: false,
  })
  
  export const slideInDownThenFadeOut: ToastTransition = cssTransition({
    enter: 'animate__animated animate__faster animate__slideInDown',
    exit: 'animate__animated animate__faster animate__fadeOut',
    collapse: false,
  })
  
  export const noAnimationThenFadeOut: ToastTransition = cssTransition({
    enter: 'no-animation',
    exit: 'animate__animated animate__faster animate__fadeOut',
    collapse: false,
  })
}
