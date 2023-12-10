import { RouteObject } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { clearUnknownPathEnding } from 'src/app-routes/ReactRouterDomUtils'
import PointerTest from 'src/pages/Test/PointerTest'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import TestPage from './TestPage'
import ScrollbarTestPage from './ScrollbarTestPage'
import ResizeObserverTestPage from './ResizeObserverTestPage'
import BottomSheetTestPage from './BottomSheetTestPage'
import MoveElementToAnotherView from 'src/pages/Test/MoveElementToAnotherView'



// path: 'test / scrollbar / <check here>'
const testScrollbarTestPageRouting: RouteObject[] = [
  {
    path: '',
    Component: ScrollbarTestPage,
  },
  clearUnknownPathEnding,
]
// path: 'test / resizeObserver / <check here>'
const testResizeObserverTestPageRouting: RouteObject[] = [
  {
    path: '',
    Component: ResizeObserverTestPage,
  },
  clearUnknownPathEnding,
]
// path: 'test / bottomSheet / <check here>'
const testBottomSheetTestPageRouting: RouteObject[] = [
  {
    path: '',
    Component: BottomSheetTestPage,
  },
  clearUnknownPathEnding,
]
// path: 'test / moveElementToAnotherView / <check here>'
const testMoveElementToAnotherViewRouting: RouteObject[] = [
  {
    path: '',
    Component: MoveElementToAnotherView,
  },
  clearUnknownPathEnding,
]
// path: 'test / pointer / <check here>'
const testPointerRouting: RouteObject[] = [
  {
    path: '',
    Component: PointerTest,
  },
  clearUnknownPathEnding,
]



// path: 'test / <check here>'
export const testRouting: RouteObject[] = [
  {
    path: '',
    Component: TestPage,
  },
  {
    path: RootRoute.test.scrollbar[path]+'/*',
    children: testScrollbarTestPageRouting,
  },
  {
    path: RootRoute.test.resizeObserver[path]+'/*',
    children: testResizeObserverTestPageRouting,
  },
  {
    path: RootRoute.test.bottomSheet[path]+'/*',
    children: testBottomSheetTestPageRouting,
  },
  {
    path: RootRoute.test.moveElementToAnotherView[path]+'/*',
    children: testMoveElementToAnotherViewRouting,
  },
  {
    path: RootRoute.test.pointer[path]+'/*',
    children: testPointerRouting,
  },
  clearUnknownPathEnding,
]




