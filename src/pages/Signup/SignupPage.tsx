/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import { PageScrollbarOverlayFrame } from 'src/components/Page/PageScrollbarOverlayFrame'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import UseScrollbars from 'src/components/Scrollbars/UseScrollbars'
import { SignupPageUiOptions } from 'src/pages/Signup/SignupPageUiOptions'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import React, {
  useCallback,
  useEffect,
  useId,
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
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import { useUiOptionsContainer } from 'src/utils/lang/useUiOptions'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import { ToastMsg, ToastMsgData, useToasts } from 'src/utils/toasts/useToasts'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
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
import { useContainerScrollState } from 'src/views/Scrollbar/useContainerScrollState'
import validate = ValidationValidate.validate
import { SignupPageValidation } from './validation'
import FormValues = SignupPageValidation.FormValues
import validators = SignupPageValidation.validators
import { ValidationActions } from 'src/utils/form-validation/ValidationActions'
import updateFailures = ValidationActions.updateFailures
import CreateUserRespE = UserApi.CreateUserRespE
import { Utils } from 'src/utils/common/Utils'
import { ValidationComponents, } from 'src/utils/form-validation/ValidationComponents'
import InputValidationWrap = ValidationComponents.InputValidationWrap
import UserToCreate = UserApi.UserToCreate
import RadioInputValidationWrap = ValidationComponents.RadioInputValidationWrap
import { AuthApi } from 'src/api/requests/AuthApi'
import Lazy = Utils.Lazy
import { Pages } from 'src/components/Page/Pages'
import Page = Pages.Page
import GearIc = SimpleSvgIcons.GearIc
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import full = RouteBuilder.full
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import UserValues = SignupPageValidation.UserValues
import Failure = ValidationCore.Failure
import awaitDelay = ValidationActions.awaitDelay
import mapFailureCodeToUiOption = SignupPageValidation.mapFailureCodeToUiOption
import RadioInputGroupValidationWrap = ValidationComponents.RadioInputGroupValidationWrap
import ReactMemoTyped = ReactUtils.ReactMemoTyped




export const SignupDefaults = function(){
  const defaultValues = new Lazy<FormValues>(()=>({
    email: '',
    pwd: '',
    repeatPwd: '',
    firstName: '',
    lastName: '',
    sex: '',
    birthDate: '',
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




const SignupPage = () => {
  
  const id = useId()
  
  const [searchParams] = useSearchParams()
  const returnPath = searchParams.get(RootRoute.signup[params].returnPath) ?? undefined
  const navigate = useNavigate()
  
  const setAuth = useSetRecoilState(AuthRecoil)
  
  const uiOptions = useUiOptionsContainer(SignupPageUiOptions)
  
  const [signupLoading, setSignupLoading] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [signupForm, setSignupForm] = 
    useState([SignupDefaults.values,SignupDefaults.values] as const) // [now,prev]
  const [signupFailures, setSignupFailures] = useState(SignupDefaults.failures)
  // LayoutEffect is necessary to update data when making Chrome mobile autofill
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
      setSignupResponse(undefined)
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
    msg: <ToastMsg uiOption={SignupPageUiOptions.registration}/>,
    closeOnUnmount: true,
  }))
  const [loginSuccessMsg] = useState(()=>new ToastMsgData({
    type: 'ok',
    msg: <ToastMsg uiOption={SignupPageUiOptions.registrationCompleted}/>,
    lifetime: 1500,
    dragToClose: true,
  }))
  useToasts({
    data: [
      userFailureMsg,
      signupLoading && loadingMsg,
      signupSuccess && loginSuccessMsg,
      serverFailureMsg,
    ],
  })
  
  
  
  
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
  
  
  
  const validationProps = {
    values: signupForm,
    validators: validators,
    failures: signupFailures,
    setError: setSignupFailures,
    setValues: setSignupForm,
  }
  
  const [settingsOpen, setSettingsOpen] = useState(false)
  
  const pageRef = useRef<HTMLElement>(null)
  
  
  
  
  useEffect(()=>{
    if (signupSuccess) {
      navigate(returnPath ?? RootRoute.main[full]())
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
        
        <InputValidationWrap
          {...validationProps}
          fieldName={'email'}
          errorPropName={'hasError'}
        >
          <Input
            css={InputStyle.input}
            placeholder={uiOptions.emailLoginPlaceholder[0].text}
          />
        </InputValidationWrap>
        
        <InputValidationWrap
          {...validationProps}
          fieldName={'pwd'}
          errorPropName={'hasError'}
        >
          <PwdInput
            css={InputStyle.input}
            placeholder={uiOptions.pwdPlaceholder[0].text}
          />
        </InputValidationWrap>
        
        <InputValidationWrap
          {...validationProps}
          fieldName={'repeatPwd'}
          errorPropName={'hasError'}
        >
          <PwdInput
            css={InputStyle.input}
            placeholder={uiOptions.repeatPwdPlaceholder[0].text}
          />
        </InputValidationWrap>
        
        <InputValidationWrap
          {...validationProps}
          fieldName={'firstName'}
          errorPropName={'hasError'}
        >
          <Input
            css={InputStyle.input}
            placeholder={uiOptions.namePlaceholder[0].text}
          />
        </InputValidationWrap>
        
        <InputValidationWrap
          {...validationProps}
          fieldName={'lastName'}
          errorPropName={'hasError'}
        >
          <Input
            css={InputStyle.input}
            placeholder={uiOptions.lastNamePlaceholder[0].text}
          />
        </InputValidationWrap>
        
        <InputValidationWrap
          {...validationProps}
          fieldName={'birthDate'}
          errorPropName={'hasError'}
        >
          <Input
            css={InputStyle.input}
            placeholder={uiOptions.birthDatePlaceholder[0].text}
          />
        </InputValidationWrap>
        
        
        <RadioInputGroupValidationWrap
          {...validationProps}
          fieldName={'sex'}
          errorPropName={'hasError'}
        >
          <RadioInputGroup css={RadioInputGroupStyle.style}>
            
            <RadioInputValidationWrap
              {...validationProps}
              fieldName={'sex'}
              errorPropName={'hasError'}
            >
              <RadioInput
                css={RadioInputStyle.radio}
                name={`${id}-radio-group-sex`}
                value="MALE"
              >
                <div>{uiOptions.iAmGuy[0].text}</div>
              </RadioInput>
            </RadioInputValidationWrap>
            
            <RadioInputValidationWrap
              {...validationProps}
              fieldName={'sex'}
              errorPropName={'hasError'}
            >
              <RadioInput
                css={RadioInputStyle.radio}
                name={`${id}-radio-group-sex`}
                value="FEMALE"
              >
                <div>{uiOptions.iAmGirl[0].text}</div>
              </RadioInput>
            </RadioInputValidationWrap>
          
          </RadioInputGroup>
        </RadioInputGroupValidationWrap>
        
        
        <Button
          css={ButtonStyle.bigRectPrimary}
          type='submit'
        >
          {uiOptions.signup[0].text}
        </Button>
        
      </Form>
      
      
      
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
      
      <BottomButtonBar>
        <Button css={ButtonStyle.iconTransparent}
          onClick={() => setSettingsOpen(true)}
        >
          <GearIc/>
        </Button>
      </BottomButtonBar>
      
    </Page>
    
    
    <QuickSettings open={settingsOpen} setOpen={setSettingsOpen}/>
    
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
