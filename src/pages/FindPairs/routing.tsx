import React from 'react'
import { useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import FindPairsPage from 'src/pages/FindPairs/FindPairsPage'
import Mem = ReactUtils.Mem



function FindPairsRouting(){
  //console.log('findPairs / <check here>')
  const [searchParams] = useSearchParams()
  const auth = useRecoilValue(AuthRecoil)
  
  return <Routes>
    
    <Route path=''
      element={
        auth
          ? <FindPairsPage/>
          : <Navigate
              to={RootRoute.login[fullAllowedNameParams]({
                returnPath: RootRoute.findPairs[fullAnySearchParams](searchParams)}
              )}
              replace={true}
            />
      }
    />
    
    <Route path='*'
      element={
        <Navigate
          to={RootRoute.findPairs[fullAnySearchParams](searchParams)}
          replace={true}
        />
      }
    />
  
  </Routes>
}
export default Mem(FindPairsRouting)

