/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import RootRoutes = AppRoutes.RootRoutes
import ScrollbarOverlay from 'src/components/ScrollbarOverlay/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/ScrollbarOverlay/ScrollbarOverlayStyle'
import { SimplePage } from 'src/components/Page/SimplePage'
import PageContent = SimplePage.PageContent
import Page = SimplePage.Page



function MainPage(){
  
  return <Page>
    <ScrollbarOverlay css={ScrollbarOverlayStyle.page}>
      <PageContent>
        
        <Link to={RootRoutes.profile.fullPath()}>
          <button>Профиль</button>
        </Link>
        <Link to={RootRoutes.test.fullPath()}>
          <button>Test Page</button>
        </Link>
        <div>Какая-то главная страница.</div>
        <div>Здесь будут карточки людей.</div>
      
      </PageContent>
    </ScrollbarOverlay>
  </Page>
}
export default MainPage

