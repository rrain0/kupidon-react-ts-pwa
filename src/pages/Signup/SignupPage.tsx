/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import center = EmotionCommon.center
import { css, ThemeProvider } from '@emotion/react'
import col = EmotionCommon.col
import React, { useEffect, useId, useLayoutEffect, useMemo, useState } from 'react'
import { AxiosError } from 'axios'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { UserApi } from 'src/api/requests/UserApi'
import { InputStyle } from 'src/components/Inputs/InputStyle'
import Input from 'src/components/Inputs/Input'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { ButtonStyle } from 'src/components/Buttons/ButtonStyle'
import Button from 'src/components/Buttons/Button'
import PwdInput from 'src/components/Inputs/PwdInput'
import { Theme } from 'src/theme/Theme'
import row = EmotionCommon.row
import reset = EmotionCommon.reset
import RadioInput from 'src/components/Inputs/RadioInput'
import { RadioInputStyle } from 'src/components/Inputs/RadioInputStyle'
import { ValidationValidate } from 'src/form-validation/ValidationValidate'
import { CastUtils } from 'src/utils/CastUtils'
import validate = ValidationValidate.validate
import { SignupPageValidation } from './validation'
import FormValues = SignupPageValidation.FormValues
import validators = SignupPageValidation.validators
import { toast } from 'react-toastify';
import { ValidationActions } from 'src/form-validation/ValidationActions'
import updateFailures = ValidationActions.updateFailures
import CreateUserRespE = UserApi.CreateUserRespE
import { useFailureDelay } from 'src/form-validation/useFailureDelay'
import { Toasts } from 'src/toasts/Toasts'
import { Utils } from 'src/utils/Utils'
import { ValidationComponents } from 'src/form-validation/ValidationComponents'
import InputValidationWrap = ValidationComponents.InputValidationWrap;
import UserToCreate = UserApi.UserToCreate
import RadioInputValidationWrap = ValidationComponents.RadioInputValidationWrap
import { AuthApi } from 'src/api/requests/AuthApi'
import Lazy = Utils.Lazy
import { useToastFailures } from 'src/toasts/useToastFailures'
import RootRoutes = AppRoutes.RootRoutes
import { FormPage } from 'src/components/Page/FormPage'
import Page = FormPage.Page;
import ScrollbarOverlay from 'src/components/ScrollbarOverlay/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/ScrollbarOverlay/ScrollbarOverlayStyle'
import PageContent = FormPage.PageContent
import trueOrUndef = CastUtils.trueOrUndef




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
  //@ts-ignore
  const returnPath = searchParams.get(RootRoutes.signup.params.returnPath) ?? undefined
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
      navigate(returnPath ?? RootRoutes.main.fullPath())
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
  
  
  return <Page>
    <ScrollbarOverlay css={ScrollbarOverlayStyle.page}>
      <PageContent>
        <Form onSubmit={onSubmit}>
          
          <h3 css={formHeader}>Регистрация</h3>
          
          <InputValidationWrap
            {...validationProps}
            fieldName={'email'}
            errorPropName={'hasError'} // todo
          >
            <Input
              css={InputStyle.input}
              placeholder='email (логин)'
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
          
          <InputValidationWrap
            {...validationProps}
            fieldName={'repeatPwd'}
            errorPropName={'hasError'} // todo
          >
            <PwdInput
              css={InputStyle.input}
              placeholder='повторите пароль'
            />
          </InputValidationWrap>
          
          <InputValidationWrap
            {...validationProps}
            fieldName={'firstName'}
            errorPropName={'hasError'} // todo
          >
            <Input
              css={InputStyle.input}
              placeholder='имя'
            />
          </InputValidationWrap>
          
          <InputValidationWrap
            {...validationProps}
            fieldName={'lastName'}
            errorPropName={'hasError'} // todo
          >
            <Input
              css={InputStyle.input}
              placeholder='фамилия'
            />
          </InputValidationWrap>
          
          <InputValidationWrap
            {...validationProps}
            fieldName={'birthDate'}
            errorPropName={'hasError'} // todo
          >
            <Input
              css={InputStyle.input}
              placeholder='день рождения (гггг-ММ-дд) (2002-01-01)'
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
                <div>Я парень</div>
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
                <div>Я девушка</div>
              </RadioInput>
            </RadioInputValidationWrap>
            
          </fieldset>
          
          <Button
            css={ButtonStyle.primary}
            type='submit'>
            Зарегистрироваться
          </Button>
          
        </Form>
      </PageContent>
    </ScrollbarOverlay>
  </Page>
}

export default SignupPage






const Form = styled.form`
  max-width: 500px;
  width: 100%;
  ${col};
  gap: 16px;
`

const formHeader = (t: Theme.Theme) => css`
  font: 500 28px/150% Roboto;
  letter-spacing: 0.05em;
  color: ${t.page.text[0]};
  align-self: center;
`

const radioGroupCss = (t: Theme.Theme) => css`
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