/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { UserApi } from 'src/api/requests/UserApi'
import { ProfileMockData } from 'src/pages/Profile/MockData'
import ProfileImages from 'src/pages/Profile/ProfileImages'
import { ProfileUiText } from 'src/pages/Profile/uiText'
import { ProfilePageValidation } from 'src/pages/Profile/validation'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useForm } from 'src/utils/form-validation/form/useForm'
import { useFormToasts } from 'src/utils/form-validation/form/useFormToasts'
import ValidationComponentWrap from 'src/utils/form-validation/ValidationComponentWrap'
import { useUiTextContainer } from 'src/utils/lang/useUiText'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import { Themes } from 'src/utils/theme/Themes'
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import { SheetSnapPoints, SheetState } from 'src/views/BottomSheet/useBottomSheet'
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
import FloppyDisk1Ic = SimpleSvgIcons.FloppyDisk1Ic
import row = EmotionCommon.row
import center = EmotionCommon.center
import col = EmotionCommon.col
import textNormal = EmotionCommon.textNormal1
import defaultValues = ProfilePageValidation.defaultValues
import validators = ProfilePageValidation.validators
import FormValues = ProfilePageValidation.FormValues
import UserToUpdate = UserApi.UserToUpdate
import ArrowReloadIc = SimpleSvgIcons.ArrowReloadIc
import UpdateUserRespS = UserApi.UpdateUserRespS
import mapFailureCodeToUiOption = ProfilePageValidation.mapFailureCodeToUiOption
import Setter = TypeUtils.Setter
import Mem = ReactUtils.Mem





const sheetSnaps: SheetSnapPoints = [0,200,'fit-content','50%','80%']
const openIdx = 2



export type ProfileContentProps = {
  setCanSave?: Setter<boolean> | undefined,
  setSubmitCb?: Setter<(()=>()=>void)|undefined>
}
const ProfileContent = (props: ProfileContentProps)=>{
  const {
    setCanSave,
    setSubmitCb,
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
      failed=>{
        const usableFields: (keyof FormValues)[] = ['name']
        return usableFields.some(uf=>!failed.includes(uf))
      },
      []
    ),
    prepareRequestData: useCallback<
      (values: FormValues,failedFields: (keyof FormValues)[])=>[UserToUpdate]
    >
    (
      (values, failedFields)=>{
        const userToUpdate: UserToUpdate = {}
        const usableFields: (keyof FormValues)[] = ['name']
        usableFields.forEach(uf=>{
          if (!failedFields.includes(uf)) userToUpdate[uf] = values[uf]
        })
        return [userToUpdate]
      },
      []
    ),
    doRequest: UserApi.update,
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
  
  
  const updateValues = useEffectEvent(()=>{
    setFormValues(s=>{
      const u = auth!.user, vs = s[0], ivs = vs.initialValues
      return [
        {...vs,
          name: !('name' in ivs) || vs.name===ivs.name ? u.name : vs.name,
          initialValues: {
            name: u.name,
          }
        }
        ,vs
      ]
    })
  })
  useEffect(updateValues, [auth])
  
  
  
  const resetField = useCallback(
    (fieldName: keyof FormValues)=>{
      const vs = formValues[0], ivs = formValues[0].initialValues
      if (fieldName in ivs && vs[fieldName]!==ivs[fieldName]) 
        setFormValues([{
          ...vs,
          [fieldName]: ivs[fieldName],
        },vs])
    },
    [formValues, setFormValues]
  )
  
  
  useEffect(
    ()=>setSubmitCb?.(()=>()=>setDoSubmit(true)),
    [setDoSubmit, setSubmitCb]
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
  
  
  
  
  
  
  
  
  
  
  const [initialValues, setInitialValues] = useState({
    birthDate: auth!.user.birthDate,
    sex: auth!.user.sex,
  })
  
  
  const [sheetState, setSheetState] = useState<SheetState>('closed')
  const [snapIdx,setSnapIdx] = useState(2)
  
  const [preferredPeople, setPreferredPeople] = useState(
    'notSelected' as 'notSelected'|'ofGuys'|'ofGirls'|'ofGuysAndGirls'
  )
  const [selecting, setSelecting] = useState(
    undefined as undefined|'items'|'preferred-genders'
  )
  useEffect(()=>{
    if (selecting){
      setSheetState('opening')
      setSnapIdx(openIdx)
    }
  },[selecting])
  useEffect(()=>{
    if (sheetState==='closed'){
      setSelecting(undefined)
    }
  },[sheetState])
  
  
  useEffect(
    ()=>{
      setCanSave?.(canSubmit)
    },
    [canSubmit, setCanSave]
  )
  
  
  
  const bottomSheetProps = {
    state: sheetState,
    setState: setSheetState,
    snapPoints: sheetSnaps,
    snapIdx: snapIdx,
    setSnapIdx: setSnapIdx,
  }
  
  const [images, setImages] = useState(ProfileMockData.userImages)
  
  
  
  
  type PreferredPeopleOption = 'notSelected'|'ofGuys'|'ofGirls'|'ofGuysAndGirls'
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
  const onPreferredPeopleOptionChecked = useCallback(
    function (value: PreferredPeopleOption){
    
    },
    []
  )
  
  const vs = formValues[0], ivs = formValues[0].initialValues
  return <Form onSubmit={onSubmit}>
    
    <h3 css={formHeader}>{uiText.profile[0].text}</h3>
    
    
    <ProfileImages
      images={images}
      setImages={setImages}
    />
    
    
    
    <Card>
      
      <ItemContainer>
        <div
          css={css`
            width: 100%;
            height: 30px;
            ${row};
            align-items: center;
            justify-content: space-between;
            gap: 4px;
          `}
        >
          <ItemLabel>
            {uiText.name[0].text}
          </ItemLabel>
          { 'name' in ivs && vs.name!==ivs.name
            && <Button css={ButtonStyle.smallRectNormal}
              onClick={()=>resetField('name')}
            >
              <ArrowReloadIc
                css={css`
                  &.rrainuiIcon {
                    height: 1em;
                    width: 1em;
                    --icon-color: var(--color);
                    transform: scale(-1, 1);
                  }
                `}
              />
              <div
                css={css`white-space: nowrap;`}
              >
                {uiText.reset[0].text}
              </div>
            </Button>
          }
        </div>
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
        <ItemLabel>{uiText.birthDate[0].text}</ItemLabel>
        <DataField css={DataFieldStyle.statikSmall}>
          {initialValues.birthDate}
        </DataField>
      </ItemContainer>
      
      <ItemContainer>
        <ItemLabel>{uiText.sex[0].text}</ItemLabel>
        <DataField css={DataFieldStyle.statikSmall}>
          {initialValues.sex === 'MALE'
            ? uiText.male[0].text
            : uiText.female[0].text
          }
        </DataField>
      </ItemContainer>
      
      <ItemContainer>
        <ItemLabel>{uiText.aboutMe[0].text}</ItemLabel>
        <Textarea css={TextareaStyle.textareaSmall}/>
      </ItemContainer>
      
      
      <ItemContainer>
        <div
          css={css`
            ${row};
            gap: 6px;
          `}
        >
          <ItemLabel>{uiText.imLookingFor[0].text}</ItemLabel>
          {preferredPeople!=='notSelected' && <div
            css={t=>css`
              ${center};
              border-radius: 50%;
              height: 1.5em;
              padding: 0.27em;
              aspect-ratio: 1;
              background: ${t.icon.warning.bgc[0]};
            `}
          >
            <FloppyDisk1Ic
              css={t => css`svg& {
                    --icon-color: ${t.icon.warning.color[0]}
                  }`}
            />
          </div>}
        </div>
        
        <DataField
          css={DataFieldStyle.interactiveSmall}
          onClick={ev => {
            //console.log('CLICK')
            setSelecting('preferred-genders')
          }}
          role="listbox"
        >
          {preferredPeopleOptions.find(it=>it.value===preferredPeople)?.text}
          
          
          { selecting === 'preferred-genders' && <BottomSheetBasic
            {...bottomSheetProps}
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
                      setSheetState('closing')
                    }}
                    onClick={ev => {
                      setPreferredPeople(opt.value)
                      setSheetState('closing')
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
const ItemLabel = styled.label`
  padding-left: 12px;
  ${textNormal};
  color: ${p=>p.theme.page.text[0]}
`

const notInCard = css`
  ${col};
  gap: inherit;
  padding: 0 12px;
`