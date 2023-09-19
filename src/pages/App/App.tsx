/** @jsxImportSource @emotion/react */
import { useRecoilValue } from 'recoil'
import React from 'react'
import { css, ThemeProvider } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ThemeObjRecoil, ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { ToastContainer } from 'react-toastify'
import center = EmotionCommon.center
import AppRouting from './AppRouting'
import AppPage from './AppPage'
import { ReactUtils } from 'src/utils/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import mobileWidth = EmotionCommon.mobileWidth





function App() {
  //const auth = useRecoilValue(authRecoil)
  const theme = useRecoilValue(ThemeRecoil)
  const themeObj = useRecoilValue(ThemeObjRecoil)
  
  
  
  
  
  return <ThemeProvider theme={themeObj}>
    
    <AppRouting/>
    
    <AppPage />
    
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
      theme={theme.type}
      css={css`
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
      `}
    />
    
  </ThemeProvider>
}
export default ReactMemoTyped(App)



