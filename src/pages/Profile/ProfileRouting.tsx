import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import React from 'react'
import { RouteBuilder } from 'src/utils-react/route-builder/RouteBuilder'
import ProfilePage from './ProfilePage'
import { ReactUtils } from 'src/utils/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import use = RouteBuilder.use
import fullAnySearchParams = RouteBuilder.fullAnySearchParams



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
  //console.log('RootRoutes.profile',RootRoutes.profile)
  //console.log('RootRoutes.profile.id.userId.fullPath()',RootRoutes.profile.id.userId.fullPath())
  //console.log('RootRoutes.profile.id.userId.path',RootRoutes.profile.id.userId.path)
  //console.log('RootRoutes.profile.id.userId.path.slice(1)',RootRoutes.profile.id.userId.path.slice(1))
  
  /*const urlId = useMatch(
    RootRoutes.profile.id.userId.fullPath()
  )?.params[RootRoutes.profile.id.userId.path.slice(1)]*/
  
  const [searchParams] = useSearchParams()
  //console.log('searchParams instanceof URLSearchParams:', searchParams instanceof URLSearchParams)
  
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