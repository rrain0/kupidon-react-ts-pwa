/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { ValidationCore } from 'src/form-validation-1/ValidationCore'
import { LoginPageValidation } from './validation1'
import FormValues = LoginPageValidation.FormValues
import { ValidationValidate } from 'src/form-validation-1/ValidationValidate'
import validate = ValidationValidate.validate
import LoginRespE = AuthApi.LoginRespE
import validators = LoginPageValidation.validators
import { Utils } from 'src/utils/Utils'
import { ValidationActions } from 'src/form-validation-1/ValidationActions'
import updateFailures = ValidationActions.updateFailures
import { ValidationComponents } from 'src/form-validation-1/ValidationComponents'
import InputValidationWrap = ValidationComponents.InputValidationWrap




export const defaultLoginValues: FormValues = {
  login: '',
  pwd: '',
  //form: undefined,
}
const defaultError = validate({ values: defaultLoginValues, validators: validators })


const LoginPage = () => {
  
  const [searchParams] = useSearchParams()
  // todo extract to routes object
  const backPath = searchParams.get('back-path') ?? undefined
  
  const navigate = useNavigate()
  
  const setAuth = useSetRecoilState(authState)
  
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginFailure, setLoginFailure] = useState([defaultError,defaultError] as const) // [now,prev]
  const [loginForm, setLoginForm] = useState([defaultLoginValues,defaultLoginValues] as const) // [now,prev]
  
  
  
  
  const [loginResponse, setLoginResponse] = useState(undefined as undefined
    | { success: AuthApi.LoginRespS }
    | { error: any }
  )
  useEffect(()=>{
    if (loginResponse){
      const s =
        // @ts-ignore
        loginResponse.success as undefined | AuthApi.LoginRespS
      // @ts-ignore
      const e =
        // @ts-ignore
        loginResponse.error as undefined | any
      if (s){
        setAuth(s.data)
        setLoginSuccess(true)
      } else if (e){
        if (e instanceof AxiosError){
          if (e.code===AxiosError.ERR_NETWORK){
            setLoginSuccess(false)
            setLoginFailure([
              validate({
                values: loginForm[0], prevValues: loginForm[1],
                outerValue: 'connection-error',
                prevFailures: loginFailure[0],
                validators: validators,
              }),
              loginFailure[0]
            ])
          } else if (e.response?.status===400){
            const err = e.response as LoginRespE
            setLoginSuccess(false)
            setLoginFailure([
              validate({
                values: loginForm[0], prevValues: loginForm[1],
                outerValue: err.data.code,
                prevFailures: loginFailure[0],
                validators: validators,
              }),
              loginFailure[0]
            ])
          }
        } else {
          setLoginSuccess(false)
          setLoginFailure([
            validate({
              values: loginForm[0], prevValues: loginForm[1],
              outerValue: 'unknown',
              prevFailures: loginFailure[0],
              validators: validators,
            }),
            loginFailure[0]
          ])
          console.warn('UNKNOWN ERROR',e)
        }
      }
      setLoginResponse(undefined)
    }
  },[loginResponse, loginSuccess, loginFailure, loginForm])
  
  
  
  toast.onChange(toast=>{
    const id = toast.id
    if (typeof id === 'string' && id.startsWith('failure') && toast.status==='removed'){
      //console.log('closed id',id)
      setLoginFailure([
        updateFailures(loginFailure[0], { failureIds: [id] }, { notify: false }),
        loginFailure[1]
      ])
    }
  })
  
  
  const [resetDelay,setResetDelay] = useState(false)
  useEffect(()=>{
    const now = +new Date()
    let next: number|undefined
    loginFailure[0].forEach(f=>{
      const time = +f.created+f.delay
      if (time>now && (!next || time<next)) next = time
    })
    if (next !== undefined){
      const timerId = setTimeout(
        ()=>setResetDelay(true),
        next-now
      )
      return ()=>clearTimeout(timerId)
    }
  },[loginFailure[0]])
  useEffect(()=>{
    if (resetDelay){
      setResetDelay(false)
      setLoginFailure([
        loginFailure[0].map(f=>{
          const now = +new Date()
          const time = +f.created+f.delay
          if (time<=now && f.delay>0) return Utils.copy(f, { delay: 0 })
          else return f
        }),
        loginFailure[1]
      ])
    }
  },[resetDelay,loginFailure[0],loginFailure[1]])
  
  
  useEffect(()=>{
    if (loginLoading) Toasts.Loading.show()
    else toast.dismiss(Toasts.Loading.id)
    
    if (loginSuccess) {
      Toasts.SuccessSignIn.show()
      navigate(backPath ?? `/${AppRoutes.profile}`)
    }
    
    
    
    const prevFailIds = new Set(loginFailure[1].filter(el=>el.notifyNow).map(el=>el.id))
    const failIds = new Set(loginFailure[0].filter(el=>el.notifyNow).map(el=>el.id))
    
    const remove = Utils.SetExclude(prevFailIds, failIds)
    remove.forEach(elId=>toast.dismiss(elId))
    
    //console.log('notifications loginState', loginState)
    // todo priority
    const failToShow = loginFailure[0].find(el=>el.notifyNow)
    if (failToShow){
      Toasts.Error.show(failToShow.id,
        ()=><div css={t=>css`
        font: 400 14px/129% Roboto;
        color: var(--toastify-text-color-${t.type satisfies 'light'|'dark'});
        white-space: break-spaces;
      `}>
          Ошибка! {failToShow.msg}
        </div>
      )
    }
  },[loginLoading, loginSuccess, loginFailure])
  
  
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    
    const newFails = updateFailures(
      loginFailure[0].filter(f=>f.type==='format'),
      { failureIds:'all' },
      { highlight: true, notify: true }
    )
    setLoginSuccess(false)
    setLoginFailure([newFails,loginFailure[1]])
    
    if (newFails.length>0) return
    
    void tryLogin()
  }
  
  const tryLogin = async()=>{
    if (loginLoading) return
    setLoginLoading(true)
    try {
      const response = await AuthApi.login(loginForm[0])
      setLoginResponse({ success: response })
    } catch (e){
      setLoginResponse({ error: e })
    } finally {
      setLoginLoading(false)
    }
  }
  
  const validationProps = {
    values: loginForm,
    validators: validators,
    failures: loginFailure,
    setError: setLoginFailure,
    setValues: setLoginForm,
  }
  
  return <Page>
    <Form onSubmit={onSubmit}>
      
      <h3 css={formHeader}>Вход</h3>
      
      <InputValidationWrap
        {...validationProps}
        fieldName={'login'}
        errorPropName={'hasError'} // todo
      >
        <Input
          css={InputStyle.input}
          placeholder='логин (email)'
        />
      </InputValidationWrap>
      <InputValidationWrap
        {...validationProps}
        fieldName={'pwd'}
        errorPropName={'hasError'} // todo
      >
        <PwdInput
          css={InputStyle.input}
          placeholder='пароль'
        />
      </InputValidationWrap>
      
      {/*<Input
        css={InputStyle.input}
        value={loginForm.login}
        onChange={setLogin}
        placeholder='логин (email)'
        hasError={loginState.error?.failures.login?.highlight}
        onBlur={()=>onBlur('login')}
      />*/}
      {/*<PwdInput
        css={InputStyle.input}
        value={loginForm.pwd}
        onChange={setPwd}
        placeholder='пароль'
        hasError={loginState.error?.failures.pwd?.highlight}
        onBlur={()=>onBlur('pwd')}
      />*/}
      
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

