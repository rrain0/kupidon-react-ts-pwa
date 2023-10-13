/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import { SignupPageUiOptions } from 'src/pages/Signup/SignupPageUiOptions'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { css } from '@emotion/react'
import col = EmotionCommon.col
import React, { useEffect, useId, useRef, useState } from 'react'
import { AxiosError } from 'axios'
import { useSetRecoilState } from 'recoil'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UserApi } from 'src/api/requests/UserApi'
import { useUiOptionsContainer } from 'src/utils/lang/useUiOptions'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import { InputStyle } from 'src/views/Inputs/InputStyle'
import Input from 'src/views/Inputs/Input'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import Button from 'src/views/Buttons/Button'
import PwdInput from 'src/views/Inputs/PwdInput'
import { Themes } from 'src/utils/theme/Themes'
import row = EmotionCommon.row
import reset = EmotionCommon.reset
import RadioInput from 'src/views/Inputs/RadioInput'
import { RadioInputStyle } from 'src/views/Inputs/RadioInputStyle'
import { ValidationValidate } from 'src/utils/react/form-validation/ValidationValidate'
import { CastUtils } from 'src/utils/common/CastUtils'
import { useContainerScrollState } from 'src/views/Scrollbar/useContainerScrollState'
import validate = ValidationValidate.validate
import { SignupPageValidation } from './validation'
import FormValues = SignupPageValidation.FormValues
import validators = SignupPageValidation.validators
import { toast } from 'react-toastify';
import { ValidationActions } from 'src/utils/react/form-validation/ValidationActions'
import updateFailures = ValidationActions.updateFailures
import CreateUserRespE = UserApi.CreateUserRespE
import { useFailureDelay } from 'src/utils/react/form-validation/useFailureDelay'
import { Toasts } from 'src/utils/toasts/Toasts'
import { Utils } from 'src/utils/common/Utils'
import { ValidationComponents } from 'src/utils/react/form-validation/ValidationComponents'
import InputValidationWrap = ValidationComponents.InputValidationWrap;
import UserToCreate = UserApi.UserToCreate
import RadioInputValidationWrap = ValidationComponents.RadioInputValidationWrap
import { AuthApi } from 'src/api/requests/AuthApi'
import Lazy = Utils.Lazy
import { useToastFailures } from 'src/utils/toasts/useToastFailures'
import { Pages } from 'src/components/Page/Pages'
import Page = Pages.Page
import trueOrUndef = CastUtils.trueOrUndef
import GearIc = SimpleSvgIcons.GearIc
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import full = RouteBuilder.full




export const SignupDefaults = function(){
  const defaultValues = new Lazy<FormValues>(()=>({
    email: '',
    pwd: '',
    repeatPwd: '',
    firstName: '',
    lastName: '',
    sex: '',
    birthDate: '',
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
  
  
  
  const [signupLoading, setSignupLoading] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [signupFailure, setSignupFailure] = useState(SignupDefaults.failures)
  const [signupForm, setSignupForm] = useState([SignupDefaults.values,SignupDefaults.values] as const) // [now,prev]
  
  
  
  const [signupResponse, setSignupResponse] = useState(
    undefined as undefined | { success?: AuthApi.LoginRespS, error?: any }
  )
  useEffect(()=>{
    if (signupResponse){
      const { success:s, error:e } = signupResponse
      if (s){
        setAuth(s.data)
        setSignupSuccess(true)
      } else if (e){
        setSignupSuccess(false)
        if (e instanceof AxiosError){
          if (e.code===AxiosError.ERR_NETWORK){
            setSignupFailure(
              validate({
                values: signupForm[0], prevValues: signupForm[1],
                outerValue: 'connection-error',
                prevFailures: signupFailure,
                validators: validators,
              })
            )
          } else if (e.response?.status===400){
            const err = e.response as CreateUserRespE
            setSignupFailure(
              validate({
                values: signupForm[0], prevValues: signupForm[1],
                outerValue: err.data.code,
                prevFailures: signupFailure,
                validators: validators,
              })
            )
          }
        } else {
          setSignupFailure(
            validate({
              values: signupForm[0], prevValues: signupForm[1],
              outerValue: 'unknown',
              prevFailures: signupFailure,
              validators: validators,
            })
          )
          console.warn('UNKNOWN ERROR',e)
        }
      }
      setSignupResponse(undefined)
    }
  },[signupResponse, signupSuccess, signupFailure, signupForm])
  
  
  // todo extract
  toast.onChange(toast=>{
    const id = toast.id
    if (typeof id === 'string' && id.startsWith('failure') && toast.status==='removed'){
      //console.log('closed id',id)
      setSignupFailure(
        updateFailures(signupFailure, { failureIds: [id] }, { notify: false })
      )
    }
  })
  
  
  useFailureDelay(signupFailure,setSignupFailure)
  
  useEffect(()=>{
    if (signupLoading) Toasts.Loading.show('Регистрация...')
    else toast.dismiss(Toasts.Loading.id)
    
    if (signupSuccess) {
      Toasts.SuccessSignIn.show('Пользователь успешно зарегистрирован')
      navigate(returnPath ?? RootRoute.main[full]())
    }
  },[signupLoading, signupSuccess, returnPath])
  
  
  useToastFailures(signupFailure)
  
  
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    
    const newFails = updateFailures(
      signupFailure.filter(f=>f.type==='format'),
      { failureIds:'all' },
      { highlight: true, notify: true, delay: 0 }
    )
    setSignupSuccess(false)
    setSignupFailure(newFails)
    
    if (newFails.length>0) return
    
    void trySignup()
  }
  
  const trySignup = async()=>{
    if (signupLoading) return
    setSignupLoading(true)
    try {
      const response = await UserApi.create(signupForm[0] as UserToCreate)
      setSignupResponse({ success: response })
    } catch (e){
      setSignupResponse({ error: e })
    } finally {
      setSignupLoading(false)
    }
  }
  
  const validationProps = {
    values: signupForm,
    validators: validators,
    failures: signupFailure,
    setError: setSignupFailure,
    setValues: setSignupForm,
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
  
  
  const uiOptions = useUiOptionsContainer(SignupPageUiOptions)
  
  return <>
    <Page
      ref={pageRef}
    >
      
      <Form onSubmit={onSubmit}>
        
        <h3 css={formHeader}>{uiOptions.registration[0].text}</h3>
        
        <InputValidationWrap
          {...validationProps}
          fieldName={'email'}
          errorPropName={'hasError'} // todo
        >
          <Input
            css={InputStyle.input}
            placeholder={uiOptions.emailLoginPlaceholder[0].text}
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
        
        <InputValidationWrap
          {...validationProps}
          fieldName={'repeatPwd'}
          errorPropName={'hasError'} // todo
        >
          <PwdInput
            css={InputStyle.input}
            placeholder={uiOptions.repeatPwdPlaceholder[0].text}
          />
        </InputValidationWrap>
        
        <InputValidationWrap
          {...validationProps}
          fieldName={'firstName'}
          errorPropName={'hasError'} // todo
        >
          <Input
            css={InputStyle.input}
            placeholder={uiOptions.namePlaceholder[0].text}
          />
        </InputValidationWrap>
        
        <InputValidationWrap
          {...validationProps}
          fieldName={'lastName'}
          errorPropName={'hasError'} // todo
        >
          <Input
            css={InputStyle.input}
            placeholder={uiOptions.lastNamePlaceholder[0].text}
          />
        </InputValidationWrap>
        
        <InputValidationWrap
          {...validationProps}
          fieldName={'birthDate'}
          errorPropName={'hasError'} // todo
        >
          <Input
            css={InputStyle.input}
            placeholder={uiOptions.birthDatePlaceholder[0].text}
          />
        </InputValidationWrap>
        
        
        
        <fieldset
          css={radioGroupCss}
          data-error={trueOrUndef(
            signupFailure.find(f=>f.fields.includes('sex'))?.highlightNow
          )}>
          
          <RadioInputValidationWrap
            {...validationProps}
            fieldName={'sex'}
            errorPropName={'hasError'} // todo
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
            errorPropName={'hasError'} // todo
          >
            <RadioInput
              css={RadioInputStyle.radio}
              name={`${id}-radio-group-sex`}
              value="FEMALE"
            >
              <div>{uiOptions.iAmGirl[0].text}</div>
            </RadioInput>
          </RadioInputValidationWrap>
          
        </fieldset>
        
        <Button
          css={ButtonStyle.bigRectPrimary}
          type='submit'
        >
          {uiOptions.signup[0].text}
        </Button>
        
      </Form>
      
      
      
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
          onClick={() => setSettingsOpen(true)}
        >
          <GearIc/>
        </Button>
      </BottomButtonBar>
      
    </Page>
    
    <QuickSettings open={settingsOpen} setOpen={setSettingsOpen}/>
    
  </>
}

export default SignupPage






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

const radioGroupCss = (t: Themes.Theme) => css`
  ${reset};
  height: 50px;
  width: 100%;
  ${row};
  gap: 32px;
  justify-content: start;
  align-items: center;
  border-radius: 15px;
  &[data-error]{
    background: ${t.input.error.bgc};
  }
`