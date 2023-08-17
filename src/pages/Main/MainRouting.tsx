import { useRecoilValue } from 'recoil'
import { authState } from 'src/recoil/state/AuthState'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import RootRoutes = AppRoutes.RootRoutes
import MainPage from './MainPage'


function MainRouting(){
  const auth = useRecoilValue(authState)
  const [searchParams] = useSearchParams()
  
  return <Routes>
    { auth && <Route path=''
      element={<MainPage/>}
    /> }
    { !auth && <Route path=''
      element={<Navigate
        to={RootRoutes.login.fullPath3({ nameParams: {
          returnPath: RootRoutes.main.fullPath3({ urlSearchParams: searchParams })}
        })}
        replace={true}
      />}
    /> }
    <Route path='*'
      element={<Navigate to={RootRoutes.main.fullPath3({
        urlSearchParams: searchParams
      })}
        replace={true}
      />}
    />
  </Routes>
}
export default MainRouting