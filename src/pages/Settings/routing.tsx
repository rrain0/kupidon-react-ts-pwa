import React from 'react'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import SettingsAccountRouting from 'src/pages/AccountSettings/routing'
import SettingsApplicationRouting from 'src/pages/ApplicationSettings/routing'
import SettingsPwdChangeRouting from 'src/pages/PwdChange/routing'
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
    <Route path={RootRoute.settings.pwdChange[path]+'/*'}
      element={<SettingsPwdChangeRouting/>}
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

