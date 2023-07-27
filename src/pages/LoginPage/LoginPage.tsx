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
import { usePrevState } from 'src/utils-react/usePrevState'
import { Utils } from 'src/utils/Utils'
import { useDebounce } from 'src/utils-react/useDebounce'
import { ValidationActions } from 'src/form-validation/ValidationActions'
import updateFailures = ValidationActions.updateFailures




export const defaultLoginValues: FormValues = {
  login: '',
  pwd: '',
  form: undefined,
}
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
    const newLoginForm = { ...loginForm, login: ev.target.value, form: undefined }
    let newFailures = updateFailures(
      loginState.error, { fields: ['login'] }, undefined,
      { applyToSameFullCode: true, remove: true }
    )
    setLoginForm(newLoginForm)
    setLoginState({ ...loginState, error: newFailures})
  }
  const setPwd = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newLoginForm = { ...loginForm, pwd: ev.target.value, form: undefined }
    let newFailures = updateFailures(
      loginState.error, { fields: ['pwd'] }, undefined,
      { applyToSameFullCode: true, remove: true }
    )
    setLoginForm(newLoginForm)
    setLoginState({ ...loginState, error: newFailures})
  }
  
  
  const onBlur = (fieldName: keyof FormValues) => {
    const newError = validate(loginForm, loginState.error, validators, { checkOnly: [fieldName] })
    setLoginState({ ...loginState, error: newError })
  }
  
  
  const [loginDebounceUpdate, setLoginDebounceUpdate] = useState(false)
  const [pwdDebounceUpdate, setPwdDebounceUpdate] = useState(false)
  useDebounce(()=>{
    setLoginDebounceUpdate(true)
  },3000,[loginForm.login])
  useDebounce(()=>{
    setPwdDebounceUpdate(true)
  },3000,[loginForm.pwd])
  useEffect(()=>{
    if (loginDebounceUpdate){
      const newError = validate(loginForm, loginState.error, validators, { checkOnly: ['login'] })
      setLoginState({ ...loginState, error: newError })
      setLoginDebounceUpdate(false)
    }
  },[loginDebounceUpdate, loginForm, loginState])
  useEffect(()=>{
    if (pwdDebounceUpdate){
      const newError = validate(loginForm, loginState.error, validators, { checkOnly: ['pwd'] })
      setLoginState({ ...loginState, error: newError })
      setPwdDebounceUpdate(false)
    }
  },[pwdDebounceUpdate, loginForm, loginState])
  
  
  
  
  const [loginResponse, setLoginResponse] = useState(undefined as undefined
    | { success: AuthApi.LoginRespS }
    | { error: any }
  )
  useEffect(()=>{
    if (loginResponse){
      // @ts-ignore
      const s = loginResponse?.success as undefined | AuthApi.LoginRespS
      // @ts-ignore
      const e = loginResponse?.error as undefined | any
      if (s){
        setAuth(s.data)
        setLoginState({
          ...loginState,
          success: true
        })
      } else if (e){
        if (e instanceof AxiosError){
          if (e.code===AxiosError.ERR_NETWORK){
            const newLoginForm: FormValues = { ...loginForm, form: 'connection-error' }
            setLoginForm(newLoginForm)
            setLoginState({
              ...loginState,
              success: false,
              error: validate(
                newLoginForm,
                loginState.error,
                validators,
                { type: 'submit' }
              )
            })
          } else if (e.response?.status===400){
            const err = e.response as LoginRespE
            const newLoginForm = { ...loginForm, form: err.data.code }
            setLoginForm(newLoginForm)
            setLoginState({
              ...loginState,
              success: false,
              error: validate(
                newLoginForm,
                loginState.error,
                validators,
                { type: 'submit' }
              )
            })
          }
        } else {
          const newLoginForm: FormValues = { ...loginForm, form: 'unknown' }
          setLoginForm(newLoginForm)
          setLoginState({
            ...loginState,
            success: false,
            error: validate(
              newLoginForm,
              loginState.error,
              validators,
              { type: 'submit' }
            )
          })
          console.warn('UNKNOWN ERROR',e)
        }
      }
      setLoginResponse(undefined)
    }
  },[loginResponse, loginState, loginForm])
  
  
  
  toast.onChange(toast=>{
    const id = toast.id
    if (typeof id === 'string' && id.startsWith('failure') && toast.status==='removed'){
      setLoginState(s=>({
        ...s,
        error: updateFailures(s.error, { failuresId: [id] }, { notify: false })}
      ))
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
    
    //console.log('notifications loginState', loginState)
    const fail = Object.values(loginState.error?.failures ?? {}).find(el=>el?.notify)
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
  },[loginState,prevLoginState])
  
  
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    
    const failures = validate(
      loginForm,
      loginState.error,
      validators,
      { type: 'submit' }
    )
    setLoginState({
      ...loginState,
      success: false,
      error: failures
    })
    if (failures.hasFailure()) return
    
    void tryLogin()
  }
  
  const tryLogin = async()=>{
    if (loginState.loading) return
    setLoginState(s=>({ ...s, loading: true }))
    try {
      const response = await AuthApi.login(loginForm)
      setLoginResponse({ success: response })
    } catch (e){
      setLoginResponse({ error: e })
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
        onBlur={()=>onBlur('login')}
      />
      <PwdInput
        css={InputStyle.input}
        value={loginForm.pwd}
        onChange={setPwd}
        placeholder='пароль'
        hasError={loginState.error?.failures.pwd?.highlight}
        onBlur={()=>onBlur('pwd')}
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

