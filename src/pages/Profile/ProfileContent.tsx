/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { UserApi } from 'src/api/requests/UserApi'
import { useApiRequest } from 'src/api/useApiRequest'
import Form from 'src/components/FormElements/Form'
import FormHeader from 'src/components/FormElements/FormHeader'
import ItemContainer from 'src/components/FormElements/ItemContainer'
import ItemLabel from 'src/components/FormElements/ItemLabel'
import ItemTitleContainer from 'src/components/FormElements/ItemTitleContainer'
import ResetButton from 'src/components/FormElements/ResetButton'
import UseBool from 'src/components/StateCarriers/UseBool'
import { ProfileMockData } from 'src/pages/Profile/MockData'
import ProfileImages from 'src/pages/Profile/ProfileImages'
import { ProfileUiText } from 'src/pages/Profile/uiText'
import { ProfilePageValidation } from 'src/pages/Profile/validation'
import { AuthRecoil, AuthStateType } from 'src/recoil/state/AuthRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { DateTime } from 'src/utils/DateTime'
import { useFormFailures } from 'src/utils/form-validation/form/useFormFailures'
import { useFormSubmit } from 'src/utils/form-validation/form/useFormSubmit'
import { useFormToasts } from 'src/utils/form-validation/form/useFormToasts'
import ValidationComponentWrap from 'src/utils/form-validation/ValidationComponentWrap'
import { useUiTextContainer } from 'src/utils/lang/useUiText'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import { SheetSnapPoints } from 'src/views/BottomSheet/useBottomSheet'
import UseModalSheet from 'src/views/BottomSheet/UseModalSheetState'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import Card from 'src/views/Card'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import Input from 'src/views/Inputs/Input/Input'
import { InputStyle } from 'src/views/Inputs/Input/InputStyle'
import RadioInput from 'src/views/Inputs/RadioInput/RadioInput'
import { RadioInputStyle } from 'src/views/Inputs/RadioInput/RadioInputStyle'
import Textarea from 'src/views/Textarea/Textarea'
import { TextareaStyle } from 'src/views/Textarea/TextareaStyle'
import col = EmotionCommon.col
import defaultValues = ProfilePageValidation.defaultValues
import validators = ProfilePageValidation.validators
import FormValues = ProfilePageValidation.FormValues
import UserToUpdate = UserApi.UserToUpdate
import mapFailureCodeToUiText = ProfilePageValidation.mapFailureCodeToUiText
import Setter = TypeUtils.Setter
import Mem = ReactUtils.Mem
import userDefaultValues = ProfilePageValidation.userDefaultValues
import ObjectKeys = ObjectUtils.ObjectKeys
import GenderEnum = UserApi.GenderEnum





const sheetSnaps: SheetSnapPoints = [0,200,'fit-content','50%','80%']
const sheetOpenIdx = 2



export type ProfileContentProps = {
  setCanSubmit?: Setter<boolean> | undefined,
  setSubmitCallback?: Setter<(()=>()=>void)|undefined>
}
const ProfileContent = (props: ProfileContentProps)=>{
  const {
    setCanSubmit,
    setSubmitCallback,
  } = props
  
  const [auth,setAuth] = useRecoilState(AuthRecoil)
  const resetAuth = useResetRecoilState(AuthRecoil)
  
  const uiText = useUiTextContainer(ProfileUiText)
  
  
  
  
  
  
  
  
  
  
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
        ObjectKeys(userDefaultValues).forEach(fName=>{
          if (!failedFields.includes(fName)) userToUpdate[fName] = values[fName]
        })
        if (userToUpdate.birthDate) userToUpdate.birthDate =
          DateTime.from_yyyy_MM_dd(userToUpdate.birthDate)!
          .set({ timezone: DateTime.fromDate(new Date()).timezone })
          .to_yyyy_MM_dd_HH_mm_ss_SSS_XXX()
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
        return failedFields
          .filter(ff=>Object.hasOwn(userDefaultValues,ff))
          .length < ObjectKeys(userDefaultValues).length
      },
      []
    ),
    request, isLoading, isError,
    response, resetResponse,
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
  
  
  useEffect(
    ()=>setSubmitCallback?.(()=>()=>submit()),
    [submit, setSubmitCallback]
  )
  useEffect(
    ()=>setCanSubmit?.(canSubmit),
    [canSubmit, setCanSubmit]
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
      newValues.initialValues.name = u.name
      newValues.initialValues.birthDate = u.birthDate
      newValues.initialValues.gender = u.gender
      newValues.initialValues.aboutMe = u.aboutMe
      
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
    loadingText: ProfileUiText.update,
    isSuccess,
    successText: ProfileUiText.updated,
    failures: failures,
    setFailures: setFailures,
    failureCodeToUiText: mapFailureCodeToUiText,
  })
  
  
  
  
  
  
  
  /* useEffect(()=>{
    console.log('PROFILE_CONTENT_FAILURES',failures)
  },[failures]) */
  
  
  
  
  
  
  
  const [images, setImages] = useState(ProfileMockData.userImages)
  
  
  
  
  const genderOptions = useMemo(
    ()=>[
      {
        value: 'MALE',
        text: uiText.male[0].text,
      },{
        value: 'FEMALE',
        text: uiText.female[0].text,
      }
    ] satisfies { value: GenderEnum, text: string }[],
    [uiText]
  )
  
  
  
  
  type PreferredPeopleOption = 'notSelected'|'ofGuys'|'ofGirls'|'ofGuysAndGirls'
  const [preferredPeople, setPreferredPeople] =
    useState('notSelected' as PreferredPeopleOption)
  
  const preferredPeopleOptions = useMemo(
    ()=>[
      {
        value: 'notSelected',
        text: uiText.notSelected[0].text,
      },{
        value: 'ofGuys',
        text: uiText.ofGuys[0].text,
      },{
        value: 'ofGirls',
        text: uiText.ofGirls[0].text,
      },{
        value: 'ofGuysAndGirls',
        text: uiText.ofGuysAndGirls[0].text,
      }
    ] satisfies { value: PreferredPeopleOption, text: string }[],
    [uiText]
  )
  
  
  
  return <Form onSubmit={onFormSubmitCallback}>
    
    <FormHeader>{uiText.profile[0].text}</FormHeader>
    
    
    <ProfileImages
      images={images}
      setImages={setImages}
    />
    
    
    
    <Card>
      
      
      <ItemContainer>
        <ItemTitleContainer>
          <ItemLabel>{uiText.name[0].text}</ItemLabel>
          { !fieldIsInitial('name')
            && <ResetButton
              text={uiText.reset[0].text}
              onClick={()=>resetField('name')}
            />
          }
        </ItemTitleContainer>
        <ValidationComponentWrap {...validationProps}
          fieldName='name'
          render={props => <Input
            css={InputStyle.inputSmall}
            placeholder={uiText.name[0].text.toLowerCase()}
            {...props.inputProps}
            hasError={props.highlight}
          />}
        />
      </ItemContainer>
      
      
      <ItemContainer>
        <ItemTitleContainer>
          <ItemLabel>{uiText.birthDate[0].text}</ItemLabel>
          { !fieldIsInitial('birthDate')
            && <ResetButton
              text={uiText.reset[0].text}
              onClick={()=>resetField('birthDate')}
            />
          }
        </ItemTitleContainer>
        <ValidationComponentWrap {...validationProps}
          fieldName='birthDate'
          render={props => <Input
            css={InputStyle.inputSmall}
            inputMode='numeric'
            placeholder={uiText.birthDatePlaceholder[0].text.toLowerCase()}
            {...props.inputProps}
            hasError={props.highlight}
          />}
        />
      </ItemContainer>
      
      
      <ItemContainer>
        <ItemTitleContainer>
          <ItemLabel>{uiText.gender[0].text}</ItemLabel>
          { !fieldIsInitial('gender')
            && <ResetButton
              text={uiText.reset[0].text}
              onClick={()=>resetField('gender')}
            />
          }
        </ItemTitleContainer>
        
        <ValidationComponentWrap {...validationProps}
          fieldName='gender'
          render={validProps =>
            <UseBool render={boolProps=>
              <UseModalSheet
                open={boolProps.value}
                setOpen={boolProps.setValue}
                snapPoints={sheetSnaps}
                openIdx={sheetOpenIdx}
                render={sheetProps =>
                  <Input
                    css={InputStyle.input({ size: 'small', clickable: true })}
                    readOnly
                    frameProps={{ role: 'listbox' }}
                    onClick={boolProps.setTrue}
                    value={genderOptions.find(opt=>opt.value===validProps.value)?.text ?? ''}
                    hasError={validProps.highlight}
                  >
                    
                    { boolProps.value && <BottomSheetBasic
                      {...sheetProps.sheetProps}
                      header={uiText.gender[0].text}
                    >
                      <div css={selectItemsContainer}>
                        { genderOptions.map(opt => <RadioInput
                          css={RadioInputStyle.radio}
                          childrenPosition="start"
                          role="option"
                          aria-selected={validProps.checked(opt.value)}
                          checked={validProps.checked(opt.value)}
                          value={opt.value}
                          key={opt.value}
                          onChange={validProps.inputProps.onChange}
                          onClick={sheetProps.setClosing}
                        >
                          <div css={selectItemText}>
                            {opt.text}
                          </div>
                        </RadioInput>)
                        }
                      
                      </div>
                    </BottomSheetBasic> }
                  
                  </Input>
                }
              />
            }/>
          }
        />
        
      </ItemContainer>
      
      
      <ItemContainer>
        <ItemTitleContainer>
          <ItemLabel>{uiText.aboutMe[0].text}</ItemLabel>
          { !fieldIsInitial('aboutMe')
            && <ResetButton
              text={uiText.reset[0].text}
              onClick={()=>resetField('aboutMe')}
            />
          }
        </ItemTitleContainer>
        <ValidationComponentWrap {...validationProps}
          fieldName='aboutMe'
          render={props =>
            <Textarea css={TextareaStyle.textareaSmall}
              {...props.inputProps}
              hasError={props.highlight}
            />
          }
        />
      </ItemContainer>
      
    </Card>
    
    
    
    <Card>
      
      <ItemContainer>
        <ItemLabel>{uiText.imLookingFor[0].text}</ItemLabel>
        
        <UseBool render={boolProps=>
          <UseModalSheet
            open={boolProps.value}
            setOpen={boolProps.setValue}
            snapPoints={sheetSnaps}
            openIdx={sheetOpenIdx}
            render={sheetProps =>
              <Input css={InputStyle.inputSmall}
                //readOnly
                disabled
                onClick={boolProps.setTrue}
                role="listbox"
                value={preferredPeopleOptions.find(it=>it.value===preferredPeople)?.text}
              >
                { boolProps.value && <BottomSheetBasic
                  {...sheetProps.sheetProps}
                  header={uiText.imLookingFor[0].text}
                >
                  <div css={selectItemsContainer}>
                    {
                      preferredPeopleOptions
                        .map(opt => <RadioInput
                          css={RadioInputStyle.radio}
                          childrenPosition="start"
                          role="option"
                          aria-selected={opt.value===preferredPeople}
                          checked={opt.value===preferredPeople}
                          value={opt.value}
                          key={opt.value}
                          onChange={ev => {
                            setPreferredPeople(opt.value)
                            sheetProps.setClosing()
                          }}
                        >
                          <div css={selectItemText}>
                            {opt.text}
                          </div>
                        </RadioInput>)
                    }
                  
                  </div>
                </BottomSheetBasic> }
                
                
              </Input>
            }
          />
        }/>
      
      </ItemContainer>
    
    </Card>
    
    
    
    <div css={notInCard}>
      <Button css={ButtonStyle.bigRectPrimary}
        onClick={resetAuth}
      >
        {uiText.signOut[0].text}
      </Button>
    </div>
  
    
  </Form>
}
export default Mem(ProfileContent)












const selectItemsContainer = css`
  ${col};
  padding-bottom: 20px;
`
const selectItemText = css`
  flex: 1;
  padding-top: 4px;
  padding-bottom: 4px;
`



const notInCard = css`
  ${col};
  gap: inherit;
  padding: 0 12px;
`