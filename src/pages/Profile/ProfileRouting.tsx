import { Navigate, Route, Routes, useMatch } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { authState } from 'src/recoil/state/AuthState'
import React from 'react'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import RootRoutes = AppRoutes.RootRoutes
import ProfilePage from './ProfilePage'



function ProfileRouting(){
  console.log('profile')
  
  return <ProfileIdRouting/>
}
export default ProfileRouting



function ProfileIdRouting(){
  console.log('profile id')
  
  return <Routes>
    <Route path={RootRoutes.profile.id.path+'/*'}
      element={<ProfileIdUserIdRouting/>}
    />
    <Route path='*'
      element={<Navigate to={RootRoutes.profile.id.fullPath()}
        replace={true}
      />}
    />
  </Routes>
}



function ProfileIdUserIdRouting(){
  console.log('profile id userId')
  //console.log('RootRoutes.profile',RootRoutes.profile)
  //console.log('RootRoutes.profile.id.userId.fullPath()',RootRoutes.profile.id.userId.fullPath())
  //console.log('RootRoutes.profile.id.userId.path',RootRoutes.profile.id.userId.path)
  //console.log('RootRoutes.profile.id.userId.path.slice(1)',RootRoutes.profile.id.userId.path.slice(1))
  
  /*const urlId = useMatch(
    RootRoutes.profile.id.userId.fullPath()
  )?.params[RootRoutes.profile.id.userId.path.slice(1)]*/
  
  const auth = useRecoilValue(authState)
  const authId = auth?.user.id
  
  return <Routes>
    <Route path={RootRoutes.profile.id.userId.path+'/*'}
      element={<ProfilePage/>}
    />
    { authId && <Route path=''
      element={<Navigate to={RootRoutes.profile.id.userIdWith(authId).fullPath()}
        replace={true}
      />}
    /> }
    { !authId && <Route path=''
      element={<Navigate to={RootRoutes.login.fullPath({ returnPath: RootRoutes.profile.fullPath() })}
        replace={true}
      />}
    /> }
  </Routes>
}