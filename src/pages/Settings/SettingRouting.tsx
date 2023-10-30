import React from 'react'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import AccountSettingsPage from 'src/pages/AccountSettings/AccountSettingsPage'
import ApplicationSettingsPage from 'src/pages/ApplicationSettings/ApplicationSettingsPage'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import Mem = ReactUtils.Mem
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAnySearchParams = RouteBuilder.fullAnySearchParams



function SettingRouting(){
  //console.log('settings / <check here>')
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path={RootRoute.settings.account[path]+'/*'}
      element={<SettingsAccountRouting/>}
    />
    <Route path={RootRoute.settings.app[path]+'/*'}
      element={<SettingsApplicationRouting/>}
    />
    
    <Route path='*'
      element={
        <Navigate
          to={RootRoute.settings.account[fullAnySearchParams](searchParams)}
          replace={true}
        />
      }
    />
  
  </Routes>
}
export default Mem(SettingRouting)



const SettingsAccountRouting = Mem(()=>{
  //console.log('settings / account / <check here>')
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path=''
      element={<AccountSettingsPage/>}
    />
    <Route path='*'
      element={<Navigate to={RootRoute.settings.account[fullAnySearchParams](searchParams)}
        replace={true}
      />}
    />
  </Routes>
})

const SettingsApplicationRouting = Mem(()=>{
  //console.log('settings / app / <check here>')
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path=''
      element={<ApplicationSettingsPage/>}
    />
    <Route path='*'
      element={<Navigate to={RootRoute.settings.app[fullAnySearchParams](searchParams)}
        replace={true}
      />}
    />
  </Routes>
})

