/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { AuthApi } from 'src/api/requests/AuthApi'
import { AxiosError } from 'axios'
import { useSetRecoilState } from 'recoil'
import { authState } from 'src/recoil/AuthState'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Buttons/Button'
import Input from 'src/components/Inputs/Input'
import PwdInput from 'src/components/Inputs/PwdInput'
import { ButtonStyle } from 'src/components/Buttons/ButtonStyle';
import { InputStyle } from 'src/components/Inputs/InputStyle';
import { AppRoutes } from 'src/app-routes/AppRoutes';
import styled from '@emotion/styled';
import { EmotionCommon } from 'src/styles/EmotionCommon';
import center = EmotionCommon.center;
import col = EmotionCommon.col;
import { Theme } from 'src/theme/Theme';
import { toast } from 'react-toastify';
import { Toasts } from 'src/toasts/Toasts';



const LoginPage = () => {
  
  const navigate = useNavigate()
  
  const setAuth = useSetRecoilState(authState)
  
  const [loginState, setLoginState] = useState({
    loading: false,
    success: false,
    error: undefined as undefined|object,
    errorDismissed: false,
  })
  toast.onChange(toast=>{
    if (toast.id===Toasts.Error.id && toast.status==='removed')
      setLoginState(s=>({ ...s, errorDismissed: true }))
  })
  
  useEffect(()=>{
    if (loginState.loading) Toasts.Loading.show()
    else toast.dismiss(Toasts.Loading.id)
    
    if (loginState.success) {
      Toasts.SuccessSignIn.show()
      navigate(`/${AppRoutes.profile}`)
    }
    
    if (loginState.error && !loginState.errorDismissed) Toasts.Error.show(
      ()=><div css={t=>css`
        font: 400 14px/129% Roboto;
        color: ${t.page.text};
        white-space: break-spaces;
      `}>
        Ошибка! {JSON.stringify(loginState.error!)}
      </div>
    )
    else toast.dismiss(Toasts.Error.id)
  },[loginState])
  
  const [login,setLogin] = useState('')
  const [pwd,setPwd] = useState('')
  
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    void tryLogin()
  }
  
  const tryLogin = async ()=>{
    if (loginState.loading) return
    setLoginState(s=>({ ...s, loading: true }))
    try {
      const response = await AuthApi.login({ login, pwd })
      setAuth(response.data)
      setLoginState(s=>({
        ...s,
        success: true,
        error: undefined
      }))
    } catch (e){
      // @ts-ignore
      setLoginState(s=>({
        ...s, success: false,
        error: (e as AxiosError).response?.data,
        errorDismissed: false
      }))
    } finally {
      setLoginState(s=>({ ...s, loading: false }))
    }
  }
  
  return <Page>
    <Form onSubmit={onSubmit}>
      
      <h3 css={formHeader}>Вход</h3>
      
      <Input
        css={InputStyle.input}
        value={login}
        onChange={ev=>setLogin(ev.target.value)}
        placeholder='логин (email)' />
      <PwdInput
        css={InputStyle.input}
        value={pwd}
        onChange={ev=>setPwd(ev.target.value)}
        placeholder='пароль' />
      
      <Button
        css={ButtonStyle.primary}
        type='submit'>
        Войти
      </Button>
      
      
      <Link to={`/${AppRoutes.signup}`}>
        <Button
          css={ButtonStyle.secondary}>
          Зарегистрироваться
        </Button>
      </Link>
      
    </Form>
  </Page>
}

export default LoginPage




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

