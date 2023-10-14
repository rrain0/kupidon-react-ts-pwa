import React from 'react'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
import TestPage from './TestPage'
import ScrollbarTestPage from './ScrollbarTestPage'
import ResizeObserverTestPage from './ResizeObserverTestPage'
import BottomSheetTestPage from './BottomSheetTestPage'
import MoveElementToAnotherView from 'src/pages/Test/MoveElementToAnotherView'




function TestRouting(){
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path=''
      element={<TestPage/>}
    />
    <Route path={RootRoute.test.scrollbar[path]}
      element={<ScrollbarTestPage/>}
    />
    <Route path={RootRoute.test.resizeObserver[path]}
      element={<ResizeObserverTestPage/>}
    />
    <Route path={RootRoute.test.bottomSheet[path]}
      element={<BottomSheetTestPage/>}
    />
    <Route path={RootRoute.test.moveElementToAnotherView[path]}
      element={<MoveElementToAnotherView/>}
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

