/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AuthApi } from 'src/api/requests/AuthApi'
import { AxiosError } from 'axios'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { authState } from 'src/recoil/state/AuthState'
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
import { LoginPageValidation } from './validation'
import FormValues = LoginPageValidation.FormValues
import { ValidationValidate } from 'src/form-validation/ValidationValidate'
import validate = ValidationValidate.validate
import LoginRespE = AuthApi.LoginRespE
import validators = LoginPageValidation.validators
import { Utils } from 'src/utils/Utils'
import { ValidationActions } from 'src/form-validation/ValidationActions'
import updateFailures = ValidationActions.updateFailures
import { ValidationComponents } from 'src/form-validation/ValidationComponents'
import InputValidationWrap = ValidationComponents.InputValidationWrap
import { useFailureDelay } from 'src/form-validation/useFailureDelay'
import Lazy = Utils.Lazy
import { useToastFailures } from 'src/toasts/useToastFailures'
import RootRoutes = AppRoutes.RootRoutes;



export const LoginDefaults = function(){
  const defaultValues = new Lazy<FormValues>(()=>({
    login: '',
    pwd: '',
  }))
  const defaultFailures = new Lazy(()=>validate(
    { values: defaultValues.get(), validators: validators }
  ))
  return {
    get values() { return defaultValues.get() },
    get failures() { return defaultFailures.get() }
  }
}()




const LoginPage = () => {
  
  const [searchParams] = useSearchParams()
  //@ts-ignore
  const returnPath = searchParams.get(RootRoutes.login.params.returnPath) ?? undefined
  const navigate = useNavigate()
  
  const setAuth = useSetRecoilState(authState)
  
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginFailure, setLoginFailure] = useState(LoginDefaults.failures)
  const [loginForm, setLoginForm] = useState([LoginDefaults.values,LoginDefaults.values] as const) // [now,prev]
  
  
  
  
  const [loginResponse, setLoginResponse] = useState(
    undefined as undefined | { success?: AuthApi.LoginRespS, error?: any }
  )
  useEffect(()=>{
    if (loginResponse){
      const { success:s, error:e } = loginResponse
      if (s){
        setAuth(s.data)
        setLoginSuccess(true)
      } else if (e){
        setLoginSuccess(false)
        if (e instanceof AxiosError){
          if (e.code===AxiosError.ERR_NETWORK){
            setLoginFailure(validate({
                values: loginForm[0], prevValues: loginForm[1],
                outerValue: 'connection-error',
                prevFailures: loginFailure,
                validators: validators,
            }))
          } else if (e.response?.status===400){
            const err = e.response as LoginRespE
            setLoginFailure(validate({
              values: loginForm[0], prevValues: loginForm[1],
              outerValue: err.data.code,
              prevFailures: loginFailure,
              validators: validators,
            }))
          }
        } else {
          setLoginFailure(validate({
            values: loginForm[0], prevValues: loginForm[1],
            outerValue: 'unknown',
            prevFailures: loginFailure,
            validators: validators,
          }))
          console.warn('UNKNOWN ERROR',e)
        }
      }
      setLoginResponse(undefined)
    }
  },[loginResponse, loginSuccess, loginFailure, loginForm])
  
  
  // todo extract
  toast.onChange(toast=>{
    const id = toast.id
    if (typeof id === 'string' && id.startsWith('failure') && toast.status==='removed'){
      //console.log('closed id',id)
      setLoginFailure(
        updateFailures(loginFailure, { failureIds: [id] }, { notify: false }),
      )
    }
  })
  
  
  useFailureDelay(loginFailure,setLoginFailure)
  
  
  
  useEffect(()=>{
    if (loginLoading) Toasts.Loading.show('Вход...')
    else toast.dismiss(Toasts.Loading.id)
    
    if (loginSuccess) {
      Toasts.SuccessSignIn.show('Вход выполнен')
      navigate(returnPath ?? RootRoutes.main.fullPath())
    }
  },[loginLoading, loginSuccess, returnPath])
  
  
  useToastFailures(loginFailure)
  
  
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    
    const newFails = updateFailures(
      loginFailure.filter(f=>f.type==='format'),
      { failureIds:'all' },
      { highlight: true, notify: true }
    )
    setLoginSuccess(false)
    setLoginFailure(newFails)
    
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
      
      <Button
        css={ButtonStyle.primary}
        type='submit'>
        Войти
      </Button>
      
      
      <Link to={RootRoutes.signup.fullPath({ returnPath: returnPath })}>
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

