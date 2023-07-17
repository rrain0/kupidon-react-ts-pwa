/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { AuthApi } from 'src/api/requests/AuthApi'
import { AxiosError } from 'axios'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { authState } from 'src/recoil/AuthState'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Button from 'src/components/Buttons/Button'
import Input from 'src/components/Inputs/Input'
import PwdInput from 'src/components/Inputs/PwdInput'
import { ButtonStyle } from 'src/components/Buttons/ButtonStyle'
import { InputStyle } from 'src/components/Inputs/InputStyle'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import center = EmotionCommon.center
import col = EmotionCommon.col
import { Theme } from 'src/theme/Theme'
import { toast } from 'react-toastify'
import { Toasts } from 'src/toasts/Toasts'
import { ValidationCore } from 'src/form-validation/ValidationCore'
import FormFailures = ValidationCore.FormFailures
import { LoginPageValidation } from './validation'
import FormValues = LoginPageValidation.FormValues
import { ValidationValidate } from 'src/form-validation/ValidationValidate'
import validate = ValidationValidate.validate
import LoginRespE = AuthApi.LoginRespE
import validators = LoginPageValidation.validators
import { ValidationActions } from 'src/form-validation/ValidationActions'
import { usePrevState } from 'src/utils-react/usePrevState';
import { Utils } from 'src/utils/Utils';
import hideNotification2 = ValidationActions.hideNotification2;
import { useDebounce } from 'src/utils-react/useDebounce';
import hideNotification = ValidationActions.hideNotification;
import hideHighlight = ValidationActions.hideHighlight;
import changeFailure = ValidationActions.changeFailure;




export const defaultLoginValues = {
  login: '',
  pwd: '',
  form: undefined,
} satisfies FormValues
const defaultError = validate(defaultLoginValues, undefined, validators) as FormFailures<FormValues>


const LoginPage = () => {
  
  const [searchParams] = useSearchParams()
  // todo extract to routes object
  const backPath = searchParams.get('back-path') ?? undefined
  
  const navigate = useNavigate()
  
  const setAuth = useSetRecoilState(authState)
  
  const [loginState, prevLoginState, setLoginState] = usePrevState({
    loading: false,
    success: false,
    error: defaultError,
  })
  
  const [loginForm, setLoginForm] = useState(defaultLoginValues)
  const setLogin = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newLoginForm = { ...loginForm, login: ev.target.value, form: undefined}
    let newFailures = validate(newLoginForm, loginState.error, validators, { checkOnly: ['form'] })
    newFailures = hideNotification(newFailures, 'login')
    newFailures = hideHighlight(newFailures, 'login')
    setLoginForm(newLoginForm)
    setLoginState(s=>({ ...s, error: newFailures}))
  }
  const setPwd = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newLoginForm = { ...loginForm, pwd: ev.target.value, form: undefined}
    let newFailures = validate(newLoginForm, loginState.error, validators, { checkOnly: ['form'] })
    newFailures = hideNotification(newFailures, 'pwd')
    newFailures = hideHighlight(newFailures, 'pwd')
    setLoginForm(newLoginForm)
    setLoginState(s=>({ ...s, error: newFailures}))
  }
  
  useDebounce(()=>{
    let newFailures = validate(loginForm, loginState.error, validators, { checkOnly: ['login'] })
    newFailures = changeFailure(newFailures, 'login', { highlight: true, notify: true })
    setLoginState(s=>({ ...s, error: newFailures}))
  }, 3000, [loginForm.login])
  useDebounce(()=>{
    let newFailures = validate(loginForm, loginState.error, validators, { checkOnly: ['pwd'] })
    newFailures = changeFailure(newFailures, 'pwd', { highlight: true, notify: true })
    setLoginState(s=>({ ...s, error: newFailures}))
  }, 3000, [loginForm.pwd])
  
  
  
  toast.onChange(toast=>{
    const id = toast.id
    if (typeof id === 'string' && id.startsWith('failure') && toast.status==='removed'){
      setLoginState(s=>({ ...s, error: hideNotification2(s.error, id)}))
    }
  })
  
  
  
  useEffect(()=>{
    if (loginState.loading) Toasts.Loading.show()
    else toast.dismiss(Toasts.Loading.id)
    
    if (loginState.success) {
      Toasts.SuccessSignIn.show()
      navigate(backPath ?? `/${AppRoutes.profile}`)
    }
    
    
    
    const prevFailIds = new Set(Object.values(prevLoginState.error?.failures ?? {})
      .filter(el=>el?.notify).map(el=>el?.id))
    const failIds = new Set(Object.values(loginState.error?.failures ?? {})
      .filter(el=>el?.notify).map(el=>el?.id))
    
    const remove = Utils.SetExclude(prevFailIds, failIds)
    remove.forEach(elId=>toast.dismiss(elId))
    
    const fail = Object.values(loginState.error?.failures ?? {})
      .find(el=>el?.notify)
    if (fail){
      Toasts.Error.show(fail.id,
        ()=><div css={t=>css`
        font: 400 14px/129% Roboto;
        color: var(--toastify-text-color-${t.type satisfies 'light'|'dark'});
        white-space: break-spaces;
      `}>
          Ошибка! {fail.msg}
        </div>
      )
    }
  },[loginState])
  
  
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    
    const failures = validate(
      loginForm,
      loginState.error,
      validators,
      { type: 'submit' }
    )
    setLoginState(s=>({
      ...s,
      success: false,
      error: failures
    }))
    if (failures.hasFailure()) return
    
    void tryLogin()
  }
  
  const tryLogin = async ()=>{
    if (loginState.loading) return
    setLoginState(s=>({ ...s, loading: true }))
    try {
      const response = await AuthApi.login(loginForm)
      setAuth(response.data)
      setLoginState(s=>({
        ...s,
        success: true,
        error: defaultError
      }))
    } catch (e){
      if (e instanceof AxiosError){
        if (e.response?.status===400){
          const err = e.response as LoginRespE
          setLoginState(s=>({
            ...s, success: false,
            error: validate(
              {...defaultLoginValues, form: err.data.code},
              loginState.error,
              validators,
              { type: 'submit' }
            )
          }))
        }
        
      }
      
    } finally {
      setLoginState(s=>({ ...s, loading: false }))
    }
  }
  
  return <Page>
    <Form onSubmit={onSubmit}>
      
      <h3 css={formHeader}>Вход</h3>
      
      <Input
        css={InputStyle.input}
        value={loginForm.login}
        onChange={setLogin}
        placeholder='логин (email)'
        hasError={loginState.error?.failures.login?.highlight}
      />
      <PwdInput
        css={InputStyle.input}
        value={loginForm.pwd}
        onChange={setPwd}
        placeholder='пароль'
        hasError={loginState.error?.failures.pwd?.highlight}
      />
      
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

