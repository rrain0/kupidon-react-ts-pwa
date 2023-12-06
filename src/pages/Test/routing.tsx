import { RouteObject } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { clearUnknownPathEnding } from 'src/app-routes/ReactRouterDomUtils'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import RootRoute = AppRoutes.RootRoute
import path = RouteBuilder.path
import TestPage from './TestPage'
import ScrollbarTestPage from './ScrollbarTestPage'
import ResizeObserverTestPage from './ResizeObserverTestPage'
import BottomSheetTestPage from './BottomSheetTestPage'
import MoveElementToAnotherView from 'src/pages/Test/MoveElementToAnotherView'



// path: 'test / scrollbar / <check here>'
const scrollbarTestPageRouting: RouteObject[] = [
  {
    path: '',
    Component: ScrollbarTestPage,
  },
  clearUnknownPathEnding,
]
// path: 'test / resizeObserver / <check here>'
const resizeObserverTestPageRouting: RouteObject[] = [
  {
    path: '',
    Component: ResizeObserverTestPage,
  },
  clearUnknownPathEnding,
]
// path: 'test / bottomSheet / <check here>'
const bottomSheetTestPageRouting: RouteObject[] = [
  {
    path: '',
    Component: BottomSheetTestPage,
  },
  clearUnknownPathEnding,
]
// path: 'test / moveElementToAnotherView / <check here>'
const moveElementToAnotherViewRouting: RouteObject[] = [
  {
    path: '',
    Component: MoveElementToAnotherView,
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
    children: scrollbarTestPageRouting,
  },
  {
    path: RootRoute.test.resizeObserver[path]+'/*',
    children: resizeObserverTestPageRouting,
  },
  {
    path: RootRoute.test.bottomSheet[path]+'/*',
    children: bottomSheetTestPageRouting,
  },
  {
    path: RootRoute.test.moveElementToAnotherView[path]+'/*',
    children: moveElementToAnotherViewRouting,
  },
  clearUnknownPathEnding,
]




