import React, { Suspense } from 'react'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import fullAnySearchParams = RouteBuilder.fullAnySearchParams
const TestPage = React.lazy(()=>import('./TestPage'))
const ScrollbarTestPage = React.lazy(()=>import('./ScrollbarTestPage'))
const ResizeObserverTestPage = React.lazy(()=>import('./ResizeObserverTestPage'))
const BottomSheetTestPage = React.lazy(()=>import('./BottomSheetTestPage'))
const MoveElementToAnotherView = React.lazy(()=>import(
  'src/pages/Test/MoveElementToAnotherView'
))



function TestRouting(){
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path=''
      element={<Suspense><TestPage/></Suspense>}
    />
    <Route path={RootRoute.test.scrollbar[path]}
      element={<Suspense><ScrollbarTestPage/></Suspense>}
    />
    <Route path={RootRoute.test.resizeObserver[path]}
      element={<Suspense><ResizeObserverTestPage/></Suspense>}
    />
    <Route path={RootRoute.test.bottomSheet[path]}
      element={<Suspense><BottomSheetTestPage/></Suspense>}
    />
    <Route path={RootRoute.test.moveElementToAnotherView[path]}
      element={<Suspense><MoveElementToAnotherView/></Suspense>}
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

