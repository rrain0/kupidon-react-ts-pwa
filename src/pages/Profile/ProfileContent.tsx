/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { UserApi } from 'src/api/requests/UserApi'
import UseBool from 'src/components/StateCarriers/UseBool'
import { ProfileMockData } from 'src/pages/Profile/MockData'
import ProfileImages from 'src/pages/Profile/ProfileImages'
import { ProfileUiText } from 'src/pages/Profile/uiText'
import { ProfilePageValidation } from 'src/pages/Profile/validation'
import { AuthRecoil, AuthStateType } from 'src/recoil/state/AuthRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { DateTime } from 'src/utils/DateTime'
import { useForm } from 'src/utils/form-validation/form/useForm'
import { useFormToasts } from 'src/utils/form-validation/form/useFormToasts'
import ValidationComponentWrap from 'src/utils/form-validation/ValidationComponentWrap'
import { useUiTextContainer } from 'src/utils/lang/useUiText'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import { Themes } from 'src/utils/theme/Themes'
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import { SheetSnapPoints, SheetState } from 'src/views/BottomSheet/useBottomSheet'
import UseModalSheetState from 'src/views/BottomSheet/UseModalSheetState'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import Card from 'src/views/Card'
import DataField from 'src/views/DataField/DataField'
import { DataFieldStyle } from 'src/views/DataField/DataFieldStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import Input from 'src/views/Inputs/Input/Input'
import { InputStyle } from 'src/views/Inputs/Input/InputStyle'
import RadioInput from 'src/views/Inputs/RadioInput/RadioInput'
import { RadioInputStyle } from 'src/views/Inputs/RadioInput/RadioInputStyle'
import Textarea from 'src/views/Textarea/Textarea'
import { TextareaStyle } from 'src/views/Textarea/TextareaStyle'
import row = EmotionCommon.row
import col = EmotionCommon.col
import textNormal = EmotionCommon.textNormal1
import defaultValues = ProfilePageValidation.defaultValues
import validators = ProfilePageValidation.validators
import FormValues = ProfilePageValidation.FormValues
import UserToUpdate = UserApi.UserToUpdate
import ArrowReloadIc = SimpleSvgIcons.ArrowReloadIc
import UpdateUserRespS = UserApi.UpdateUserRespS
import mapFailureCodeToUiOption = ProfilePageValidation.mapFailureCodeToUiText
import Setter = TypeUtils.Setter
import Mem = ReactUtils.Mem
import fieldsToSubmit = ProfilePageValidation.fieldsToSubmit





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
  const logout = async() => void resetAuth()
  
  const uiText = useUiTextContainer(ProfileUiText)
  
  
  
  
  const {
    canSubmit,
    loading,
    success,
    formValues,
    setFormValues,
    failures,
    setFailures,
    validationProps,
    onSubmit,
    setDoSubmit,
  } = useForm({
    defaultValues: defaultValues,
    validators: validators,
    getCanSubmit: useCallback(
      (failedFields: (keyof FormValues)[])=>{
        return fieldsToSubmit.some(fts=>!failedFields.includes(fts))
      },
      []
    ),
    doRequest: useCallback(
      (values: FormValues,failedFields: (keyof FormValues)[])=>{
        const userToUpdate: UserToUpdate = {}
        fieldsToSubmit.forEach(fts=>{
          if (!failedFields.includes(fts)) userToUpdate[fts] = values[fts]
        })
        if (userToUpdate.birthDate) userToUpdate.birthDate = DateTime
            .from_yyyy_MM_dd(userToUpdate.birthDate)!
            .to_yyyy_MM_dd()
        return UserApi.update(userToUpdate)
      },
      []
    ),
    onSuccess: useCallback<(data: UpdateUserRespS['data'])=>void>(
      data=>{
        setAuth(s=>({
          accessToken: s?.accessToken ?? '',
          user: data.user,
        }))
      },
      []
    ),
  })
  
  
  const updateValues = useEffectEvent((auth: AuthStateType)=>{
    setFormValues(s=>{
      const u = auth!.user, vs = s, ivs = vs.initialValues
      const newValues = {
        ...vs,
        name: vs.name,
        birthDate: vs.birthDate,
        initialValues: {
          name: u.name,
          birthDate: u.birthDate,
        }
      }
      if (!('name' in ivs) || vs.name===ivs.name) newValues.name = u.name
      if (
        !('birthDate' in ivs)
        || DateTime.eqFrom_yyyy_MM_dd(vs.birthDate, ivs.birthDate)
      ) newValues.birthDate = u.birthDate
      return newValues
    })
  })
  useEffect(()=>updateValues(auth), [auth])
  
  const resetField = useCallback(
    (fieldName: keyof FormValues)=>{
      const vs = formValues, ivs = formValues.initialValues
      if (fieldName in ivs && vs[fieldName]!==ivs[fieldName]) 
        setFormValues({
          ...vs,
          [fieldName]: ivs[fieldName],
        })
    },
    [formValues, setFormValues]
  )
  const fieldIsNotInitial = useCallback(
    (field: keyof FormValues)=>{
      return !failures
        .some(f=>f.type==='initial' && f.errorFields.includes(field))
    },
    [failures]
  )
  
  useEffect(
    ()=>setSubmitCallback?.(()=>()=>setDoSubmit(true)),
    [setDoSubmit, setSubmitCallback]
  )
  
  
  
  
  useFormToasts({
    isLoading: loading,
    loadingText: ProfileUiText.update,
    isSuccess: success,
    successText: ProfileUiText.updated,
    failures: failures,
    setFailures: setFailures,
    failureCodeToUiText: mapFailureCodeToUiOption,
  })
  
  
  
  
  useEffect(
    ()=>setCanSubmit?.(canSubmit),
    [canSubmit, setCanSubmit]
  )
  
  
  
  
  /* useEffect(()=>{
    console.log('PROFILE_FAILURES',failures)
  },[failures]) */
  
  
  
  
  
  
  
  
  
  
  
  
  
  const [images, setImages] = useState(ProfileMockData.userImages)
  
  
  
  
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
  
  
  
  return <Form onSubmit={onSubmit}>
    
    <h3 css={formHeader}>{uiText.profile[0].text}</h3>
    
    
    <ProfileImages
      images={images}
      setImages={setImages}
    />
    
    
    
    <Card>
      
      <ItemContainer>
        <ItemTitleContainer>
          <ItemLabel>{uiText.name[0].text}</ItemLabel>
          { fieldIsNotInitial('name')
            && <Button css={ButtonStyle.smallRectNormal}
              onClick={()=>resetField('name')}
            >
              <ArrowReloadIc css={resetButtonIcon}/>
              <ResetButtonText>
                {uiText.reset[0].text}
              </ResetButtonText>
            </Button>
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
          { fieldIsNotInitial('birthDate')
            && <Button css={ButtonStyle.smallRectNormal}
              onClick={()=>resetField('birthDate')}
            >
              <ArrowReloadIc css={resetButtonIcon}/>
              <ResetButtonText>
                {uiText.reset[0].text}
              </ResetButtonText>
            </Button>
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
        <ItemLabel>{uiText.sex[0].text}</ItemLabel>
        <DataField css={DataFieldStyle.statikSmall}>
          { auth!.user.sex === 'MALE'
            ? uiText.male[0].text
            : uiText.female[0].text
          }
        </DataField>
      </ItemContainer>
      
      <ItemContainer>
        <ItemLabel>{uiText.aboutMe[0].text}</ItemLabel>
        <Textarea css={TextareaStyle.textareaSmall} disabled />
      </ItemContainer>
      
    </Card>
    
    
    
    <Card>
      
      <ItemContainer>
        <ItemLabel>{uiText.imLookingFor[0].text}</ItemLabel>
        
        <UseBool render={boolProps=>
          <UseModalSheetState
            open={boolProps.value}
            setOpen={boolProps.setValue}
            snapPoints={sheetSnaps}
            openIdx={sheetOpenIdx}
            render={props =>
              <DataField
                //css={DataFieldStyle.interactiveSmall}
                css={DataFieldStyle.statikSmall}
                onClick={boolProps.setTrue}
                role="listbox"
              >
                {preferredPeopleOptions.find(it=>it.value===preferredPeople)?.text}
                
                
                { boolProps.value && <BottomSheetBasic
                  {...props.sheetProps}
                  header={uiText.imLookingFor[0].text}
                >
                  <div
                    css={css`
                      ${col};
                      padding-bottom: 20px;
                    `}
                  >
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
                            props.setClosing()
                          }}
                        >
                          <div
                            css={css`
                            flex: 1;
                            padding-top: 4px;
                            padding-bottom: 4px;
                          `}
                          >
                            {opt.text}
                          </div>
                        </RadioInput>)
                    }
                  
                  </div>
                </BottomSheetBasic> }
                
                
              </DataField>
            }
          />
        }/>
      
      </ItemContainer>
    
    </Card>
    
    
    
    <div css={notInCard}>
      <Button css={ButtonStyle.bigRectPrimary}
        onClick={logout}
      >
        {uiText.signOut[0].text}
      </Button>
    </div>
  
    
  </Form>
}
export default Mem(ProfileContent)






const Form = styled.form`
  max-width: 500px;
  width: 100%;
  ${col};
  gap: 10px;
`

const formHeader = (theme: Themes.Theme) => css`
  font-weight: 500;
  font-size: 28px;
  line-height: 150%;
  letter-spacing: 0.05em;
  color: ${theme.page.text[0]};
  align-self: center;
`
const ItemContainer = styled.div`
  ${col};
  gap: 4px;
`
const ItemTitleContainer = styled.div`
  width: 100%;
  height: 30px;
  ${row};
  align-items: center;
  justify-content: space-between;
  gap: 4px;
`
const ItemLabel = styled.label`
  padding-left: 12px;
  ${textNormal};
  color: ${p=>p.theme.page.text[0]}
`
const resetButtonIcon = css`
  &.rrainuiIcon {
    height: 1em;
    width: 1em;
    --icon-color: var(--color);
    transform: scale(-1, 1);
  }
`
const ResetButtonText = styled.div`
  white-space: nowrap;
`

const notInCard = css`
  ${col};
  gap: inherit;
  padding: 0 12px;
`