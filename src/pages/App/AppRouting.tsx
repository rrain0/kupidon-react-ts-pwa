/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import BottomNavBarRouting from 'src/components/BottomNavBar/BottomNavBarRouting'
import MainRouting from 'src/pages/Main/MainRouting'
import LoginRouting from 'src/pages/Login/LoginRouting'
import SignupPage from 'src/pages/Signup/SignupPage'
import ProfileRouting from 'src/pages/Profile/ProfileRouting'
import React from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import TestRouting from 'src/pages/Test/TestRouting'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAnySearchParams = RouteBuilder.fullAnySearchParams



function AppRouting(){
  
  return <>
    <PageRouting/>
    <BottomNavBarRouting/>
  </>
}
export default ReactMemoTyped(AppRouting)




function PageRouting(){
  const [searchParams] = useSearchParams()
  
  
  return <Routes>
    
    <Route path={RootRoute.test[path]+'/*'}
      element={<TestRouting/>}
    />
    <Route path={RootRoute.main[path]+'/*'}
      element={<MainRouting/>}
    />
    <Route path={RootRoute.login[path]+'/*'}
      element={<LoginRouting/>}
    />
    <Route path={RootRoute.signup[path]+'/*'}
      element={<SignupPage/>}
    />
    <Route path={RootRoute.profile[path]+'/*'}
      element={<ProfileRouting/>}
    />
    
    <Route path="*"
      element={
        <Navigate
          to={RootRoute.main[fullAnySearchParams](searchParams)}
          replace={true}
        />
      }
    />
    
  </Routes>
}