import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { RouteBuilder } from 'src/utils-react/route-builder/RouteBuilder'
import MainPage from './MainPage'
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import fullAnySearchParams = RouteBuilder.fullAnySearchParams


function MainRouting(){
  const auth = useRecoilValue(AuthRecoil)
  const [searchParams] = useSearchParams()
  
  return <Routes>
    { auth && <Route path=''
      element={<MainPage/>}
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