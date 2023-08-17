/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import { Link } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import RootRoutes = AppRoutes.RootRoutes


function MainPage(){
  
  return <div css={css`${col};`}>
    <Link to={RootRoutes.profile.fullPath()}>
      <button>Профиль</button>
    </Link>
    <div>Какая-то главная страница.</div>
    <div>Здесь будут карточки людей.</div>
  </div>
}
export default MainPage