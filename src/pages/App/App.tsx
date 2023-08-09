/** @jsxImportSource @emotion/react */
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from 'src/recoil/AuthState';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutes } from 'src/app-routes/AppRoutes';
import LoginPage from '../LoginPage/LoginPage';
import LoginPage1 from '../LoginPage/LoginPage1';
import UserInfo from '../UserInfo/UserInfo';
import SignupPage from '../Signup/SignupPage';
import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { EmotionCommon } from 'src/styles/EmotionCommon';
import row = EmotionCommon.row;
import { themeObjState, themeState } from 'src/recoil/ThemeState';
import { ToastContainer } from 'react-toastify';
import center = EmotionCommon.center;



function App() {
  const auth = useRecoilValue(authState)
  const [theme, setTheme] = useRecoilState(themeState)
  const themeObj = useRecoilValue(themeObjState)
  
  const changeTheme = ()=>{
    switch (theme.current){
      case 'light': setTheme(v=>({ ...v, current: 'dark' })); break
      case 'dark': setTheme(v=>({ ...v, current: 'light' })); break
    }
  }
  
  
  return <ThemeProvider theme={themeObj}>
    
    <Routes>
      {!auth && <>
        <Route path="*" element={<Navigate to={AppRoutes.login} replace={true}/>}/>
      </>}
      {auth && <>
        <Route path={AppRoutes.profile} element={<UserInfo/>}/>
        <Route path="*" element={<Navigate to={AppRoutes.profile} replace={true}/>}/>
      </>}
      <Route path={AppRoutes.login} element={<LoginPage1/>}/>
      <Route path={AppRoutes.signup} element={<SignupPage/>}/>
    </Routes>
    
    <SomeSettings>
      <button onClick={changeTheme}>Тема</button>
    </SomeSettings>
    
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
      theme={theme.current}
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



const SomeSettings = styled.div`
  position: fixed;
  bottom: 0; right: 0;
  padding: 6px;
  ${row};
  justify-content: end;
`
