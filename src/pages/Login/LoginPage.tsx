/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useRef} from 'react'
import { AuthApi } from 'src/api/requests/AuthApi'
import { useSetRecoilState } from 'recoil'
import { useApiRequest } from 'src/api/useApiRequest'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/components/BottomButtonBar/TopButtonBar'
import Form from 'src/components/FormElements/Form'
import FormHeader from 'src/components/FormElements/FormHeader'
import { PageScrollbarOverlayFrame } from 'src/components/Page/PageScrollbarOverlayFrame'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import UseScrollbars from 'src/components/Scrollbars/UseScrollbars'
import { LoginPageUiText } from 'src/pages/Login/uiText'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { useFormFailures } from 'src/utils/form-validation/form/useFormFailures'
import { useFormSubmit } from 'src/utils/form-validation/form/useFormSubmit'
import { useFormToasts } from 'src/utils/form-validation/form/useFormToasts'
import ValidationComponentWrap from 'src/utils/form-validation/ValidationComponentWrap'
import { useUiTextContainer } from 'src/utils/lang/useUiText'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import Button from 'src/views/Buttons/Button'
import Input from 'src/views/Inputs/Input/Input'
import PwdInput from 'src/views/Inputs/Input/PwdInput'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { InputStyle } from 'src/views/Inputs/Input/InputStyle'
import { LoginPageValidation } from './validation'
import FormValues = LoginPageValidation.FormValues
import validators = LoginPageValidation.validators
import { Pages } from 'src/components/Page/Pages'
import Page = Pages.Page
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import params = RouteBuilder.params
import Mem = ReactUtils.Mem
import mapFailureCodeToUiOption = LoginPageValidation.mapFailureCodeToUiText
import defaultValues = LoginPageValidation.defaultValues
import userDefaultValues = LoginPageValidation.userDefaultValues








const LoginPage = () => {
  
  const [searchParams] = useSearchParams()
  const returnPath = searchParams.get(RootRoute.login[params].returnPath) ?? undefined
  const navigate = useNavigate()
  
  const setAuth = useSetRecoilState(AuthRecoil)
  
  const uiText = useUiTextContainer(LoginPageUiText)
  
  
  const {
    formValues, setFormValues,
    failures, setFailures,
    failedFields, validationProps,
  } = useFormFailures({
    defaultValues, validators
  })
  
  const {
    request,
    isLoading, isSuccess, isError,
    response, resetResponse,
  } = useApiRequest({
    values: formValues,
    failedFields,
    prepareAndRequest: useCallback(
      (values: FormValues)=>{
        return AuthApi.login({
          login: values.login,
          pwd: values.pwd,
        })
      },
      []
    )
  })
  
  const {
    canSubmit, onFormSubmitCallback, submit,
  } = useFormSubmit({
    failures, setFailures,
    failedFields, setFormValues,
    getCanSubmit: useCallback(
      (failedFields: (keyof FormValues)[]) => {
        return failedFields
          .filter(ff=>ff in userDefaultValues)
          .length===0
      },
      []
    ),
    request,
    isLoading, isError,
    response, resetResponse,
  })
  
  
  
  useEffect(
    ()=>{
      if (isSuccess && response && Object.hasOwn(response,'data')){
        setAuth(response.data)
      }
    },
    [isSuccess, response, setAuth]
  )
  
  
  
  useFormToasts({
    isLoading,
    loadingText: LoginPageUiText.loggingIn,
    isSuccess,
    successText: LoginPageUiText.loginCompleted,
    failures: failures,
    setFailures: setFailures,
    failureCodeToUiText: mapFailureCodeToUiOption,
  })
  
  
  
  
  
  /* useEffect(()=>{
   console.log('LOGIN_FAILURES',failures)
  },[failures]) */
  
  
  
  
  
  const pageRef = useRef<HTMLElement>(null)
  
  useEffect(()=>{
    if (isSuccess) {
      navigate(returnPath ?? RootRoute.findPairs[full]())
    }
  },[isSuccess, navigate, returnPath])
  
  
  
  return <>
    <Page ref={pageRef}>
  
      <Form onSubmit={onFormSubmitCallback}>
        
        <FormHeader>{uiText.login[0].text}</FormHeader>
        
        
        
        <ValidationComponentWrap {...validationProps}
          fieldName='login'
          render={props => <Input
            css={InputStyle.inputNormal}
            placeholder={uiText.loginEmailPlaceholder[0].text}
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
        
        
        
        <Button
          css={ButtonStyle.bigRectPrimary}
          type="submit"
        >
          {uiText.doLogin[0].text}
        </Button>
        
        
        <Link to={RootRoute.signup[fullAllowedNameParams]({ returnPath: returnPath })}>
          <Button css={ButtonStyle.bigRectNormal}>
            {uiText.signup[0].text}
          </Button>
        </Link>
      
      </Form>
    
    
    </Page>
    
    
    <TopButtonBar backBtn/>
    
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
    
    <BottomButtonBar settingsBtn/>
    
  </>
}
export default Mem(LoginPage)

