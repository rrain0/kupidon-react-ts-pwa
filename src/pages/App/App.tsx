/** @jsxImportSource @emotion/react */
import { useRecoilValue } from 'recoil'
import React, { useLayoutEffect, useState } from 'react'
import { css, ThemeProvider } from '@emotion/react'
import AppFrame from 'src/pages/App/AppFrame'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ThemeObjectRecoil } from 'src/recoil/state/ThemeRecoil'
import { ToastContainer } from 'react-toastify'
import { useDeriveThemeObject } from 'src/utils-react/useDeriveThemeObject'
import center = EmotionCommon.center
import { ReactUtils } from 'src/utils/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import mobileWidth = EmotionCommon.mobileWidth





function App() {
  useDeriveThemeObject()
  const themeObject = useRecoilValue(ThemeObjectRecoil)
  
  
  const [readyToRender, setReadyToRender] = useState(false)
  useLayoutEffect(()=>{
    if (themeObject) setReadyToRender(true)
    else setReadyToRender(false)
  },[themeObject])
  
  
  if (!readyToRender) return <></>
  return <ThemeProvider theme={themeObject}>
    
    <AppFrame/>
    
    <div
      css={css`
        display: contents;
        
        .Toastify {
          display: block;
          
          .Toastify__toast-container {
            display: block;

            .Toastify__toast {
              border-radius: 15px;
              ${mobileWidth(css`
                margin: 6px;
                border-radius: 15px;
              `)}

              .Toastify__close-button {
                flex-shrink: 0;
                ${center};
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
        draggablePercent={40}
        hideProgressBar={true}
        newestOnTop={true}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme={themeObject.type}
      />
    </div>
    
  </ThemeProvider>
}
export default ReactMemoTyped(App)



