/** @jsxImportSource @emotion/react */
import { EmotionCommon } from 'src/styles/EmotionCommon'
import center = EmotionCommon.center
import styled from '@emotion/styled'
import { useRecoilState, useResetRecoilState } from 'recoil'
import col = EmotionCommon.col
import { css } from '@emotion/react'
import { authState } from 'src/recoil/state/AuthState'
import { UserApi } from 'src/api/requests/UserApi'
import { Navigate, useMatch, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import RootRoutes = AppRoutes.RootRoutes
import { Theme } from 'src/theme/Theme'
import React, { useState } from 'react'
import rowWrap = EmotionCommon.rowWrap
import { ProfileMockData } from './MockData'
import BottomSheet from 'src/components/BottomSheet/BottomSheet'




// todo должен показывать инфу в зависимости от id в url
function ProfilePage(){
  const [searchParams] = useSearchParams()
  
  const [auth,setAuth] = useRecoilState(authState)
  const resetAuth = useResetRecoilState(authState)
  
  // @ts-ignore
  const urlUserId = useMatch(RootRoutes.profile.id.userId.fullPath())
    .params[RootRoutes.profile.id.userId.path.slice(1)]
  
  const logout = async() => {
    resetAuth()
  }
  const update = async() => {
    try {
      const resp = await UserApi.current()
      setAuth(curr=>({ ...curr!, user: resp.data.user }))
    } catch (e) {
      console.warn(e)
    }
  }
  
  
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    
    
  }
  
  
  
  const [images, setImages] = useState(ProfileMockData.userImages)
  
  
  
  if (!auth || auth.user.id!==urlUserId) return <Navigate to={
    RootRoutes.login.fullPath({
      returnPath: RootRoutes.profile.fullPath3({ urlSearchParams: searchParams })
    })
  }/>
  
  return <Page>
    <Form onSubmit={onSubmit}>
    
      <h3 css={formHeader}>Профиль</h3>
      
      <div css={css`
        ${rowWrap};
        gap: 6px;
      `}>
        { images.map(im=><div
          
          draggable
          onDragStart={ev=>{
            ev.dataTransfer.setData('text/plain',im)
          }}
          
          onDragOver={ev=>{
            ev.preventDefault()
            ev.dataTransfer.dropEffect = 'move'
          }}
          onDrop={ev=>{
            ev.preventDefault()
            const data = ev.dataTransfer.getData('text/plain')
            const thisImIdx = images.findIndex(val=>val===im)
            const droppedImIdx = images.findIndex(val=>val===data)
            const newImages = [...images]
            newImages[thisImIdx] = data
            newImages[droppedImIdx] = im
            setImages(newImages)
          }}
          
          key={im}
          css={css`
            width: 100px; height: 100px;
            ${center};
            border-radius: 6px;
            overflow: hidden;
          `}
        >
          <img
            src={im}
            css={css`
              width: 100%; height: 100%;
              object-position: center;
              object-fit: cover;
            `}
          />
        </div>
        ) }
      </div>
      
      <InfoItem>id: {auth.user.id}</InfoItem>
      <InfoItem>email: {auth.user.email}</InfoItem>
      <InfoItem>email верифицирован: {auth.user.emailVerified+''}</InfoItem>
      <InfoItem>создан: {new Date(auth.user.created)+''}</InfoItem>
      <InfoItem>обновлён: {new Date(auth.user.updated)+''}</InfoItem>
      <InfoItem>Имя: {auth.user.firstName}</InfoItem>
      <InfoItem>Фамилия: {auth.user.lastName}</InfoItem>
      <InfoItem>Дата рождения: {auth.user.birthDate}</InfoItem>
      <InfoItem>Пол: {auth.user.sex==='MALE' ? 'М' : 'Ж'}</InfoItem>
      <button
        onClick={update}
        css={css`
          width: 100%;
          height: 40px;
          font: 500 10px/129% Roboto;
          color: white;
        `}
      >
        Обновить
      </button>
      <button
        onClick={logout}
        css={css`
          width: 100%;
          height: 40px;
          font: 500 10px/129% Roboto;
          color: white;
        `}
      >
        Выйти
      </button>
    </Form>
    
    <BottomSheet/>
    
  </Page>
}

export default ProfilePage





const Page = styled.main`
  min-width: 100%;
  min-height: 100%;
  ${center};
  padding: 32px;
  background: linear-gradient(
          to bottom right,
          ${p=>p.theme.page.bgc[0]} 0%,
          ${p=>p.theme.page.bgc[1]} 40% 60%,
          ${p=>p.theme.page.bgc[0]} 100%
  );
`

const Form = styled.form`
  max-width: 500px;
  width: 100%;
  ${col};
  gap: 16px;
`

const formHeader = (theme: Theme.Theme) => css`
  font: 500 28px/150% Roboto;
  letter-spacing: 0.05em;
  color: ${theme.page.text[0]};
  align-self: center;
`


const InfoItem = styled.div`
  font: 500 10px/129% Roboto;
  color: white;
`


