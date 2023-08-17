import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import RootRoutes = AppRoutes.RootRoutes
import SignupPage from './SignupPage'


function SignupRouting(){
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path=''
      element={<SignupPage/>}
    />
    <Route path='*'
      element={<Navigate to={RootRoutes.signup.fullPath3({
          urlSearchParams: searchParams
        })}
        replace={true}
      />}
    />
  </Routes>
}
export default SignupRouting