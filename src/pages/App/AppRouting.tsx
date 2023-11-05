/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import BottomNavBarRouting from 'src/components/BottomNavBar/routing'
import FindPairsRouting from 'src/pages/FindPairs/FindPairsRouting'
import LoginRouting from 'src/pages/Login/routing'
import ProfileRouting from 'src/pages/Profile/routing'
import React from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import SettingRouting from 'src/pages/Settings/SettingRouting'
import SignupRouting from 'src/pages/Signup/routing'
import TestRouting from 'src/pages/Test/TestRouting'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import ReactMemoTyped = ReactUtils.Mem
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




const PageRouting = ReactMemoTyped(()=>{
  const [searchParams] = useSearchParams()
  
  
  return <Routes>
    
    <Route path={RootRoute.login[path]+'/*'}
      element={<LoginRouting/>}
    />
    <Route path={RootRoute.signup[path]+'/*'}
      element={<SignupRouting/>}
    />
    
    
    <Route path={RootRoute.profile[path]+'/*'}
      element={<ProfileRouting/>}
    />
    {/* There will be Chat Routing */}
    <Route path={RootRoute.findPairs[path]+'/*'}
      element={<FindPairsRouting/>}
    />
    {/* There will be Advices Routing */}
    <Route path={RootRoute.test[path]+'/*'}
      element={<TestRouting/>}
    />
    <Route path={RootRoute.settings[path]+'/*'}
      element={<SettingRouting/>}
    />
    
    
    
    <Route path='*'
      element={
        <Navigate
          to={RootRoute.findPairs[fullAnySearchParams](searchParams)}
          replace={true}
        />
      }
    />
    
  </Routes>
})
