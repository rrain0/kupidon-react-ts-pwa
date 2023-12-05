/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
  createBrowserRouter,
  Navigate,
  Route, RouterProvider,
  Routes,
  useSearchParams,
} from 'react-router-dom'
import BottomNavBarRouting from 'src/components/BottomNavBar/routing'
import FindPairsRouting from 'src/pages/FindPairs/routing'
import LoginRouting from 'src/pages/Login/routing'
import ProfileRouting from 'src/pages/Profile/routing'
import React from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import SettingRouting from 'src/pages/Settings/routing'
import SignupRouting from 'src/pages/Signup/routing'
import TestRouting from 'src/pages/Test/routing'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAnySearchParams = RouteBuilder.fullAnySearchParams





const router = createBrowserRouter([
  { path: '*', Component: ()=><>
      <PageRouting/>
      <BottomNavBarRouting/>
    </>
  }
])



const AppRouting =
React.memo(
()=>{
  
  return <RouterProvider router={router} />
})
export default AppRouting




const PageRouting =
React.memo(
()=>{
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
    There will be Chat Routing
    <Route path={RootRoute.findPairs[path]+'/*'}
      element={<FindPairsRouting/>}
    />
    There will be Advices Routing
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
