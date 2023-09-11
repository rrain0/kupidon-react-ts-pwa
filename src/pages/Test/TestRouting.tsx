import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import RootRoutes = AppRoutes.RootRoutes
import TestPage from './TestPage'
import ScrollbarTestPage from './ScrollbarTestPage'
import ResizeObserverTestPage from './ResizeObserverTestPage';
import BottomSheetTestPage from './BottomSheetTestPage';



function TestRouting(){
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path=''
      element={<TestPage/>}
    />
    <Route path={RootRoutes.test.scrollbar.path}
      element={<ScrollbarTestPage/>}
    />
    <Route path={RootRoutes.test.resizeObserver.path}
      element={<ResizeObserverTestPage/>}
    />
    <Route path={RootRoutes.test.bottomSheet.path}
      element={<BottomSheetTestPage/>}
    />
    <Route path='*'
      element={<Navigate to={RootRoutes.test.fullPath3({
          urlSearchParams: searchParams
        })}
        replace={true}
      />}
    />
  </Routes>
}
export default TestRouting

