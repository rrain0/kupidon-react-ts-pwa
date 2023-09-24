import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { RouteBuilder } from 'src/utils-react/route-builder/RouteBuilder'
import SignupPage from './SignupPage'
import RootRoute = AppRoutes.RootRoute
import fullAnySearchParams = RouteBuilder.fullAnySearchParams


function SignupRouting(){
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path=''
      element={<SignupPage/>}
    />
    <Route path='*'
      element={
        <Navigate
          to={RootRoute.signup[fullAnySearchParams](searchParams)}
          replace={true}
        />
      }
    />
  </Routes>
}
export default SignupRouting