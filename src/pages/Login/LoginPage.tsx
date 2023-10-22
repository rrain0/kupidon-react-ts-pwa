/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AuthApi } from 'src/api/requests/AuthApi'
import { AxiosError } from 'axios'
import { useSetRecoilState } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import { LoginPageUiOptions } from 'src/pages/Login/LoginPageUiOptions'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import { UiOption, UiOptionsContainer } from 'src/utils/lang/UiOption'
import { useUiOptionArr, useUiOptionsContainer } from 'src/utils/lang/useUiOptions'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import { useStateAndRef } from 'src/utils/react/useStateAndRef'
import { ToastMsgData, useToasts } from 'src/utils/toasts/useToasts'
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
import { useContainerScrollState } from 'src/views/Scrollbar/useContainerScrollState'
import { LoginPageValidation, mapFailureCodeToUiOption } from './validation'
import FormValues = LoginPageValidation.FormValues
import { ValidationValidate } from 'src/utils/form-validation/ValidationValidate'
import validate = ValidationValidate.validate
import LoginRespE = AuthApi.LoginRespE
import validators = LoginPageValidation.validators
import { Utils } from 'src/utils/common/Utils'
import { ValidationActions } from 'src/utils/form-validation/ValidationActions'
import updateFailures = ValidationActions.updateFailures
import { ValidationComponents } from 'src/utils/form-validation/ValidationComponents'
import InputValidationWrap = ValidationComponents.InputValidationWrap
import Lazy = Utils.Lazy
import { ToastMsg } from 'src/utils/toasts/useToastFailures'
import { Pages } from 'src/components/Page/Pages'
import Page = Pages.Page
import GearIc = SimpleSvgIcons.GearIc
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import params = RouteBuilder.params
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import UserValues = LoginPageValidation.UserValues
import Failure = ValidationCore.Failure
import ReactMemoTyped = ReactUtils.ReactMemoTyped



export const LoginDefaults = function(){
  const defaultValues = new Lazy<FormValues>(()=>({
    login: '',
    pwd: '',
    fromServer: undefined,
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
  
  const uiOptions = useUiOptionsContainer(LoginPageUiOptions)
  
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginForm, setLoginForm] = useState([LoginDefaults.values,LoginDefaults.values] as const) // [now,prev]
  const [loginFailures, setLoginFailures] = useState(LoginDefaults.failures)
  // LayoutEffect is necessary to update data when making Chrome mobile autofill
  useLayoutEffect(
    ()=>{
      setLoginFailures(s=>validate({
        values: loginForm[0],
        prevValues: loginForm[1],
        prevFailures: s,
        validators: validators,
      }))
    },
    [loginForm]
  )
  
  
  useEffect(()=>{
    console.log('LOGIN_FAILURES',loginFailures)
  },[loginFailures])
  
  
  
  
  const [loginResponse, setLoginResponse] = useState(
    undefined as undefined | { 
      success?: AuthApi.LoginRespS
      error?: any
      userValues: UserValues
    }
  )
  useEffect(()=>{
    if (loginResponse){
      const { success:s, error:e, userValues } = loginResponse
      //console.log('s',s,'e',e)
      if (s){
        setAuth(s.data)
        setLoginSuccess(true)
      } else if (e){
        setLoginSuccess(false)
        if (e instanceof AxiosError){
          if (e.code===AxiosError.ERR_NETWORK){
            setLoginForm(loginForm=>([
              { ...loginForm[0],
                fromServer: {
                  values: userValues,
                  error: {
                    code: 'connection-error',
                    msg: 'Connection error',
                  }
                }
              },
              loginForm[0]
            ]))
          } else if (e.response?.status===400){
            const response = e.response as LoginRespE
            setLoginForm(loginForm=>([
              { ...loginForm[0],
                fromServer: {
                  values: userValues,
                  error: {
                    code: response.data.code,
                    msg: response.data.msg,
                  }
                }
              },
              loginForm[0]
            ]))
          }
        } else {
          setLoginForm(loginForm=>([
            { ...loginForm[0],
              fromServer: {
                values: userValues,
                error: {
                  code: 'unknown',
                  msg: 'Unknown error',
                }
              }
            },
            loginForm[0]
          ]))
          console.warn('UNKNOWN ERROR',e)
        }
      }
      setLoginResponse(undefined)
    }
  },[loginResponse, setAuth])
  
  
  
  
  
  
  const [userFailure, setUserFailure] =
    useState(undefined as undefined|Failure<FormValues>)
  const [serverFailure, setServerFailure] =
    useState(undefined as undefined|Failure<FormValues>)
  
  
  useEffect(()=>{
    setUserFailure(undefined)
    setServerFailure(undefined)
    let stale = false
    
    {
      const userFailures = loginFailures
        .filter(f=>!f.canSubmit && f.notify)
      let delay = Number.POSITIVE_INFINITY
      userFailures.forEach(f=>{
        if (f.delayedFor < delay){
          delay = f.delayedFor
          if (!f.isDelayed) setUserFailure(f)
          else f.awaitDelay.then(()=>{
            if (!stale) setUserFailure(f)
          })
        }
      })
    }
    
    {
      const serverFailures = loginFailures
        .filter(f=>f.canSubmit && f.notify)
      let delay = Number.POSITIVE_INFINITY
      serverFailures.forEach(f=>{
        if (f.delayedFor < delay){
          delay = f.delayedFor
          if (!f.isDelayed) setServerFailure(f)
          else f.awaitDelay.then(()=>{
            if (!stale) setServerFailure(f)
          })
        }
      })
    }
    
    return ()=>{ stale=true }
  },[loginFailures])
  
  const userFailureMsg = useMemo(
    ()=>{
      if (userFailure) return new ToastMsgData({
        //id: userFailure.id,
        type: 'danger',
        msg: <ToastMsg
          uiOption={mapFailureCodeToUiOption[userFailure.code]}
          defaultText={userFailure.msg}
        />,
        closeOnUnmount: true,
        showCloseButton: true,
        dragToClose: true,
        onClose: ()=>{
          if (userFailure.notify) setLoginFailures(s=>updateFailures(
            s,
            { failures: [userFailure] },
            { notify: false }
          ))
        }
      })
      return undefined
    },
    [userFailure]
  )
  const serverFailureMsg = useMemo(
    ()=>{
      if (serverFailure) return new ToastMsgData({
        //id: serverFailure.id,
        type: 'danger',
        msg: <ToastMsg
          uiOption={mapFailureCodeToUiOption[serverFailure.code]}
          defaultText={serverFailure.msg}
        />,
        closeOnUnmount: true,
        showCloseButton: true,
        dragToClose: true,
        onClose: ()=>{
          if (serverFailure.notify) setLoginFailures(s=>updateFailures(
            s,
            { failures: [serverFailure] },
            { notify: false }
          ))
        }
      })
      return undefined
    },
    [serverFailure]
  )
  const [loadingMsg] = useState(()=>new ToastMsgData({
    //id: 'loading',
    type: 'loading',
    msg: <ToastMsg uiOption={LoginPageUiOptions.loggingIn}/>,
    closeOnUnmount: true,
  }))
  const [loginSuccessMsg] = useState(()=>new ToastMsgData({
    //id: 'success',
    type: 'ok',
    msg: <ToastMsg uiOption={LoginPageUiOptions.loginCompleted}/>,
    lifetime: 1500,
    dragToClose: true,
  }))
  useToasts({
    scope: 'login-page',
    data: [
      userFailureMsg,
      loginLoading && loadingMsg,
      loginSuccess && loginSuccessMsg,
      serverFailureMsg,
    ],
  })
  
  
  
  // It needs because of Chrome on Android: when browser pastes login/pwd,
  // failure state does not have time to update
  const [doSubmit, setDoSubmit] = useState(false)
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    setDoSubmit(true)
  }
  
  
  const tryLogin = useCallback(
    async()=>{
      if (loginLoading) return
      setLoginLoading(true)
      const form = loginForm[0]
      try {
        const response = await AuthApi.login(form)
        setLoginResponse({ success: response, userValues: form })
      } catch (e){
        setLoginResponse({ error: e, userValues: form })
      } finally {
        setLoginLoading(false)
      }
    },
    [loginForm, loginLoading]
  )
  const trySubmit = useCallback(
    ()=>{
      setLoginSuccess(false)
      if (serverFailure?.highlight || serverFailure?.notify)
        setLoginFailures(s=>updateFailures(
          s,
          { failures: [serverFailure] },
          { highlight: false, notify: false }
        ))
      
      const failsToUpdate = loginFailures
        .filter(f=>!f.canSubmit)
        .filter(f=>!f.highlight || !f.notify || f.isDelayed)
      setLoginFailures(s=>updateFailures(
        s,
        { failures: failsToUpdate },
        { highlight: true, notify: true, delay: 0 }
      ))
      
      const criticalFails = loginFailures.filter(f=>!f.canSubmit)
      if (criticalFails.length>0) return
      
      void tryLogin()
    },
    [loginFailures, tryLogin, serverFailure]
  )
  useEffect(
    ()=>{
      if (doSubmit){
        setDoSubmit(false)
        trySubmit()
      }
    },
    [doSubmit, trySubmit]
  )
  
  
  const validationProps = {
    values: loginForm,
    validators: validators,
    failures: loginFailures,
    setError: setLoginFailures,
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
  
  
  
  
  useEffect(()=>{
    if (loginSuccess) {
      navigate(returnPath ?? RootRoute.main[full]())
    }
  },[loginSuccess, navigate, returnPath])
  
  return <>
    <Page
      ref={pageRef}
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
          {uiOptions.doLogin[0].text}
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

export default ReactMemoTyped(LoginPage)



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

