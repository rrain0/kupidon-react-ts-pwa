import { Route, Routes } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomNavBar from 'src/components/BottomNavBar/BottomNavBar'
import RootRoutes = AppRoutes.RootRoutes


const BottomNavBarRouting = ()=>{
  
  return <Routes>
    {
      [
        RootRoutes.main.path,
        RootRoutes.profile.path
      ]
        .map(path=>path+'/*')
        .map(path=><Route path={path}
          element={<BottomNavBar/>}
        />)
    }
  </Routes>
}
export default BottomNavBarRouting