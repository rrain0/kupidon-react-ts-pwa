/** @jsxImportSource @emotion/react */
import styled from 'styled-components'
import { StyledCommon } from 'src/styles/StyledCommon'
import center = StyledCommon.center
import col = StyledCommon.col
import { css } from '@emotion/react'
import { useState } from 'react'
import { AuthApi } from 'src/api/requests/AuthApi'
import { AxiosError } from 'axios'
import { useSetRecoilState } from 'recoil'
import { authState } from 'src/recoil/AuthState'
import { Link, Navigate } from 'react-router-dom'
import ButtonLightCherry from 'src/components/Buttons/Button'
import Input from 'src/components/Inputs/Input'
import PwdInput from 'src/components/Inputs/PwdInput'
import { ButtonStyle } from 'src/components/Buttons/ButtonStyle';
import { InputStyle } from 'src/components/Inputs/InputStyle';



const LoginPage = () => {
  
  const setAuth = useSetRecoilState(authState)
  
  const [state,setState] = useState('none' as 'none'|'loading'|'success'|'error')
  const [error,setError] = useState(null as any)
  
  const [login,setLogin] = useState('')
  const [pwd,setPwd] = useState('')
  
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    void tryLogin()
  }
  
  const tryLogin = async ()=>{
    if (state==='loading') return
    setState('loading')
    try {
      const response = await AuthApi.login({ login, pwd })
      setAuth(response.data)
      setState('success')
    } catch (e){
      setState('error')
      setError((e as AxiosError).response?.data)
    }
  }
  
  return <Page>
    <Form onSubmit={onSubmit}>
      
      <h3 css={formHeader}>Вход</h3>
      
      <Input
        //hasError={true}
        css={InputStyle.gradientBorder}
        value={login}
        onChange={ev=>setLogin(ev.target.value)}
        placeholder='логин (email)' />
      <PwdInput
        css={InputStyle.gradientBorder}
        value={pwd}
        onChange={ev=>setPwd(ev.target.value)}
        placeholder='пароль' />
      
      <ButtonLightCherry
        css={ButtonStyle.lightCherry}
        type='submit'>
        Войти
      </ButtonLightCherry>
      
      
      <Link to={'/signup'}>
        <ButtonLightCherry
          css={ButtonStyle.lightPink}>
          Зарегистрироваться
        </ButtonLightCherry>
      </Link>
      
      <div
        css={css`
          font: 500 20px/129% Roboto;
          color: black;
        `}
      >
        { state==='loading' && 'Загрузка...' }
        { state==='success' && <Navigate to={'/landing'} /> }
        { state==='error' && <div>
          Ошибка<br/>
          {JSON.stringify(error)}
        </div> }
      </div>
      
    </Form>
  </Page>
}

export default LoginPage




const Page = styled.main`
  min-width: 100%;
  min-height: 100%;
  ${center};
  padding: 32px;
  //background-color: #282c34;
  background-image: linear-gradient(to bottom right, #ffb6c1 0%, whitesmoke 40% 60%, #ffb6c1 100%);
`

const Form = styled.form`
  max-width: 500px;
  width: 100%;
  ${col};
  gap: 16px;
`

const formHeader = css`
  font: 500 28px/150% Roboto;
  letter-spacing: 0.05em;
  color: black;
  align-self: center;
`