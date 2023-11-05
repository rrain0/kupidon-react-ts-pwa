/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { PageScrollbarOverlayFrame } from 'src/components/Page/PageScrollbarOverlayFrame'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import UseScrollbars from 'src/components/Scrollbars/UseScrollbars'
import SettingsBottomButtonBar from 'src/components/BottomButtonBar/SettingsBottomButtonBar'
import { SignupPageUiText } from 'src/pages/Signup/uiText'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { AxiosError } from 'axios'
import { useSetRecoilState } from 'recoil'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UserApi } from 'src/api/requests/UserApi'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import ValidationComponentWrap from 'src/utils/form-validation/ValidationComponentWrap'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import { useUiTextContainer } from 'src/utils/lang/useUiText'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import { ToastMsg, ToastMsgData, useToasts } from 'src/utils/toasts/useToasts'
import { InputStyle } from 'src/views/Inputs/Input/InputStyle'
import Input from 'src/views/Inputs/Input/Input'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import Button from 'src/views/Buttons/Button'
import PwdInput from 'src/views/Inputs/Input/PwdInput'
import { Themes } from 'src/utils/theme/Themes'
import RadioInput from 'src/views/Inputs/RadioInput/RadioInput'
import { RadioInputGroup } from 'src/views/Inputs/RadioInput/RadioInputGroup'
import { RadioInputGroupStyle } from 'src/views/Inputs/RadioInput/RadioInputGroupStyle'
import { RadioInputStyle } from 'src/views/Inputs/RadioInput/RadioInputStyle'
import { ValidationValidate } from 'src/utils/form-validation/ValidationValidate'
import validate = ValidationValidate.validate
import { SignupPageValidation } from './validation'
import FormValues = SignupPageValidation.FormValues
import validators = SignupPageValidation.validators
import { ValidationActions } from 'src/utils/form-validation/ValidationActions'
import updateFailures = ValidationActions.updateFailures
import CreateUserRespE = UserApi.CreateUserRespE
import UserToCreate = UserApi.UserToCreate
import { AuthApi } from 'src/api/requests/AuthApi'
import { Pages } from 'src/components/Page/Pages'
import Page = Pages.Page
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import full = RouteBuilder.full
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import UserValues = SignupPageValidation.UserValues
import Failure = ValidationCore.Failure
import awaitDelay = ValidationActions.awaitDelay
import mapFailureCodeToUiOption = SignupPageValidation.mapFailureCodeToUiText
import ReactMemoTyped = ReactUtils.Mem
import defaultValues = SignupPageValidation.defaultValues






const SignupPage = () => {
  
  const [searchParams] = useSearchParams()
  const returnPath = searchParams.get(RootRoute.signup[params].returnPath) ?? undefined
  const navigate = useNavigate()
  
  const setAuth = useSetRecoilState(AuthRecoil)
  
  const uiOptions = useUiTextContainer(SignupPageUiText)
  
  const [signupLoading, setSignupLoading] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [signupForm, setSignupForm] = 
    useState([defaultValues,defaultValues] as const) // [now,prev]
  const [signupFailures, setSignupFailures] = useState(()=>validate(
    { values: defaultValues, validators: validators }
  ))
  // LayoutEffect is necessary to update data when there is Chrome mobile autofill
  useLayoutEffect(
    ()=>{
      setSignupFailures(s=>validate({
        values: signupForm[0],
        prevValues: signupForm[1],
        prevFailures: s,
        validators: validators,
      }))
    },
    [signupForm]
  )
  
  
  useEffect(()=>{
   console.log('SIGNUP_FAILURES',signupFailures)
  },[signupFailures])
  
  
  const [signupResponse, setSignupResponse] = useState(
    undefined as undefined | { 
      success?: AuthApi.LoginRespS
      error?: any
      usedValues: UserValues
    }
  )
  useEffect(()=>{
    if (signupResponse){
      const { success:s, error:e, usedValues } = signupResponse
      setSignupResponse(undefined)
      if (s){
        setAuth(s.data)
        setSignupSuccess(true)
      } else if (e){
        setSignupSuccess(false)
        
        if (e instanceof AxiosError && e.response?.status===400) {
          const response = e.response as CreateUserRespE
          setSignupForm(s=>([
            {
              ...s[0],
              fromServer: {
                values: usedValues,
                error: {
                  code: response.data.code,
                  msg: response.data.msg,
                  extra: e,
                }
              }
            },
            s[0]
          ]))
        }
        else if (e instanceof AxiosError && e.code===AxiosError.ERR_NETWORK){
          setSignupForm(s=>([
            {
              ...s[0],
              fromServer: {
                values: usedValues,
                error: {
                  code: 'connection-error',
                  msg: 'Connection error',
                  extra: e,
                }
              }
            },
            s[0]
          ]))
        }
        else {
          setSignupForm(s=>([
            {
              ...s[0],
              fromServer: {
                values: usedValues,
                error: {
                  code: 'unknown',
                  msg: 'Unknown error',
                  extra: e,
                }
              }
            },
            s[0]
          ]))
          console.warn('UNKNOWN ERROR',e)
        }
        
      }
    }
  },[signupResponse, setAuth])
  
  
  
  const [userFailure, setUserFailure] =
    useState(undefined as undefined|Failure<FormValues>)
  const [serverFailure, setServerFailure] =
    useState(undefined as undefined|Failure<FormValues>)
  
  useEffect(()=>{
    setUserFailure(undefined)
    setServerFailure(undefined)
    const stale: [boolean] = [false]
    
    const userFailures = signupFailures
      .filter(f=>!f.canSubmit && f.notify)
    awaitDelay(userFailures, stale, setUserFailure)
    
    const serverFailures = signupFailures
      .filter(f=>f.canSubmit && f.notify)
    awaitDelay(serverFailures, stale, setServerFailure)
    
    return ()=>{ stale[0]=true }
  },[signupFailures])
  
  const userFailureMsg = useMemo(
    ()=>{
      if (userFailure) return new ToastMsgData({
        type: 'danger',
        msg: <ToastMsg
          uiOption={mapFailureCodeToUiOption[userFailure.code]}
          defaultText={userFailure.msg}
        />,
        closeOnUnmount: true,
        showCloseButton: true,
        dragToClose: true,
        onClose: ()=>{
          if (userFailure.notify) setSignupFailures(s=>updateFailures(
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
        type: 'danger',
        msg: <ToastMsg
          uiOption={mapFailureCodeToUiOption[serverFailure.code]}
          defaultText={serverFailure.msg}
        />,
        closeOnUnmount: true,
        showCloseButton: true,
        dragToClose: true,
        onClose: ()=>{
          if (serverFailure.notify) setSignupFailures(s=>updateFailures(
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
    type: 'loading',
    msg: <ToastMsg uiOption={SignupPageUiText.registration}/>,
    closeOnUnmount: true,
  }))
  const [loginSuccessMsg] = useState(()=>new ToastMsgData({
    type: 'ok',
    msg: <ToastMsg uiOption={SignupPageUiText.registrationCompleted}/>,
    lifetime: 1500,
    dragToClose: true,
  }))
  
  
  useToasts({ toasts: [
    userFailureMsg,
    signupLoading && loadingMsg,
    signupSuccess && loginSuccessMsg,
    serverFailureMsg,
  ]})
  
  
  
  
  // It needs because of Chrome's autofill on Android: when browser pastes login/pwd,
  // failure state does not have time to update
  const [doSubmit, setDoSubmit] = useState(false)
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    setDoSubmit(true)
  }
  const trySignup = useCallback(
    async()=>{
      if (signupLoading) return
      setSignupLoading(true)
      const form = signupForm[0]
      try {
        const response = await UserApi.create(signupForm[0] as UserToCreate)
        setSignupResponse({ success: response, usedValues: form })
      } catch (e){
        setSignupResponse({ error: e, usedValues: form })
      } finally {
        setSignupLoading(false)
      }
    },
    [signupForm, signupLoading]
  )
  const trySubmit = useCallback(
    ()=>{
      setSignupSuccess(false)
      
      if (serverFailure?.highlight || serverFailure?.notify)
        setSignupFailures(s=>updateFailures(
          s,
          { failures: [serverFailure] },
          { highlight: false, notify: false }
        ))
      
      const failsToShow = signupFailures
        .filter(f=>!f.canSubmit)
        .filter(f=>!f.highlight || !f.notify || f.isDelayed)
      setSignupFailures(s=>updateFailures(
        s,
        { failures: failsToShow },
        { highlight: true, notify: true, delay: 0 }
      ))
      
      const criticalFails = signupFailures.filter(f=>!f.canSubmit)
      if (criticalFails.length>0) return
      
      void trySignup()
    },
    [signupFailures, trySignup, serverFailure]
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
  
  
  
  const sexOptions = useMemo(
    ()=>[
      {
        value: 'MALE',
        text: uiOptions.iAmGuy[0].text,
      },{
        value: 'FEMALE',
        text: uiOptions.iAmGirl[0].text,
      }
    ] satisfies { value: FormValues['sex'], text: string }[],
    [uiOptions]
  )
  
  
  const validationProps = {
    values: signupForm,
    failures: signupFailures,
    setError: setSignupFailures,
    setValues: setSignupForm,
  }
  
  
  const pageRef = useRef<HTMLElement>(null)
  
  
  
  
  useEffect(()=>{
    if (signupSuccess) {
      navigate(returnPath ?? RootRoute.findPairs[full]())
    }
  },[signupSuccess, navigate, returnPath])
  
  
  
  
  return <>
    <Page
      ref={pageRef}
    >
      
      <Form onSubmit={onSubmit}>
        
        <h3 css={formHeader}>
          {uiOptions.registration[0].text}
        </h3>
        
        
        
        <ValidationComponentWrap {...validationProps}
          fieldName='email'
          render={props => <Input
            css={InputStyle.inputNormal}
            placeholder={uiOptions.emailLoginPlaceholder[0].text}
            {...props.inputProps}
            hasError={props.highlight}
          />}
        />
        
        <ValidationComponentWrap {...validationProps}
          fieldName='pwd'
          render={props => <PwdInput
            css={InputStyle.inputNormal}
            placeholder={uiOptions.pwdPlaceholder[0].text}
            {...props.inputProps}
            hasError={props.highlight}
          />}
        />
        
        <ValidationComponentWrap {...validationProps}
          fieldName='repeatPwd'
          render={props => <PwdInput
            css={InputStyle.inputNormal}
            placeholder={uiOptions.repeatPwdPlaceholder[0].text}
            {...props.inputProps}
            hasError={props.highlight}
          />}
        />
        
        <ValidationComponentWrap {...validationProps}
          fieldName='name'
          render={props => <Input
            css={InputStyle.inputNormal}
            placeholder={uiOptions.namePlaceholder[0].text}
            {...props.inputProps}
            hasError={props.highlight}
          />}
        />
        
        <ValidationComponentWrap {...validationProps}
          fieldName='birthDate'
          render={props => <Input
            css={InputStyle.inputNormal}
            placeholder={uiOptions.birthDatePlaceholder[0].text}
            {...props.inputProps}
            hasError={props.highlight}
          />}
        />
        
        
        <ValidationComponentWrap {...validationProps}
          fieldName='sex'
          render={props =>
            <RadioInputGroup css={RadioInputGroupStyle.rowGroup}
              hasError={props.highlight}
            >
              { sexOptions.map(opt=>{
                return <RadioInput
                  css={RadioInputStyle.radio}
                  key={opt.value}
                  checked={props.value===opt.value}
                  value={opt.value}
                  onChange={props.inputProps.onChange}
                >
                  {opt.text}
                </RadioInput>
              }) }
            </RadioInputGroup>}
        />
        
        
        <Button
          css={ButtonStyle.bigRectPrimary}
          type='submit'
        >
          {uiOptions.signup[0].text}
        </Button>
        
      </Form>
      
    </Page>
    
    
    
    <PageScrollbarOverlayFrame>
      <UseScrollbars
        containerIsWindow={true}
        contentRef={pageRef}
        render={(
          { canScrollVertical, canScrollHorizontal, ...scrollbarProps }
        )=><ScrollbarOverlay css={ScrollbarOverlayStyle.page}
          {...scrollbarProps}
          showVertical={canScrollVertical}
          showHorizontal={canScrollHorizontal}
        />}
      />
    </PageScrollbarOverlayFrame>
    
    <SettingsBottomButtonBar />
    
    
  </>
}
export default ReactMemoTyped(SignupPage)






const Form = styled.form`
  max-width: 500px;
  width: 100%;
  ${col};
  gap: 16px;
`

const formHeader = (t: Themes.Theme) => css`
  font: 500 28px/150% Roboto;
  letter-spacing: 0.05em;
  color: ${t.page.text[0]};
  align-self: center;
`
