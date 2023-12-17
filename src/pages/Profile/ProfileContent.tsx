/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useId, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { GenderEnum } from 'src/api/entity/GenderEnum'
import { UserApi } from 'src/api/requests/UserApi'
import { useApiRequest } from 'src/api/useApiRequest'
import Form from 'src/components/FormElements/Form'
import FormHeader from 'src/components/FormElements/FormHeader'
import ItemContainer from 'src/components/FormElements/ItemContainer'
import ItemLabel from 'src/components/FormElements/ItemLabel'
import ItemTitleContainer from 'src/components/FormElements/ItemTitleContainer'
import Modal from 'src/components/Modal/Modal'
import ModalPortal from 'src/components/Modal/ModalPortal'
import { ModalStyle } from 'src/components/Modal/ModalStyle'
import OptionItem from 'src/components/OptionItem/OptionItem'
import UseBool from 'src/components/StateCarriers/UseBool'
import UseBrowserBack from 'src/components/UseBrowserBack'
import { ProfileMockData } from 'src/pages/Profile/MockData'
import ProfilePhotos, { ProfilePhoto, ProfilePhotoArr } from 'src/pages/Profile/ProfilePhotos'
import { ProfileUiText } from 'src/pages/Profile/uiText'
import { ProfilePageValidation } from 'src/pages/Profile/validation'
import { AuthRecoil, AuthStateType } from 'src/recoil/state/AuthRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ObjectUtils } from 'src/utils/common/ObjectUtils'
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
import Card2 from 'src/views/Card2'
import { SvgIcons } from 'src/views/icons/SvgIcons'
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
import userDefaultValues = ProfilePageValidation.userDefaultValues
import ObjectKeys = ObjectUtils.ObjectKeys
import GenderIc = SvgIcons.GenderIc
import Arrow6NextIc = SvgIcons.Arrow6NextIc
import Search2Ic = SvgIcons.Search2Ic
import fixedTop = EmotionCommon.fixedTop
import row = EmotionCommon.row
import NameCardIc = SvgIcons.NameCardIc
import GiftBoxIc = SvgIcons.GiftBoxIc





const sheetSnaps: SheetSnapPoints = [0,200,'fit-content','50%','80%']
const sheetOpenIdx = 2




const ProfileContent =
React.memo(
()=>{
  
  const reactId = useId()
  const [auth,setAuth] = useRecoilState(AuthRecoil)
  
  const uiText = useUiTextContainer(ProfileUiText)
  
  
  
  
  
  
  
  const {
    formValues, setFormValues,
    failures, setFailures,
    failedFields, validationProps,
  } = useFormFailures({
    defaultValues, validators
  })
  
  const {
    request,
    isLoading, isSuccess, isError, isImmediate,
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
  
  
  
  
  const fieldIsInitial = useCallback(
    (field: keyof FormValues)=>{
      return failures
        .some(f=>f.type==='initial' && f.errorFields.includes(field))
    },
    [failures]
  )
  const anyFieldChanged = useMemo(
    ()=>{
      return failures.filter(f=>f.type==='initial')
        .length < ObjectKeys(userDefaultValues).length
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
  const resetAllFields = useCallback(
    ()=>{
      setFormValues(s=>({
        ...s,
        ...s.initialValues,
      }))
    },
    [setFormValues]
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
  
  
  
  
  
  
  /*
  useEffect(()=>{
    console.log('PROFILE_CONTENT_FAILURES',failures)
  },[failures])
   */
  
  
  
  
  
  
  const [images, setImages] = useState<ProfilePhotoArr>(
    ProfileMockData.userImages
      .map((it,i)=>i===3 ? undefined : it) as ProfilePhotoArr
  )
  
  
  
  
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
  
  
  
  return <>
    <Form onSubmit={onFormSubmitCallback}>
      
      <FormHeader>{uiText.profile[0].text}</FormHeader>
      
      
      <div css={css`
        ${col};
        gap: 0px;
      `}>
        
        
        <ProfilePhotos
          images={images}
          setImages={setImages}
        />
        
        <div css={{ height: 24 }}/>
        
        <ItemContainer>
          <ItemTitleContainer>
            <ItemLabel>{uiText.aboutMe[0].text}</ItemLabel>
            {/* {!fieldIsInitial('aboutMe')
              && <ResetButton
                text={uiText.reset[0].text}
                onClick={() => resetField('aboutMe')}
              />
            } */}
          </ItemTitleContainer>
          <ValidationComponentWrap {...validationProps}
            fieldName="aboutMe"
            render={props =>
              <Textarea css={TextareaStyle.small}
                {...props.inputProps}
                hasError={props.highlight}
              />
            }
          />
        </ItemContainer>
        
        
        <div css={{ height: 24 }}/>
        
        
        <Card2 css={css`
          gap: 10px;
        `}>
          
          
          
          <ValidationComponentWrap {...validationProps}
            fieldName="name"
            render={props => <UseBool render={boolProps =>
              <>
                
                <OptionItem
                  icon={<NameCardIc css={css`height: 50%`}/>}
                  title={uiText.name[0].text}
                  value={props.value}
                  data-error={props.highlight}
                  nextIcon={<Arrow6NextIc css={css`height: 44%`}/>}
                  onClick={boolProps.setTrue}
                />
                
                { boolProps.value &&
                  <UseBrowserBack
                    onBack={boolProps.setFalse}
                  >
                    <ModalPortal><Modal css={ModalStyle.modal}
                      onClick={boolProps.setFalse}
                    >
                      <div css={css`
                        width: 100%;
                        height: 100%;
                        padding: 20px;
                        padding-bottom: 140px;
                        display: grid;
                        place-items: end center;
                      `}>
                        
                        <Card2 css={css`
                          min-width: 220px;
                          width: 100%;
                          max-width: 500px;
                          gap: 10px;
                        `}
                          onClick={ev => ev.stopPropagation()}
                        >
                          <ItemLabel>{uiText.name[0].text}</ItemLabel>
                          <Input css={InputStyle.inputSmall}
                            autoFocus
                            placeholder={uiText.name[0].text.toLowerCase()}
                            {...props.inputProps}
                            hasError={props.highlight}
                            onBlur={ev => {
                              ev.currentTarget.focus()
                              props.inputProps.onBlur()
                            }}
                          />
                          <div css={css`
                            ${row};
                            gap: 10px;
                            justify-content: end;
                          `}>
                            <Button css={ButtonStyle.roundedSmallSecondary}
                              onClick={boolProps.setFalse}
                            >Ок</Button>
                          </div>
                        </Card2>
                      </div>
                    </Modal></ModalPortal>
                  </UseBrowserBack>
                }
              
              </>
          }/>}/>
          
          
          
          
          <ValidationComponentWrap {...validationProps}
            fieldName="birthDate"
            render={props => <UseBool render={boolProps =>
              <>
                
                <OptionItem
                  icon={<GiftBoxIc css={css`height: 50%`}/>}
                  title={uiText.birthDate[0].text}
                  value={props.value}
                  data-error={props.highlight}
                  nextIcon={<Arrow6NextIc css={css`height: 44%`}/>}
                  onClick={boolProps.setTrue}
                />
                
                { boolProps.value && <ModalPortal><Modal css={ModalStyle.modal}
                  onClick={boolProps.setFalse}
                >
                  <div css={css`
                  width: 100%;
                  height: 100%;
                  padding: 20px;
                  padding-bottom: 140px;
                  display: grid;
                  place-items: end center;
                `}>
                    
                    <Card2 css={css`
                    min-width: 220px;
                    width: 100%;
                    max-width: 500px;
                    gap: 10px;
                  `}
                      onClick={ev=>ev.stopPropagation()}
                    >
                      <ItemLabel>{uiText.birthDate[0].text}</ItemLabel>
                      <Input css={InputStyle.inputSmall}
                        autoFocus
                        inputMode="numeric"
                        placeholder={uiText.birthDatePlaceholder[0].text.toLowerCase()}
                        {...props.inputProps}
                        hasError={props.highlight}
                        onBlur={ev=>{
                          ev.currentTarget.focus()
                          props.inputProps.onBlur()
                        }}
                      />
                      <div css={css`
                      ${row};
                      gap: 10px;
                      justify-content: end;
                    `}>
                        <Button css={ButtonStyle.roundedSmallSecondary}
                          onClick={boolProps.setFalse}
                        >Ок</Button>
                      </div>
                    </Card2>
                  </div>
                </Modal></ModalPortal>}
              
              </>
            }/>}/>
          
          
          <ValidationComponentWrap
            {...validationProps}
            fieldName="gender"
            render={validProps =>
              <UseBool render={boolProps =>
                <UseModalSheet
                  open={boolProps.value}
                  setOpen={boolProps.setValue}
                  snapPoints={sheetSnaps}
                  openIdx={sheetOpenIdx}
                  render={sheetProps =>
                    <>
                      
                      <OptionItem
                        icon={<GenderIc css={css`height: 50%`}/>}
                        title={uiText.gender[0].text}
                        value={genderOptions.find(opt => opt.value === validProps.value)?.text ?? ''}
                        nextIcon={<Arrow6NextIc css={css`height: 44%`}/>}
                        onClick={boolProps.setTrue}
                      />
                      
                      {boolProps.value && <ModalPortal>
                        <BottomSheetBasic
                          {...sheetProps.sheetProps}
                          header={uiText.gender[0].text}
                          aria-modal
                        >
                          <div css={selectItemsContainer}
                            role="radiogroup"
                            tabIndex={0}
                          >
                            {genderOptions.map(opt => <RadioInput
                              css={RadioInputStyle.radio}
                              id={`gender-option-${opt.value}-${reactId}`}
                              childrenPosition="start"
                              role="radio"
                              aria-checked={validProps.checked(opt.value)}
                              checked={validProps.checked(opt.value)}
                              value={opt.value}
                              key={opt.value}
                              onChange={validProps.inputProps.onChange}
                              onClick={sheetProps.setClosing}
                            >
                              <div css={selectItemText}>
                                {opt.text}
                              </div>
                            </RadioInput>)}
                          
                          </div>
                        </BottomSheetBasic>
                      </ModalPortal>}
                    
                    </>
                  }
                />
              }/>
            }
          />
          
          
          <OptionItem
            icon={<Search2Ic css={css`height: 50%`}/>}
            title={uiText.imLookingFor[0].text}
            value={preferredPeopleOptions.find(it => it.value === 'notSelected')!.text}
            nextIcon={<Arrow6NextIc css={css`height: 44%`}/>}
          />
        
        
        </Card2>
      
      </div>
      
    </Form>
    
    { (canSubmit || anyFieldChanged) && <TopButtonBarFrame>
      { anyFieldChanged &&
        <Button css={ButtonStyle.roundedSmallSecondary}
          onClick={resetAllFields}
        >Отменить</Button>
      }
      { canSubmit &&
        <Button css={ButtonStyle.roundedSmallAccent}
          onClick={submit}
        >Сохранить</Button>
      }
    </TopButtonBarFrame>}
  </>
})
export default ProfileContent












const selectItemsContainer = css`
  ${col};
  padding-bottom: 20px;
`
const selectItemText = css`
  flex: 1;
  padding-top: 4px;
  padding-bottom: 4px;
`



export const TopButtonBarFrame = styled.section`
  ${fixedTop};
  z-index: 10;
  //height: var(--top-button-bar-height);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
  background: ${p=>p.theme.containerNormal.bgc[0]}cc;
  gap: 10px;
  pointer-events: none;
  &>*{ pointer-events: auto; }
`