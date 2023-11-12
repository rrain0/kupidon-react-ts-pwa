import React from 'react'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import AccountSettingsPage from 'src/pages/AccountSettings/AccountSettingsPage'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import TestPage from './TestPage'
import ScrollbarTestPage from './ScrollbarTestPage'
import ResizeObserverTestPage from './ResizeObserverTestPage'
import BottomSheetTestPage from './BottomSheetTestPage'
import MoveElementToAnotherView from 'src/pages/Test/MoveElementToAnotherView'
import Mem = ReactUtils.Mem




function TestRouting(){
  //console.log('test / <check here>')
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path=''
      element={<TestPage/>}
    />
    <Route path={RootRoute.test.scrollbar[path]+'/*'}
      element={<ScrollbarTestPageRouting/>}
    />
    <Route path={RootRoute.test.resizeObserver[path]+'/*'}
      element={<ResizeObserverTestPageRouting/>}
    />
    <Route path={RootRoute.test.bottomSheet[path]+'/*'}
      element={<BottomSheetTestPageRouting/>}
    />
    <Route path={RootRoute.test.moveElementToAnotherView[path]+'/*'}
      element={<MoveElementToAnotherViewRouting/>}
    />
    
    <Route path='*'
      element={
        <Navigate
          to={RootRoute.test[fullAnySearchParams](searchParams)}
          replace={true}
        />
      }
    />
  </Routes>
}
export default TestRouting



const ScrollbarTestPageRouting = Mem(()=>{
  //console.log('test / scrollbar / <check here>')
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path=''
      element={<ScrollbarTestPage/>}
    />
    <Route path='*'
      element={<Navigate to={RootRoute.test.scrollbar[fullAnySearchParams](searchParams)}
        replace={true}
      />}
    />
  </Routes>
})


const ResizeObserverTestPageRouting = Mem(()=>{
  //console.log('test / resizeObserver / <check here>')
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path=''
      element={<ResizeObserverTestPage/>}
    />
    <Route path='*'
      element={<Navigate to={RootRoute.test.resizeObserver[fullAnySearchParams](searchParams)}
        replace={true}
      />}
    />
  </Routes>
})


const BottomSheetTestPageRouting = Mem(()=>{
  //console.log('test / bottomSheet / <check here>')
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path=''
      element={<BottomSheetTestPage/>}
    />
    <Route path='*'
      element={<Navigate to={RootRoute.test.bottomSheet[fullAnySearchParams](searchParams)}
        replace={true}
      />}
    />
  </Routes>
})


const MoveElementToAnotherViewRouting = Mem(()=>{
  //console.log('test / moveElementToAnotherView / <check here>')
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path=''
      element={<MoveElementToAnotherView/>}
    />
    <Route path='*'
      element={<Navigate to={RootRoute.test.moveElementToAnotherView[fullAnySearchParams](searchParams)}
        replace={true}
      />}
    />
  </Routes>
})

