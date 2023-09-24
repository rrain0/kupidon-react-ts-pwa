/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import ScrollbarOverlay from 'src/components/ScrollbarOverlay/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/ScrollbarOverlay/ScrollbarOverlayStyle'
import { SimplePage } from 'src/components/Page/SimplePage'
import { RouteBuilder } from 'src/utils-react/route-builder/RouteBuilder'
import PageContent = SimplePage.PageContent
import Page = SimplePage.Page
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full



function MainPage(){
  
  
  
  return <Page>
    <ScrollbarOverlay css={ScrollbarOverlayStyle.page}>
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
    </ScrollbarOverlay>
  </Page>
}
export default MainPage

