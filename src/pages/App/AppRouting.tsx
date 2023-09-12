import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import MainRouting from 'src/pages/Main/MainRouting'
import LoginRouting from 'src/pages/Login/LoginRouting'
import SignupPage from 'src/pages/Signup/SignupPage'
import ProfileRouting from 'src/pages/Profile/ProfileRouting'
import React from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import RootRoutes = AppRoutes.RootRoutes
import TestRouting from 'src/pages/Test/TestRouting'
import { ReactUtils } from '../../utils/ReactUtils';
import ReactMemoTyped = ReactUtils.ReactMemoTyped;



function AppRouting(){
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path={RootRoutes.test.path+'/*'}
      element={<TestRouting/>}
    />
    <Route path={RootRoutes.main.path+'/*'}
      element={<MainRouting/>}
    />
    <Route path={RootRoutes.login.path+'/*'}
      element={<LoginRouting/>}
    />
    <Route path={RootRoutes.signup.path+'/*'}
      element={<SignupPage/>}
    />
    <Route path={RootRoutes.profile.path+'/*'}
      element={<ProfileRouting/>}
    />
    <Route path="*"
      element={<Navigate to={RootRoutes.main.fullPath3({
        urlSearchParams: searchParams
      })}
        replace={true}
      />}
    />
  </Routes>
}
export default ReactMemoTyped(AppRouting)