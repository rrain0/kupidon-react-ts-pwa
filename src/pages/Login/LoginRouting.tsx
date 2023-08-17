import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import RootRoutes = AppRoutes.RootRoutes
import LoginPage from './LoginPage'


function LoginRouting(){
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path=''
      element={<LoginPage/>}
    />
    <Route path='*'
      element={<Navigate to={RootRoutes.login.fullPath3({
          urlSearchParams: searchParams
        })}
        replace={true}
      />}
    />
  </Routes>
}
export default LoginRouting