/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomNavBar from 'src/components/BottomNavBar/BottomNavBar'
import OverflowWrapper from 'src/components/Scrollbars/OverflowWrapper'
import { OverflowWrapperStyle } from 'src/components/Scrollbars/OverflowWrapperStyle'
import { SimplePage } from 'src/components/Page/SimplePage'
import { RouteBuilder } from 'src/utils-react/route-builder/RouteBuilder'
import PageContent = SimplePage.PageContent
import Page = SimplePage.Page
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full



function MainPage(){
  
  
  
  return <>
    <Page>
      <OverflowWrapper css={OverflowWrapperStyle.page}>
        <PageContent>
          
          <Link to={RootRoute.profile[full]()}>
            <button>Профиль</button>
          </Link>
          <Link to={RootRoute.test[full]()}>
            <button>Test Page</button>
          </Link>
          <div>Какая-то главная страница.</div>
          <div>Здесь будут карточки людей.</div>
        
        </PageContent>
      </OverflowWrapper>
    </Page>
    
    
    
  </>
}
export default MainPage

