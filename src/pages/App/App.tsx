/** @jsxImportSource @emotion/react */
import { useRecoilState, useRecoilValue } from 'recoil'
import React, { useLayoutEffect } from 'react'
import { css, ThemeProvider } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { themeObjState, themeState } from 'src/recoil/state/ThemeState'
import { ToastContainer } from 'react-toastify'
import center = EmotionCommon.center
import AppRouting from './AppRouting'
import AppPage from './AppPage';





function App() {
  //const auth = useRecoilValue(authState)
  const [theme, setTheme] = useRecoilState(themeState)
  const themeObj = useRecoilValue(themeObjState)
  
  
  /*useLayoutEffect(()=>{
    const html = document.querySelector('html') as HTMLElement
    html.setAttribute('data-theme', theme.type)
  },[theme.type])*/
  
  
  return <ThemeProvider theme={themeObj}>
    
    <AppRouting />
    
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
          @media only screen and (max-width: 480px) {
            margin: 6px;
            border-radius: 15px;
          }
          .Toastify__close-button {
            flex-shrink: 0;
            ${center};
          }
        }
      `}
    />
    
  </ThemeProvider>
}
export default App



