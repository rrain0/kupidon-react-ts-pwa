/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { UserApi } from 'src/api/requests/UserApi'
import { useApiRequest } from 'src/api/useApiRequest'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import Form from 'src/components/FormElements/Form'
import FormHeader from 'src/components/FormElements/FormHeader'
import ItemContainer from 'src/components/FormElements/ItemContainer'
import ItemLabel from 'src/components/FormElements/ItemLabel'
import ItemTitleContainer from 'src/components/FormElements/ItemTitleContainer'
import ResetButton from 'src/components/FormElements/ResetButton'
import { Pages } from 'src/components/Page/Pages'
import { PageScrollbarOverlayFrame } from 'src/components/Page/PageScrollbarOverlayFrame'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import UseScrollbars from 'src/components/Scrollbars/UseScrollbars'
import { AccountSettingsUiText } from 'src/pages/AccountSettings/uiText'
import { AccountSettingsPageValidation } from 'src/pages/AccountSettings/validation'
import { AuthRecoil, AuthStateType } from 'src/recoil/state/AuthRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { DateTime } from 'src/utils/DateTime'
import { useFormFailures } from 'src/utils/form-validation/form/useFormFailures'
import { useFormSubmit } from 'src/utils/form-validation/form/useFormSubmit'
import { useFormToasts } from 'src/utils/form-validation/form/useFormToasts'
import ValidationComponentWrap from 'src/utils/form-validation/ValidationComponentWrap'
import { useUiTextContainer } from 'src/utils/lang/useUiText'
import { formSubmitPreventDefault } from 'src/utils/react/formSubmitPreventDefault'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import Card from 'src/views/Card'
import DataField from 'src/views/DataField/DataField'
import { DataFieldStyle } from 'src/views/DataField/DataFieldStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import Input from 'src/views/Inputs/Input/Input'
import { InputStyle } from 'src/views/Inputs/Input/InputStyle'
import PwdInput from 'src/views/Inputs/Input/PwdInput'
import FloppyDisk1Ic = SimpleSvgIcons.FloppyDisk1Ic
import col = EmotionCommon.col
import textSmall1 = EmotionCommon.textSmall2
import Page = Pages.Page
import Mem = ReactUtils.Mem
import FormValues = AccountSettingsPageValidation.FormValues
import UserToUpdate = UserApi.UserToUpdate
import userDefaultValues = AccountSettingsPageValidation.userDefaultValues
import ObjectKeys = ObjectUtils.ObjectKeys
import validators = AccountSettingsPageValidation.validators
import defaultValues = AccountSettingsPageValidation.defaultValues
import mapFailureCodeToUiText = AccountSettingsPageValidation.mapFailureCodeToUiText







const AccountSettingsPage = ()=>{
  
  const uiText = useUiTextContainer(AccountSettingsUiText)
  
  const [auth,setAuth] = useRecoilState(AuthRecoil)
  const resetAuth = useResetRecoilState(AuthRecoil)
  
  
  const fetchUser = async() => {
    const resp = await UserApi.current()
    if (resp.success)
      setAuth(curr=>({ ...curr!, user: resp.data.user }))
    else console.warn('Failed to fetch user:', resp)
  }
  useEffect(
    ()=>void fetchUser(),
    []
  )
  
  const user = auth!.user
  
  
  
  
  
  
  
  const {
    formValues, setFormValues,
    failures, setFailures,
    failedFields, validationProps,
  } = useFormFailures({
    defaultValues, validators
  })
  
  const {
    request, isLoading,
    isSuccess, isError,
    response, resetResponse,
  } = useApiRequest({
    values: formValues,
    failedFields,
    prepareAndRequest: useCallback(
      (values: FormValues,failedFields: (keyof FormValues)[])=>{
        const userToUpdate: UserToUpdate = {}
        ObjectKeys(userDefaultValues)
          .filter(fName=>!['pwd','repeatPwd'].includes(fName))
          .forEach(fName=>{
            if (!failedFields.includes(fName)) userToUpdate[fName] = values[fName]
          })
        if (!failedFields.includes('pwd') &&
          !failedFields.includes('repeatPwd')
        ) userToUpdate.pwd = values.pwd
        return UserApi.update(userToUpdate)
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
        let preparedFields = [...failedFields]
        if (failedFields.includes('pwd') && !failedFields.includes('repeatPwd'))
          preparedFields.push('repeatPwd')
        if (!failedFields.includes('pwd') && failedFields.includes('repeatPwd'))
          preparedFields.push('pwd')
        return preparedFields
          .filter(ff=>Object.hasOwn(userDefaultValues,ff))
          .length < ObjectKeys(userDefaultValues).length
      },
      []
    ),
    request, isLoading,
    isError, response,
    resetResponse,
  })
  
  
  
  useEffect(
    ()=>{
      if (isSuccess && response && Object.hasOwn(response,'data')){
        setAuth(s=>({
          accessToken: s?.accessToken ?? '',
          user: response.data!.user,
        }))
      }
    },
    [isSuccess, response, setAuth]
  )
  
  
  
  const fieldIsInitial = useCallback(
    (field: keyof FormValues)=>{
      return failures
        .some(f=>f.type==='initial' && f.errorFields.includes(field))
    },
    [failures]
  )
  
  const updateValues = useEffectEvent((auth: AuthStateType)=>{
    setFormValues(s=>{
      const u = auth!.user
      const newValues = {...s, initialValues: {...s.initialValues}}
      //newValues.initialValues.name = u.name
      
      ObjectKeys(userDefaultValues).forEach(fName=>{
        if (fieldIsInitial(fName) && fName in u)
          newValues[fName] = u[fName] as any
      })
      return newValues
    })
  })
  useEffect(()=>updateValues(auth), [auth])
  
  const resetField = useCallback(
    (fieldName: keyof FormValues)=>{
      const vs = formValues, ivs = formValues.initialValues
      setFormValues({
        ...vs,
        [fieldName]: ivs[fieldName],
      })
    },
    [formValues, setFormValues]
  )
  
  
  
  
  
  
  useFormToasts({
    isLoading,
    loadingText: AccountSettingsUiText.update,
    isSuccess,
    successText: AccountSettingsUiText.updated,
    failures: failures,
    setFailures: setFailures,
    failureCodeToUiText: mapFailureCodeToUiText,
  })
  
  
  
  useEffect(()=>{
    console.log('ACCOUNT_SETTINGS_FAILURES',failures)
  },[failures])
  
  
  
  
  
  const pageRef = useRef<HTMLElement>(null)
  
  
  
  return <>
    
    <Page ref={pageRef}>
      <Form onSubmit={formSubmitPreventDefault}>
        
        <FormHeader>{uiText.account[0].text}</FormHeader>
        
        
        
        <Card>
          
          <ItemContainer>
            <ItemLabel>{uiText.id[0].text}</ItemLabel>
            <DataField css={[
              DataFieldStyle.statikSmall,
              css`&.rrainuiFrame {
                ${textSmall1};
              }`,
            ]}
            >
              {user.id}
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiText.email[0].text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {user.email}
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiText.emailVerified[0].text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              { user.emailVerified
                ? uiText.yes[0].text.toLowerCase()
                : uiText.no[0].text.toLowerCase()
              }
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiText.userCreated[0].text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {new Date(user.created) + ''}
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiText.userUpdated[0].text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {new Date(user.updated) + ''}
            </DataField>
          </ItemContainer>
          
          
          
          
          <ItemContainer>
            <ItemTitleContainer>
              <ItemLabel>{uiText.newPwd[0].text}</ItemLabel>
              { !fieldIsInitial('pwd')
                && <ResetButton
                  text={uiText.reset[0].text}
                  onClick={()=>resetField('pwd')}
                />
              }
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
              { !fieldIsInitial('repeatPwd')
                && <ResetButton
                  text={uiText.reset[0].text}
                  onClick={()=>resetField('repeatPwd')}
                />
              }
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
          <Button css={ButtonStyle.bigRectPrimary}
            onClick={resetAuth}
          >
            {uiText.signOut[0].text}
          </Button>
        </div>
        
        <div css={notInCard}>
          <Button css={ButtonStyle.bigRectDanger}
            onClick={undefined}
            disabled
          >
            {uiText.deleteAccount[0].text}
          </Button>
        </div>
      
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
    
    
    <BottomButtonBar
      css={css`
        padding-bottom: var(--bottom-nav-height);
      `}
    >
      
      {/* <Button css={ButtonStyle.icon}
       onClick={fetchUser}
       disabled={false}
       >
       <ArrowReload />
       </Button> */}
      
      <Button css={ButtonStyle.icon}
        onClick={submit}
        disabled={!canSubmit}
      >
        <FloppyDisk1Ic />
      </Button>
    
    </BottomButtonBar>
    
  </>
}
export default Mem(AccountSettingsPage)






const notInCard = css`
  ${col};
  gap: inherit;
  padding: 0 12px;
`