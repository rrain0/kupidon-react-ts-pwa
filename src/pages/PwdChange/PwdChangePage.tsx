/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useCallback, useEffect, useRef } from 'react'
import { UserApi } from 'src/api/requests/UserApi'
import { useApiRequest } from 'src/api/useApiRequest'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/components/BottomButtonBar/TopButtonBar'
import Form from 'src/components/FormElements/Form'
import FormHeader from 'src/components/FormElements/FormHeader'
import ItemContainer from 'src/components/FormElements/ItemContainer'
import ItemLabel from 'src/components/FormElements/ItemLabel'
import ItemTitleContainer from 'src/components/FormElements/ItemTitleContainer'
import { Pages } from 'src/components/Page/Pages'
import PageScrollbars from 'src/components/Scrollbars/PageScrollbars'
import { PwdChangeUiText } from 'src/pages/PwdChange/uiText'
import { PwdChangePageValidation } from 'src/pages/PwdChange/validation'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { useFormFailures } from 'src/utils/form-validation/form/useFormFailures'
import { useFormSubmit } from 'src/utils/form-validation/form/useFormSubmit'
import { useFormToasts } from 'src/utils/form-validation/form/useFormToasts'
import ValidationComponentWrap from 'src/utils/form-validation/ValidationComponentWrap'
import { useUiTextContainer } from 'src/utils/lang/useUiText'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import Card from 'src/views/Card'
import { InputStyle } from 'src/views/Inputs/Input/InputStyle'
import PwdInput from 'src/views/Inputs/PwdInput/PwdInput'
import col = EmotionCommon.col
import Page = Pages.Page
import defaultValues = PwdChangePageValidation.defaultValues
import validators = PwdChangePageValidation.validators
import FormValues = PwdChangePageValidation.FormValues
import userDefaultValues = PwdChangePageValidation.userDefaultValues
import mapFailureCodeToUiText = PwdChangePageValidation.mapFailureCodeToUiText







const PwdChangePage =
React.memo(
()=>{
  
  const uiText = useUiTextContainer(PwdChangeUiText)
  
  
  
  
  
  const {
    formValues, setFormValues,
    failures, setFailures,
    failedFields, validationProps,
  } = useFormFailures({
    defaultValues, validators
  })
  
  const {
    request, isLoading,
    isSuccess, isError, isImmediate,
    response, resetResponse,
  } = useApiRequest({
    values: formValues,
    failedFields,
    prepareAndRequest: useCallback(
      (values: FormValues,failedFields: (keyof FormValues)[])=>{
        return UserApi.update({
          currentPwd: values.currentPwd,
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
    request, isLoading,
    isError, response,
    resetResponse,
  })
  
  
  
  
  
  
  useEffect(
    ()=>{
      if (isSuccess && isImmediate
        && response && 'data' in response
      ){
        const used = response.usedValues
        if ('pwd' in used){
          if (formValues.currentPwd===used.currentPwd)
            setFormValues(s=>({ ...s, currentPwd: defaultValues.currentPwd }))
          if (formValues.pwd===used.pwd)
            setFormValues(s=>({ ...s, pwd: defaultValues.pwd }))
          if (formValues.repeatPwd===used.pwd)
            setFormValues(s=>({ ...s, repeatPwd: defaultValues.repeatPwd }))
        }
      }
    },
    [isSuccess, response, formValues, setFormValues]
  )
  
  
  
  
  
  
  useFormToasts({
    isLoading,
    loadingText: PwdChangeUiText.update,
    isSuccess,
    successText: PwdChangeUiText.updated,
    failures: failures,
    setFailures: setFailures,
    failureCodeToUiText: mapFailureCodeToUiText,
  })
  
  
  
  /* useEffect(()=>{
    console.log('PWD_CHANGE_FAILURES',failures)
  },[failures]) */
  
  
  
  
  
  
  return <>
    
    <Page>
      <Form onSubmit={onFormSubmitCallback}>
        
        <FormHeader>{uiText.changePwd[0].text}</FormHeader>
        
        
        
        <Card>
          
          
          
          
          <ItemContainer>
            <ItemTitleContainer>
              <ItemLabel>{uiText.currentPwd[0].text}</ItemLabel>
            </ItemTitleContainer>
            <ValidationComponentWrap {...validationProps}
              fieldName='currentPwd'
              render={props => <PwdInput
                css={InputStyle.inputSmall}
                placeholder={uiText.currentPwdPlaceholder[0].text}
                {...props.inputProps}
                hasError={props.highlight}
              />}
            />
          </ItemContainer>
          
          
          
          
          <ItemContainer>
            <ItemTitleContainer>
              <ItemLabel>{uiText.newPwd[0].text}</ItemLabel>
            </ItemTitleContainer>
            <ValidationComponentWrap {...validationProps}
              fieldName='pwd'
              render={props => <PwdInput
                css={InputStyle.inputSmall}
                placeholder={uiText.newPwdPlaceholder[0].text}
                {...props.inputProps}
                hasError={props.highlight}
              />}
            />
          </ItemContainer>
          
          
          
          
          <ItemContainer>
            <ItemTitleContainer>
              <ItemLabel>{uiText.repeatPwd[0].text}</ItemLabel>
            </ItemTitleContainer>
            <ValidationComponentWrap {...validationProps}
              fieldName='repeatPwd'
              render={props => <PwdInput
                css={InputStyle.inputSmall}
                placeholder={uiText.repeatPwdPlaceholder[0].text}
                {...props.inputProps}
                hasError={props.highlight}
              />}
            />
          </ItemContainer>
          
          
          
        
        </Card>
        
        
        
        
        
        <div css={notInCard}>
          <Button css={ButtonStyle.bigRectMain}
            type='submit'
          >
            {uiText.doChangePwd[0].text}
          </Button>
        </div>
        
        <div css={notInCard}>
          <Button css={ButtonStyle.bigRectAccent}
            disabled
          >
            {uiText.pwdRecovery[0].text}
          </Button>
        </div>
      
      </Form>
      
      
      <PageScrollbars />
    </Page>
    
    
    <TopButtonBar backBtn/>
    
    <BottomButtonBar settingsBtn/>
    
    
  </>
})
export default PwdChangePage






const notInCard = css`
  ${col};
  gap: inherit;
  padding: 0 12px;
`