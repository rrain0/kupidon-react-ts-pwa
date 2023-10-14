import React, { Suspense } from 'react'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import RootRoute = AppRoutes.RootRoute
const LoginPage = React.lazy(()=>import('./LoginPage'))



function LoginRouting(){
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path=''
      element={<Suspense><LoginPage/></Suspense>}
    />
    <Route path='*'
      element={
        <Navigate
          to={RootRoute.login[fullAnySearchParams](searchParams)}
          replace={true}
        />
      }
    />
  </Routes>
}
export default LoginRouting