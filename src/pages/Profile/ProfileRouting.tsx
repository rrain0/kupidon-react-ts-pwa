import React from 'react'
import { Link, Navigate, Route, Routes, useMatch, useSearchParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import Mem = ReactUtils.Mem
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import use = RouteBuilder.use
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import ProfilePage from './ProfilePage'
import full = RouteBuilder.full



function ProfileRouting(){
  //console.log('profile / <check here>')
  const [searchParams] = useSearchParams()
  
  return <Routes>
    
    <Route path={RootRoute.profile.id[path]+'/*'}
      element={<ProfileIdRouting/>}
    />
    
    <Route path="*"
      element={
        <Navigate
          to={RootRoute.profile.id[fullAnySearchParams](searchParams)}
          replace={true}
        />
      }
    />
  
  </Routes>
}
export default Mem(ProfileRouting)



const ProfileIdRouting = Mem(()=>{
  //console.log('profile / id / <check here>')
  const [searchParams] = useSearchParams()
  const auth = useRecoilValue(AuthRecoil)
  const authId = auth?.user.id
  
  return <Routes>
    
    <Route path=''
      element={
        authId
        ? <Navigate
            to={RootRoute.profile.id.userId[use](authId)[fullAnySearchParams](searchParams)}
            replace={true}
          />
        : <Navigate
            to={RootRoute.login[fullAllowedNameParams]({
              returnPath: RootRoute.profile[fullAnySearchParams](searchParams)
            })}
            replace={true}
          />
      }
    />
    
    <Route path={RootRoute.profile.id.userId[path]+'/*'}
      element={<ProfileIdUserIdRouting/>}
    />
    
  </Routes>
})



const ProfileIdUserIdRouting = Mem(()=>{
  //console.log('profile / id / userId / <check here>')
  const [searchParams] = useSearchParams()
  const auth = useRecoilValue(AuthRecoil)
  const authId = auth?.user.id
  const urlUserId = useMatch(RootRoute.profile.id.userId[full]()+'/*')
    ?.params[RootRoute.profile.id.userId[path].slice(1)]!
  
  
  
  return <Routes>
    
    <Route path=''
      element={
        authId===urlUserId
          ? <ProfilePage/>
          : <div>
              <div>Просмотр чужого профиля пока что не реализован.</div>
              <Link to={RootRoute.login[fullAllowedNameParams]({
                returnPath: RootRoute.profile[fullAnySearchParams](searchParams)
              })}>
                <button>Войти</button>
              </Link>
            </div>
      }
    />
    
    <Route path='*'
      element={
        <Navigate
          to={RootRoute.profile.id.userId[use](urlUserId)[fullAnySearchParams](searchParams)}
          replace={true}
        />
      }
    />
    
  </Routes>
})
