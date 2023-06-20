import { useRecoilValue } from 'recoil';
import { authState } from 'src/recoil/AuthState';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutes } from 'src/app-routes/AppRoutes';
import LoginPage from '../Login/LoginPage';
import UserInfo from '../UserInfo/UserInfo';
import SignupPage from '../Signup/SignupPage';


function App() {
  const auth = useRecoilValue(authState)
  
  return <Routes>
    {!auth && <>
      <Route path='*' element={<Navigate to={AppRoutes.login} replace={true}/>}/>
    </> }
    {auth && <>
      <Route path='landing' element={<UserInfo/>}/>
      <Route path='*' element={<Navigate to='landing' replace={true} />}/>
    </> }
    <Route path={AppRoutes.login} element={<LoginPage/>} />
    <Route path='signup' element={<SignupPage/>}/>
  </Routes>
}

export default App