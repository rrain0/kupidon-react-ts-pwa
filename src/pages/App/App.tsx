/** @jsxImportSource @emotion/react */
import { css, Global, ThemeProvider } from '@emotion/react'
import { useRecoilValue } from 'recoil'
import React from 'react'
import ModalOutlet from 'src/components/ModalPortal/ModalOutlet'
import AppFrame from 'src/pages/App/AppFrame'
import ToastifySetup from 'src/components/Toasts/ToastifySetup'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { useAppInstallationSetup } from 'src/utils/app/useAppInstallationSetup'
import { useLangSetup } from 'src/utils/lang/useLangSetup'
import { useThemeSetup } from 'src/utils/theme/useThemeSetup'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import ReactMemoTyped = ReactUtils.Mem





function App() {
  useAppInstallationSetup()
  useLangSetup()
  useThemeSetup()
  
  const theme = useRecoilValue(ThemeRecoil)
  
  
  
  
  
  return <ThemeProvider theme={theme.theme}>
    
    <Global styles={t=>css`
      body {
        // will be WINDOW background
        background: ${t.page.bgc[0]};
      }
    `}/>
    
    <AppFrame/>
    
    <ModalOutlet/>
    
    <ToastifySetup/>
    
  </ThemeProvider>
}
export default ReactMemoTyped(App)





