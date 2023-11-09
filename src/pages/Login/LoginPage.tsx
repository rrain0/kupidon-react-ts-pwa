/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useCallback, useEffect, useRef} from 'react'
import { AuthApi } from 'src/api/requests/AuthApi'
import { useSetRecoilState } from 'recoil'
import { useApiRequest } from 'src/api/useApiRequest'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { PageScrollbarOverlayFrame } from 'src/components/Page/PageScrollbarOverlayFrame'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import UseScrollbars from 'src/components/Scrollbars/UseScrollbars'
import SettingsBottomButtonBar from 'src/components/BottomButtonBar/SettingsBottomButtonBar'
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
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import { Themes } from 'src/utils/theme/Themes'
import { LoginPageValidation } from './validation'
import FormValues = LoginPageValidation.FormValues
import validators = LoginPageValidation.validators
import { Pages } from 'src/components/Page/Pages'
import Page = Pages.Page
import full = RouteBuilder.full
import RootRoute = AppRoutes.RootRoute
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import params = RouteBuilder.params
import ReactMemoTyped = ReactUtils.Mem
import mapFailureCodeToUiOption = LoginPageValidation.mapFailureCodeToUiText
import defaultValues = LoginPageValidation.defaultValues








const LoginPage = () => {
  
  const [searchParams] = useSearchParams()
  const returnPath = searchParams.get(RootRoute.login[params].returnPath) ?? undefined
  const navigate = useNavigate()
  
  const setAuth = useSetRecoilState(AuthRecoil)
  
  const uiText = useUiTextContainer(LoginPageUiText)
  
  
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
    setValues: setFormValues,
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
  
  useEffect(
    ()=>{
      if (isSuccess && response && 'data' in response){
        setAuth(response.data)
      }
    },
    [isSuccess, response, setAuth]
  )
  
  const {
    canSubmit,
    onFormSubmitCallback,
    submit,
  } = useFormSubmit({
    failures,
    setFailures,
    failedFields,
    setFormValues,
    getCanSubmit: useCallback(
      (failedFields: (keyof FormValues)[]) => {
        return failedFields
          .filter(ff=>ff!=='fromServer')
          .length===0
      },
      []
    ),
    request,
    isLoading,
    isError,
    response,
    resetResponse,
  })
  
  
  
  
  
  useFormToasts({
    isLoading,
    loadingText: LoginPageUiText.loggingIn,
    isSuccess,
    successText: LoginPageUiText.loginCompleted,
    failures: failures,
    setFailures: setFailures,
    failureCodeToUiText: mapFailureCodeToUiOption,
  })
  
  
  
  
  
  
  
  
  
  
  const pageRef = useRef<HTMLElement>(null)
  
  useEffect(()=>{
    if (isSuccess) {
      navigate(returnPath ?? RootRoute.findPairs[full]())
    }
  },[isSuccess, navigate, returnPath])
  
  
  
  return <>
    <Page
      ref={pageRef}
    >
  
      <Form onSubmit={onFormSubmitCallback}>
        
        <h3 css={formHeader}>
          {uiText.login[0].text}
        </h3>
        
        
        
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

