import React from 'react'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import ApplicationSettingsPage from 'src/pages/ApplicationSettings/ApplicationSettingsPage'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import Mem = ReactUtils.Mem
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import RootRoute = AppRoutes.RootRoute





const SettingsApplicationRouting = ()=>{
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
}
export default Mem(SettingsApplicationRouting)