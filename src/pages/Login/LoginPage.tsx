/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useRef, useState } from 'react'
import { AuthApi } from 'src/api/requests/AuthApi'
import { AxiosError } from 'axios'
import { useSetRecoilState } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomButtonBar, {
  bottomButtonBarHeight,
} from 'src/components/BottomButtonBar/BottomButtonBar'
import { bottomNavBarHeight } from 'src/components/BottomNavBar/BottomNavBar'
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import { LoginPageUiOptions } from 'src/pages/Login/LoginPageUiOptions'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useUiOptionsContainer } from 'src/utils/lang/useUiOptions'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import Button from 'src/views/Buttons/Button'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import Input from 'src/views/Inputs/Input'
import PwdInput from 'src/views/Inputs/PwdInput'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { InputStyle } from 'src/views/Inputs/InputStyle'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import { Themes } from 'src/utils/theme/Themes'
import { toast } from 'react-toastify'
import { Toasts } from 'src/utils/toasts/Toasts'
import { useContainerScrollState } from 'src/views/Scrollbar/useContainerScrollState'
import { LoginPageValidation } from './validation'
import FormValues = LoginPageValidation.FormValues
import { ValidationValidate } from 'src/utils/react/form-validation/ValidationValidate'
import validate = ValidationValidate.validate
import LoginRespE = AuthApi.LoginRespE
import validators = LoginPageValidation.validators
import { Utils } from 'src/utils/common/Utils'
import { ValidationActions } from 'src/utils/react/form-validation/ValidationActions'
import updateFailures = ValidationActions.updateFailures
import { ValidationComponents } from 'src/utils/react/form-validation/ValidationComponents'
import InputValidationWrap = ValidationComponents.InputValidationWrap
import { useFailureDelay } from 'src/utils/react/form-validation/useFailureDelay'
import Lazy = Utils.Lazy
import { useToastFailures } from 'src/utils/toasts/useToastFailures'
import { Pages } from 'src/components/Page/Pages'
import Page = Pages.Page
import GearIc = SimpleSvgIcons.GearIc
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import params = RouteBuilder.params



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
  const returnPath = searchParams.get(RootRoute.login[params].returnPath) ?? undefined
  const navigate = useNavigate()
  
  const setAuth = useSetRecoilState(AuthRecoil)
  
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
      navigate(returnPath ?? RootRoute.main[full]())
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
  
  
  const [settingsOpen, setSettingsOpen] = useState(false)
  
  
  const pageRef = useRef<HTMLElement>(null)
  
  const {
    canScrollHorizontal,
    canScrollVertical,
    ...scrollbarProps
  } = useContainerScrollState({
    containerIsWindow: true,
    contentRef: pageRef,
  })
  
  
  const uiOptions = useUiOptionsContainer(LoginPageUiOptions)
  
  
  return <>
    <Page
      ref={pageRef}
      css={css`
        padding-bottom: calc(${bottomButtonBarHeight}px);
      `}
    >
  
      <Form onSubmit={onSubmit}>
        
        <h3 css={formHeader}>
          {uiOptions.login[0].text}
        </h3>
        
        <InputValidationWrap
          {...validationProps}
          fieldName={'login'}
          errorPropName={'hasError'} // todo
        >
          <Input
            css={InputStyle.input}
            placeholder={uiOptions.loginEmailPlaceholder[0].text}
          />
        </InputValidationWrap>
        
        <InputValidationWrap
          {...validationProps}
          fieldName={'pwd'}
          errorPropName={'hasError'} // todo
        >
          <PwdInput
            css={InputStyle.input}
            placeholder={uiOptions.pwdPlaceholder[0].text}
          />
        </InputValidationWrap>
        
        <Button
          css={ButtonStyle.bigRectPrimary}
          type="submit"
        >
          {uiOptions.signIn[0].text}
        </Button>
        
        
        <Link to={RootRoute.signup[fullAllowedNameParams]({ returnPath: returnPath })}>
          <Button css={ButtonStyle.bigRectNormal}>
            {uiOptions.signup[0].text}
          </Button>
        </Link>
      
      </Form>
    
    
    </Page>
    
    
    
    <div
      css={css`
        position: fixed;
        bottom: 0; right: 0; left: 0;
        height: 100dvh;
        pointer-events: none;
      `}
    >
      <ScrollbarOverlay css={ScrollbarOverlayStyle.page}
        {...scrollbarProps}
        showVertical={canScrollVertical}
        showHorizontal={canScrollHorizontal}
      />
    </div>
      
      
    <BottomButtonBar>
      <Button css={ButtonStyle.iconTransparent}
        onClick={()=>setSettingsOpen(true)}
      >
        <GearIc/>
      </Button>
    </BottomButtonBar>
    
    <QuickSettings open={settingsOpen} setOpen={setSettingsOpen}/>
  
  </>
}

export default LoginPage



const Form = styled.form`
  max-width: 500px;
  width: 100%;
  ${col};
  gap: 16px;
  justify-items: stretch;
`

const formHeader = (theme: Themes.Theme) => css`
  font: 500 28px/150% Roboto;
  letter-spacing: 0.05em;
  color: ${theme.page.text[0]};
  align-self: center;
`

