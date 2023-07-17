/** @jsxImportSource @emotion/react */
import { EmotionCommon } from 'src/styles/EmotionCommon';
import center = EmotionCommon.center;
import styled from '@emotion/styled';
import { useRecoilState, useResetRecoilState } from 'recoil';
import col = EmotionCommon.col;
import { css } from '@emotion/react';
import { authState } from 'src/recoil/AuthState';
import { UserApi } from 'src/api/requests/UserApi';




function UserInfo(){
  
  const [auth,setAuth] = useRecoilState(authState)
  const resetAuth = useResetRecoilState(authState)
  
  
  const logout = async () => {
    resetAuth()
  }
  const update = async () => {
    try {
      const resp = await UserApi.current()
      setAuth(curr=>({ ...curr!, user: resp.data.user }))
    } catch (e) {
      console.warn(e)
    }
  }
  
  return <Page>
    <div css={col}>
      <InfoItem>id: {auth!.user.id}</InfoItem>
      <InfoItem>email: {auth!.user.email}</InfoItem>
      <InfoItem>email верифицирован: {auth!.user.emailVerified+''}</InfoItem>
      <InfoItem>создан: {new Date(auth!.user.created)+''}</InfoItem>
      <InfoItem>обновлён: {new Date(auth!.user.updated)+''}</InfoItem>
      <InfoItem>Имя: {auth!.user.firstName}</InfoItem>
      <InfoItem>Фамилия: {auth!.user.lastName}</InfoItem>
      <InfoItem>Дата рождения: {auth!.user.birthDate}</InfoItem>
      <InfoItem>Пол: {auth!.user.sex==='MALE' ? 'М' : 'Ж'}</InfoItem>
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
    </div>
  </Page>
}

export default UserInfo



const Page = styled.main`
  width: 100%;
  min-height: 100vh;
  ${center};
  padding: 32px;
  background-color: #282c34;
`

const InfoItem = styled.div`
  font: 500 10px/129% Roboto;
  color: white;
`