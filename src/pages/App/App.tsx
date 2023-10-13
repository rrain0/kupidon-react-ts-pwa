/** @jsxImportSource @emotion/react */
import { useRecoilValue } from 'recoil'
import React, { useEffect } from 'react'
import { css, ThemeProvider } from '@emotion/react'
import AppFrame from 'src/pages/App/AppFrame'
import { AppRecoil } from 'src/recoil/state/AppRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { ToastContainer } from 'react-toastify'
import { useAppInstallationSetup } from 'src/utils/app/useAppInstallationSetup'
import { useLangSetup } from 'src/utils/lang/useLangSetup'
import { useThemeSetup } from 'src/utils/theme/useThemeSetup'
import center = EmotionCommon.center
import { ReactUtils } from 'src/utils/common/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import mobileWidth = EmotionCommon.mobileWidth





function App() {
  useAppInstallationSetup()
  useLangSetup()
  useThemeSetup()
  
  const theme = useRecoilValue(ThemeRecoil)
  
  
  
  /*
  const app = useRecoilValue(AppRecoil)
  useEffect(()=>{
    console.log('app',app)
  },[app])
   */
  
  
  
  return <ThemeProvider theme={theme.theme}>
    
    <AppFrame/>
    
    <div
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
        theme={theme.theme.type}
      />
    </div>
    
  </ThemeProvider>
}
export default ReactMemoTyped(App)




