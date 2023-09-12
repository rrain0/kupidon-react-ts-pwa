/** @jsxImportSource @emotion/react */
import { useRecoilState, useRecoilValue } from 'recoil'
import React from 'react'
import { css, ThemeProvider } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ThemeObjRecoil, ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { ToastContainer } from 'react-toastify'
import center = EmotionCommon.center
import AppRouting from './AppRouting'
import AppPage from './AppPage'
import { ReactUtils } from '../../utils/ReactUtils';
import ReactMemoTyped = ReactUtils.ReactMemoTyped;





function App() {
  //const auth = useRecoilValue(authRecoil)
  const [theme, setTheme] = useRecoilState(ThemeRecoil)
  const themeObj = useRecoilValue(ThemeObjRecoil)
  
  
  /*useLayoutEffect(()=>{
    const html = document.querySelector('html') as HTMLElement
    html.setAttribute('data-theme', theme.type)
  },[theme.type])*/
  
  
  
  
  
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
export default ReactMemoTyped(App)



