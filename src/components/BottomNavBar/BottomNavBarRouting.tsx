import { Route, Routes } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomNavBar from 'src/components/BottomNavBar/BottomNavBar'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute



const BottomNavBarRouting = ()=>{
  
  return <Routes>
    {
      [
        RootRoute.main[full](),
        RootRoute.profile[full](),
      ]
        .map(path=>path+'/*')
        .map(path=><Route
          key={path}
          path={path}
          element={<BottomNavBar/>}
        />)
    }
  </Routes>
}
export default BottomNavBarRouting