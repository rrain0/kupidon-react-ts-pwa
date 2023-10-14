import React from 'react'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import use = RouteBuilder.use
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import ProfilePage from './ProfilePage'



function ProfileRouting(){
  //console.log('profile')
  
  return <ProfileIdRouting/>
}
export default ReactMemoTyped(ProfileRouting)



const ProfileIdRouting = ReactMemoTyped(()=>{
  //console.log('profile id')
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path={RootRoute.profile.id[path]+'/*'}
      element={<ProfileIdUserIdRouting/>}
    />
    <Route path='*'
      element={<Navigate to={RootRoute.profile.id[fullAnySearchParams](searchParams)}
        replace={true}
      />}
    />
  </Routes>
})



const ProfileIdUserIdRouting = ReactMemoTyped(()=>{
  //console.log('profile id userId')
  
  
  const [searchParams] = useSearchParams()
  
  
  const auth = useRecoilValue(AuthRecoil)
  const authId = auth?.user.id
  
  
  
  return <Routes>
    <Route path={RootRoute.profile.id.userId[path]+'/*'}
      element={<ProfilePage/>}
    />
    { authId && <Route path=''
      element={
        <Navigate
          to={RootRoute.profile.id.userId[use](authId)[fullAnySearchParams](searchParams)}
          replace={true}
        />
      }
    /> }
    { !authId && <Route path=''
      element={
        <Navigate
          to={RootRoute.login[fullAllowedNameParams]({
            returnPath: RootRoute.profile[fullAnySearchParams](searchParams)
          })}
          replace={true}
        />
      }
    /> }
  </Routes>
})
