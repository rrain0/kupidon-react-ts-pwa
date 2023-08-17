import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import MainRouting from '../Main/MainRouting'
import LoginRouting from '../Login/LoginRouting'
import SignupPage from '../Signup/SignupPage'
import ProfileRouting from '../Profile/ProfileRouting'
import React from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import RootRoutes = AppRoutes.RootRoutes


function AppRouting(){
  const [searchParams] = useSearchParams()
  
  return <Routes>
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
export default AppRouting