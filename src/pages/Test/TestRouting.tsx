import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import RootRoutes = AppRoutes.RootRoutes
import TestPage from './TestPage'



function TestRouting(){
  const [searchParams] = useSearchParams()
  
  return <Routes>
    <Route path=''
      element={<TestPage/>}
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