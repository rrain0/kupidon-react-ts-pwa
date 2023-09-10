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
import { useStateAndRef } from '../../utils-react/useStateAndRef';
import trueOrUndef = Utils.trueOrUndef;
import { useToastFailures } from '../../toasts/useToastFailures';
import RootRoutes = AppRoutes.RootRoutes;
import { SimpleGradientBgc } from '../../styles/bgc/SimpleGradientBgc';
import { PinkGrainyGradientBgc } from '../../styles/bgc/PinkGrainyGradientBgc';
import { themeNameFromState, ThemeRecoil } from '../../recoil/state/ThemeRecoil';




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
  
  const [theme, setTheme] = useRecoilState(ThemeRecoil)
  let themeName = themeNameFromState(theme)
  if (themeName==='Light Pink') themeName = 'Light Pink 2'
  if (themeName==='Dark') themeName = 'Dark 2'
  const themeObj = Theme.themeByName(themeName)!
  
  
  
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
  const [enableCard, setEnableCard] = useState(true)
  
  return <ThemeProvider theme={themeObj}><Page>
    <div
      css={css`
        position: fixed;
        top: 0; left: 0;
        padding: 10px;
        gap: 10px;
        ${row};
        place-items: start;
        z-index: 1;
      `}
    >
      <button onClick={()=>setEnableCard(!enableCard)}>Включить карточку</button>
    </div>
    <div
      css={t=>css`
        ${ enableCard
          ? center
          : css`display: contents;`
        }
        background: ${t.page.bgc[1]}77;
        padding: 20px;
        border-radius: 16px;
        margin: -20px;
      `}
    >
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
        data-error={trueOrUndef(signupFailure.find(f=>f.fields.includes('sex'))?.highlightNow)}>
        
        <RadioInputValidationWrap
          {...validationProps}
          fieldName={'sex'}
          errorPropName={'hasError'} // todo
        >
          <RadioInput
            css={RadioInputStyle.input}
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
            css={RadioInputStyle.input}
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
    </div>
    
  </Page></ThemeProvider>
}

export default SignupPage




const Page = styled.main`
  width: 100%;
  min-height: 100%; height: fit-content;
  ${center};
  padding: 32px;
  ${p=>PinkGrainyGradientBgc(p.theme)};
`


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