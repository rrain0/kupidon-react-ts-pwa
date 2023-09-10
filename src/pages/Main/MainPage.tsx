/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import { Link } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import RootRoutes = AppRoutes.RootRoutes
import styled from '@emotion/styled'



function MainPage(){
  
  return <Page>
    <Link to={RootRoutes.profile.fullPath()}>
      <button>Профиль</button>
    </Link>
    <Link to={RootRoutes.test.fullPath()}>
      <button>Test Page</button>
    </Link>
    <div>Какая-то главная страница.</div>
    <div>Здесь будут карточки людей.</div>
  </Page>
}
export default MainPage


const Page = styled.main`
  width: 100%;
  min-height: 100%; height: fit-content;
  padding: 20px;
  ${col};
  gap: 20px;
  place-content: start;
  background: ${p=>p.theme.page.bgc2};
  color: ${p=>p.theme.page.text[0]};
`