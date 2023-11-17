/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useApiRequest } from 'src/api/useApiRequest'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import Form from 'src/components/FormElements/Form'
import FormHeader from 'src/components/FormElements/FormHeader'
import { PageScrollbarOverlayFrame } from 'src/components/Page/PageScrollbarOverlayFrame'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import UseScrollbars from 'src/components/Scrollbars/UseScrollbars'
import { SignupPageUiText } from 'src/pages/Signup/uiText'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { useSetRecoilState } from 'recoil'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UserApi } from 'src/api/requests/UserApi'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { DateTime } from 'src/utils/DateTime'
import { useFormFailures } from 'src/utils/form-validation/form/useFormFailures'
import { useFormSubmit } from 'src/utils/form-validation/form/useFormSubmit'
import { useFormToasts } from 'src/utils/form-validation/form/useFormToasts'
import ValidationComponentWrap from 'src/utils/form-validation/ValidationComponentWrap'
import { useUiTextContainer } from 'src/utils/lang/useUiText'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
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
import { SignupPageValidation } from './validation'
import FormValues = SignupPageValidation.FormValues
import validators = SignupPageValidation.validators
import { Pages } from 'src/components/Page/Pages'
import Page = Pages.Page
import RootRoute = AppRoutes.RootRoute
import params = RouteBuilder.params
import full = RouteBuilder.full
import mapFailureCodeToUiOption = SignupPageValidation.mapFailureCodeToUiText
import Mem = ReactUtils.Mem
import defaultValues = SignupPageValidation.defaultValues
import userDefaultValues = SignupPageValidation.userDefaultValues
import GenderEnum = UserApi.GenderEnum






const SignupPage = () => {
  
  const [searchParams] = useSearchParams()
  const returnPath = searchParams.get(RootRoute.signup[params].returnPath) ?? undefined
  const navigate = useNavigate()
  
  const setAuth = useSetRecoilState(AuthRecoil)
  
  const uiText = useUiTextContainer(SignupPageUiText)
  
  
  const {
    formValues,
    setFormValues,
    failures,
    setFailures,
    failedFields,
    validationProps,
  } = useFormFailures({
    defaultValues,
    validators
  })
  
  const {
    request,
    isLoading,
    isSuccess,
    isError,
    response,
    resetResponse,
  } = useApiRequest({
    values: formValues,
    failedFields,
    prepareAndRequest: useCallback(
      (values: FormValues)=>{
        const birthDateTime = DateTime.from_yyyy_MM_dd(values.birthDate)!
          .set({ timezone: DateTime.fromDate(new Date()).timezone})
          .to_yyyy_MM_dd_HH_mm_ss_SSS_XXX()
        return UserApi.create({
          email: values.email,
          pwd: values.pwd,
          name: values.name,
          gender: values.gender as GenderEnum,
          birthDate: birthDateTime,
        })
      },
      []
    )
  })
  
  useEffect(
    ()=>{
      if (isSuccess && response && Object.hasOwn(response,'data')){
        setAuth(response.data)
      }
    },
    [isSuccess, response, setAuth]
  )
  
  const {
    canSubmit, onFormSubmitCallback, submit,
  } = useFormSubmit({
    failures, setFailures,
    failedFields, setFormValues,
    getCanSubmit: useCallback(
      (failedFields: (keyof FormValues)[]) => {
        return failedFields
          .filter(ff=>Object.hasOwn(userDefaultValues,ff))
          .length===0
      },
      []
    ),
    request,
    isLoading, isError,
    response, resetResponse,
  })
  
  
  
  
  
  useFormToasts({
    isLoading,
    loadingText: SignupPageUiText.registration,
    isSuccess,
    successText: SignupPageUiText.registrationCompleted,
    failures: failures,
    setFailures: setFailures,
    failureCodeToUiText: mapFailureCodeToUiOption,
  })
  
  
  
  
  
  /* useEffect(()=>{
    console.log('SIGNUP_FAILURES',failures)
  },[failures]) */
  
  
  
  
  
  
  
  
  
  
  
  const genderOptions = useMemo(
    ()=>[
      {
        value: 'MALE',
        text: uiText.iAmGuy[0].text,
      },{
        value: 'FEMALE',
        text: uiText.iAmGirl[0].text,
      }
    ] satisfies { value: GenderEnum, text: string }[],
    [uiText]
  )
  
  
  
  
  const pageRef = useRef<HTMLElement>(null)
  
  
  
  
  useEffect(()=>{
    if (isSuccess) {
      navigate(returnPath ?? RootRoute.findPairs[full]())
    }
  },[isSuccess, navigate, returnPath])
  
  
  
  
  return <>
    <Page ref={pageRef}>
      
      <Form onSubmit={onFormSubmitCallback}>
        
        <FormHeader>{uiText.registration[0].text}</FormHeader>
        
        
        
        <ValidationComponentWrap {...validationProps}
          fieldName='email'
          render={props => <Input
            css={InputStyle.inputNormal}
            placeholder={uiText.emailLoginPlaceholder[0].text}
            {...props.inputProps}
            hasError={props.highlight}
          />}
        />
        
        <ValidationComponentWrap {...validationProps}
          fieldName='pwd'
          render={props => <PwdInput
            css={InputStyle.inputNormal}
            placeholder={uiText.pwdPlaceholder[0].text}
            {...props.inputProps}
            hasError={props.highlight}
          />}
        />
        
        <ValidationComponentWrap {...validationProps}
          fieldName='repeatPwd'
          render={props => <PwdInput
            css={InputStyle.inputNormal}
            placeholder={uiText.repeatPwdPlaceholder[0].text}
            {...props.inputProps}
            hasError={props.highlight}
          />}
        />
        
        <ValidationComponentWrap {...validationProps}
          fieldName='name'
          render={props => <Input
            css={InputStyle.inputNormal}
            placeholder={uiText.namePlaceholder[0].text}
            {...props.inputProps}
            hasError={props.highlight}
          />}
        />
        
        <ValidationComponentWrap {...validationProps}
          fieldName='birthDate'
          render={props => <Input
            css={InputStyle.inputNormal}
            placeholder={uiText.birthDatePlaceholder[0].text}
            {...props.inputProps}
            hasError={props.highlight}
          />}
        />
        
        
        <ValidationComponentWrap {...validationProps}
          fieldName='gender'
          render={props =>
            <RadioInputGroup css={RadioInputGroupStyle.rowGroup}
              hasError={props.highlight}
            >
              { genderOptions.map(opt=>{
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
          {uiText.signup[0].text}
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
    
    <BottomButtonBar settingsBtn />
    
    
  </>
}
export default Mem(SignupPage)





