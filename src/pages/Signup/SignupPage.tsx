/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { EmotionCommon } from 'src/styles/EmotionCommon';
import center = EmotionCommon.center;
import { css } from '@emotion/react';
import col = EmotionCommon.col;
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { authState } from 'src/recoil/AuthState';
import { Link, Navigate } from 'react-router-dom';
import { UserApi } from 'src/api/requests/UserApi';


const SignupPage = () => {
  
  const setAuth = useSetRecoilState(authState)
  
  const [state,setState] = useState('none' as 'none'|'loading'|'success'|'error')
  const [error,setError] = useState(null as any)
  
  const [login,setLogin] = useState('')
  const [pwd,setPwd] = useState('')
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [sex,setSex] = useState('')
  const [birthDate,setBirthDate] = useState('')
  
  
  const trySignup = async ()=>{
    if (state==='loading') return
    setState('loading')
    try {
      const response = await UserApi.create({
        email: login, pwd, firstName, lastName, sex: sex as "MALE"|"FEMALE", birthDate
      })
      setAuth({
        accessToken: response.data.accessToken,
        user: response.data.user
      })
      setState('success')
    } catch (e){
      setState('error')
      setError((e as AxiosError).response?.data)
    }
  }
  
  
  return <Page>
    <div css={css`
      ${col};
      width: 100%;
    `}>
      <input value={login} onChange={ev=>setLogin(ev.target.value)} placeholder='логин (email)' css={css`
        width: 100%;
        height: 40px;
        font: 500 10px/129% Roboto;
        color: white;
      `}/>
      <input value={pwd} onChange={ev=>setPwd(ev.target.value)} placeholder='пароль' css={css`
        width: 100%;
        height: 40px;
        font: 500 10px/129% Roboto;
        color: white;
      `}/>
      <input value={firstName} onChange={ev=>setFirstName(ev.target.value)} placeholder='Имя' css={css`
        width: 100%;
        height: 40px;
        font: 500 10px/129% Roboto;
        color: white;
      `}/>
      <input value={lastName} onChange={ev=>setLastName(ev.target.value)} placeholder='Фамилия' css={css`
        width: 100%;
        height: 40px;
        font: 500 10px/129% Roboto;
        color: white;
      `}/>
      <input value={sex} onChange={ev=>setSex(ev.target.value)} placeholder='Пол MALE / FEMALE' css={css`
        width: 100%;
        height: 40px;
        font: 500 10px/129% Roboto;
        color: white;
      `}/>
      <input value={birthDate} onChange={ev=>setBirthDate(ev.target.value)} placeholder='День рождения 2000-12-30' css={css`
        width: 100%;
        height: 40px;
        font: 500 10px/129% Roboto;
        color: white;
      `}/>
      <button
        onClick={trySignup}
        css={css`
          width: 100%;
          height: 40px;
          font: 500 10px/129% Roboto;
          color: white;
        `}
      >
        Зарегистрироваться
      </button>
      
      <Link to={'/login'}>
        <button
          css={css`
            width: 100%;
            height: 40px;
            font: 500 10px/129% Roboto;
            color: white;
          `}
        >
          Войти
        </button>
      </Link>
      
    </div>
    <div
      css={css`
        font: 500 50px/129% Roboto;
        color: white;
      `}
    >
      { state==='loading' && 'Загрузка...' }
      { state==='success' && <Navigate to={'/landing'} /> }
      { state==='error' && <div>
        Ошибка<br/>
        {JSON.stringify(error)}
      </div> }
    </div>
  </Page>
}

export default SignupPage




const Page = styled.main`
  width: 100%;
  min-height: 100vh;
  ${center};
  padding: 32px;
  background-color: #282c34;
`