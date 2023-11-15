import React from 'react'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import AccountSettingsPage from 'src/pages/AccountSettings/AccountSettingsPage'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import Mem = ReactUtils.Mem
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams




const SettingsAccountRouting = ()=>{
  //console.log('settings / account / <check here>')
  const [searchParams] = useSearchParams()
  const auth = useRecoilValue(AuthRecoil)
  
  return <Routes>
    <Route path=''
      element={
        auth
        ? <AccountSettingsPage/>
        : <Navigate
          to={RootRoute.login[fullAllowedNameParams]({
            returnPath: RootRoute.settings.account[fullAnySearchParams](searchParams)}
          )}
        replace={true}
        />
      }
    />
    <Route path='*'
      element={<Navigate to={RootRoute.settings.account[fullAnySearchParams](searchParams)}
        replace={true}
      />}
    />
  </Routes>
}
export default Mem(SettingsAccountRouting)