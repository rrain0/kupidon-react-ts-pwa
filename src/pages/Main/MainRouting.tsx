import React, { Suspense } from 'react'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
const MainPage = React.lazy(()=>import('./MainPage'))



function MainRouting(){
  const auth = useRecoilValue(AuthRecoil)
  const [searchParams] = useSearchParams()
  
  return <Routes>
    { auth && <Route path=''
      element={<Suspense><MainPage/></Suspense>}
    /> }
    { !auth && <Route path=''
      element={
        <Navigate
          to={RootRoute.login[fullAllowedNameParams]({
            returnPath: RootRoute.main[fullAnySearchParams](searchParams)}
          )}
          replace={true}
        />
      }
    /> }
    <Route path='*'
      element={
        <Navigate
          to={RootRoute.main[fullAnySearchParams](searchParams)}
          replace={true}
        />
      }
    />
  </Routes>
}
export default MainRouting