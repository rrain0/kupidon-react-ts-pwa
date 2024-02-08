/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useId, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { ApiUtils } from 'src/api/ApiUtils'
import { CurrentUser } from 'src/api/entity/CurrentUser'
import { GenderEnum } from 'src/api/entity/GenderEnum'
import { UserApi } from 'src/api/requests/UserApi'
import { useApiRequest } from 'src/api/useApiRequest'
import UseFakePointerRef from 'src/components/ActionProviders/UseFakePointerRef'
import Form from 'src/components/FormElements/Form'
import ItemContainer from 'src/components/FormElements/ItemContainer'
import ItemLabel from 'src/components/FormElements/ItemLabel'
import ItemTitleContainer from 'src/components/FormElements/ItemTitleContainer'
import Modal from 'src/components/Modal/Modal'
import ModalPortal from 'src/components/Modal/ModalPortal'
import { ModalStyle } from 'src/components/Modal/ModalStyle'
import OptionItem from 'src/components/OptionItem/OptionItem'
import UseBool from 'src/components/StateCarriers/UseBool'
import UseBrowserBack from 'src/components/ActionProviders/UseBrowserBack'
import ProfileTabHeader from 'src/pages/Profile/ProfileTabHeader'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import ProfilePhotos, {
  DefaultOperation,
  DefaultProfilePhoto,
  Operation,
  ProfilePhoto, ProfilePhotoArr,
} from 'src/pages/Profile/ProfilePhotos'
import { ProfileUiText } from 'src/pages/Profile/uiText'
import { ProfilePageValidation } from 'src/pages/Profile/validation'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { AsyncUtils } from 'src/utils/common/AsyncUtils'
import { MathUtils } from 'src/utils/common/NumberUtils'
import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { DateTime } from 'src/utils/DateTime'
import { FileUtils } from 'src/utils/file/FileUtils'
import { useFormFailures } from 'src/utils/form-validation/form/useFormFailures'
import { useFormSubmit } from 'src/utils/form-validation/form/useFormSubmit'
import { useFormToasts } from 'src/utils/form-validation/form/useFormToasts'
import ValidationComponentWrap from 'src/utils/form-validation/ValidationComponentWrap'
import { ActionUiText } from 'src/utils/lang/ui-values/ActionUiText'
import { useUiValues } from 'src/utils/lang/useUiText'
import { Progress } from 'src/utils/Progress'
import { useAsyncEffect } from 'src/utils/react/useAsyncEffect'
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import UseBottomSheetState from 'src/views/BottomSheet/UseBottomSheetState'
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
import * as uuid from 'uuid'
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
import photosComparator = ProfilePageValidation.photosComparator
import fetchToBlob = FileUtils.fetchToBlob
import blobToDataUrl = FileUtils.blobToDataUrl
import exists = TypeUtils.exists
import notExists = TypeUtils.notExists
import mapFirstToIfFoundBy = ArrayUtils.mapFirstToIfFoundBy
import findBy = ArrayUtils.findBy
import throttle = AsyncUtils.throttle
import ApiResponse = ApiUtils.ApiResponse
import AddProfilePhoto = UserApi.AddProfilePhoto
import mapRange = MathUtils.mapRange
import CurrentUserSuccessData = UserApi.CurrentUserSuccessData
import UpdateUserErrorData = UserApi.UpdateUserErrorData
import AddProfilePhotoErrorData = UserApi.AddProfilePhotoErrorData
import onPointerClick = ReactUtils.onPointerClick
import Setter = TypeUtils.Setter








export type ProfileContentProps = {
  setProfileHeader: Setter<string>
}


const ProfileContent =
React.memo(
(props: ProfileContentProps)=>{
  
  const reactId = useId()
  const [auth,setAuth] = useRecoilState(AuthRecoil)
  
  const uiText = useUiValues(ProfileUiText)
  const actionUiValues = useUiValues(ActionUiText)
  
  
  
  
  
  
  
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
      (values: FormValues, failedFields: (keyof FormValues)[])=>{
        const userToUpdate: UserToUpdate = {}
        let addPhotos = [] as AddProfilePhoto[]
        
        if (!failedFields.includes('name')){
          userToUpdate.name = values.name
        }
        if (!failedFields.includes('birthDate')){
          userToUpdate.birthDate =
            DateTime.from_yyyy_MM_dd(values.birthDate)!
              .set({ timezone: DateTime.fromDate(new Date()).timezone })
              .to_yyyy_MM_dd_HH_mm_ss_SSS_XXX()
        }
        if (!failedFields.includes('gender')){
          userToUpdate.gender = values.gender as GenderEnum
        }
        if (!failedFields.includes('aboutMe')){
          userToUpdate.aboutMe = values.aboutMe
        }
        
        if (!failedFields.includes('photos')){
          const [fwd] =
            ArrayUtils.diff(values.initialValues.photos, values.photos, photosComparator)
          userToUpdate.photos = {
            remove: fwd
              .map((to,from)=>({ to, from }))
              .filter(it=>notExists(it.to) && values.initialValues.photos[it.from].type==='remote')
              .map(it=>values.initialValues.photos[it.from].id),
            replace: fwd
              .map((to,from)=>({ to, from }))
              .filter(it=>exists(it.to) && it.to!==it.from
                && values.initialValues.photos[it.from].type==='remote'
              )
              .map(it=>({ id: values.initialValues.photos[it.from].id, index: it.to as number })),
          }
          addPhotos = values.photos
            .map((it,i)=>({ remoteIndex: i, photo: it }))
            .filter(it=>it.photo.type==='local' && it.photo.isCompressed)
            .map(it=>({
              id: it.photo.id,
              index: it.remoteIndex,
              name: it.photo.name,
              dataUrl: it.photo.dataUrl,
            }))
        }
        
        const apiPromise = new Promise<ApiResponse<
          CurrentUserSuccessData,
          UpdateUserErrorData | AddProfilePhotoErrorData
        >>(async (resolve, reject)=>{
          let updatedUser = null as null|CurrentUser
          
          let uploads = addPhotos.map(it=>({
            ...DefaultOperation,
            id: it.id,
            showProgress: false,
          }))
          setFormValues(s=>({ ...s,
            photos: ArrayUtils.combine(
              s.photos, uploads,
              (photo,upload)=>({ ...photo, upload } satisfies ProfilePhoto),
              (photo,upload)=>photo.id===upload.id
            )
          }))
          
          const setUpload = (upload: Operation)=>{
            setFormValues(s=>({ ...s,
              photos: mapFirstToIfFoundBy(
                s.photos,
                elem=>({ ...elem, upload }),
                elem=>elem.upload?.id===upload.id
              )
            }))
          }
          const delayTimerId = setTimeout(
            ()=>{
              uploads = uploads.map(it=>({ ...it, showProgress: true }))
              uploads.forEach(upload=>setUpload(upload))
            },
            2000
          )
          
          const applyUpdatedUser = ()=>{
            clearTimeout(delayTimerId)
            setFormValues(s=>({ ...s,
              photos: ArrayUtils.combine(
                s.photos, uploads,
                (photo,upload)=>(
                  { ...photo, upload: undefined } satisfies ProfilePhoto
                ),
                (photo,upload)=>photo.id===upload.id
              )
            }))
            const u = updatedUser
            if (u){
              // работает при условии, что во время обновления другой клиент не обновит фотки
              setFormValues(s=>({ ...s,
                photos: ArrayUtils.combine(
                  s.photos, values.photos,
                  (photo,usedPhoto)=>({
                    ...photo,
                    type: 'remote',
                    isDownloaded: usedPhoto.isDownloaded || usedPhoto.isCompressed,
                  } satisfies ProfilePhoto),
                  (photo,usedPhoto)=>photo.id===usedPhoto.id && usedPhoto.type==='local'
                )
              }))
              setFormValues(s=>({ ...s,
                photos: ArrayUtils.combine(
                  s.photos, values.photos,
                  (photo,usedPhoto,photoI,usedPhotoI)=>({
                    ...photo, remoteIndex: usedPhotoI
                  } satisfies ProfilePhoto),
                  (photo,usedPhoto)=>photo.remoteIndex===usedPhoto.remoteIndex
                )
              }))
              setAuth(s=>({
                accessToken: s?.accessToken ?? '',
                user: u,
              }))
            }
          }
          
          
          {
            const userUpdateResponse = await UserApi.update(userToUpdate)
            if (!userUpdateResponse.isSuccess) {
              reject(userUpdateResponse)
              return undefined
            }
            updatedUser = userUpdateResponse.data.user
          }
          
        
          for await (const photo of addPhotos){
            const getUpload = ()=>findBy(uploads,elem=>elem.id===photo.id).elem
            
            const updatePhotoNow = (p: Partial<ProfilePhoto>)=>{
              const upload = getUpload()
              if (upload) setFormValues(s=>({ ...s,
                photos: mapFirstToIfFoundBy(s.photos,
                  elem=>({...elem, ...p}),
                  elem=>elem.upload?.id===upload.id
                )
              }))
            }
            const updatePhoto = throttle(
              mapRange(Math.random(),[0,1],[1500,2000]),
              updatePhotoNow
            )
            
            const onProgress = (p:number|null)=>{
              //console.log(`progress ${photo.id} ${p}`)
              const upload = getUpload()
              if (upload) updatePhoto({ upload:
                { ...upload, progress: p??0 }
              })
            }
            const updatedUserResponse =
              await UserApi.addProfilePhoto(photo, { onProgress })
            updatePhotoNow({ upload: undefined })
            if (!updatedUserResponse.isSuccess){
              applyUpdatedUser()
              reject(updatedUserResponse)
              return undefined
            }
            updatedUser = updatedUserResponse.data.user
          }
          
          applyUpdatedUser()
          resolve({ isSuccess: true, data: { user: updatedUser } })
        })
        
        return apiPromise
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
          .length < ObjectKeys(userDefaultValues).length
      },
      []
    ),
    request, isLoading, isError,
    response, resetResponse,
  })
  
  
  
  
  
  const fieldIsInitial = useCallback(
    (field: keyof FormValues)=>failures
        .some(f=>f.type==='initial' && f.errorFields.includes(field)),
    [failures]
  )
  const anyFieldChanged = useMemo(
    ()=>failures.filter(f=>f.type==='initial')
        .length < ObjectKeys(userDefaultValues).length,
    [failures]
  )
  
  
  
  useEffect(
    ()=>{
      const u = auth?.user
      if (u) {
        setFormValues(s => {
          const newValues = { ...s, initialValues: { ...s.initialValues } }
          newValues.initialValues.name = u.name
          newValues.initialValues.birthDate = u.birthDate
          newValues.initialValues.gender = u.gender
          newValues.initialValues.aboutMe = u.aboutMe
          
          if (fieldIsInitial('name')) newValues.name = u.name
          if (fieldIsInitial('birthDate')) newValues.birthDate = u.birthDate
          if (fieldIsInitial('gender')) newValues.gender = u.gender
          if (fieldIsInitial('aboutMe')) newValues.aboutMe = u.aboutMe
          
          newValues.initialValues.photos = currentUserPhotosToProfilePhotos(u.photos)
          newValues.photos = [...s.photos]
          
          // we needn't take compression, because it is local
          // we needn't take upload, because it is local
          
          // get all downloads & downloaded data from same existing photos
          newValues.initialValues.photos = ArrayUtils.combine(
            newValues.initialValues.photos, [...s.initialValues.photos, ...s.photos],
            (initialPhoto, oldPhoto)=>({
              ...initialPhoto,
              dataUrl: oldPhoto.dataUrl,
              isDownloaded: oldPhoto.isDownloaded,
              download: oldPhoto.download,
            } satisfies ProfilePhoto),
            (a,b)=>a.id===b.id && !a.isEmpty && !b.isEmpty
          )
          
          // replace remote photos by new initial photos
          newValues.photos = newValues.photos.map(photo => {
            if (photo.type === 'remote') {
              //console.log('photo',photo)
              return {
                ...newValues.initialValues.photos[photo.remoteIndex],
                isCompressed: photo.isCompressed,
                compression: photo.compression,
              } satisfies ProfilePhoto
            }
            return photo
          })
          
          // stop operations for discarded photos
          ArrayUtils.diff2
          (s.initialValues.photos, newValues.photos, (a,b)=>a.id===b.id)[0]
          .forEach(diff => {
            if (!diff.toIsFound){
              diff.fromElem.download?.abort()
              diff.fromElem.compression?.abort()
            }
          })
          ArrayUtils.diff2
          (s.photos, newValues.photos, (a,b)=>a.id===b.id)[0]
          .forEach(diff => {
            if (!diff.toIsFound){
              diff.fromElem.download?.abort()
              diff.fromElem.compression?.abort()
            }
          })
          
          
          return newValues
        })
      }
    },
    [auth]
  )
  
  
  const resetAllFields = useCallback(
    ()=>setFormValues(s=>({ ...s, ...s.initialValues })),
    []
  )
  
  
  
  useEffect(()=>props.setProfileHeader(formValues.name), [formValues.name])
  
  
  
  
  useFormToasts({
    isLoading,
    loadingText: ActionUiText.saving,
    isSuccess,
    successText: ActionUiText.saved,
    failures: failures,
    setFailures: setFailures,
    failureCodeToUiText: mapFailureCodeToUiText,
  })
  
  
  
  
  /*
  useEffect(()=>{
    console.log('PROFILE_CONTENT_FAILURES',failures)
  },[failures])
   */
  
  
  // todo it retries endlessly if can't obtain photos
  useAsyncEffect(
    (lock,unlock)=>{
      //return;
      const serverPhotos = formValues.initialValues.photos
      const photos = formValues.photos
      ;[...serverPhotos,...photos].forEach(photo=>{
        if (!photo.isEmpty && photo.type==='remote' && !photo.isDownloaded
          && !photo.download && !photo.compression
          && lock(photo.remoteUrl)
        ){
          
          const abortCtrl = new AbortController()
          const downloadStart = {
            isDownloaded: false,
            download: { ...DefaultOperation,
              id: photo.id,
              abort: ()=>{
                console.log('download was aborted')
                unlock(photo.remoteUrl)
                abortCtrl.abort('download was aborted')
              },
            },
          } satisfies Partial<ProfilePhoto>
          
          setFormValues(s=>({ ...s,
            initialValues: { ...s.initialValues,
              photos: mapFirstToIfFoundBy(s.initialValues.photos,
                elem=>({...elem, ...downloadStart}),
                elem=>elem.id===photo.id
              ),
            },
            photos: mapFirstToIfFoundBy(s.photos,
              elem=>({...elem, ...downloadStart}),
              elem=>elem.id===photo.id
            ),
          }))
          
          const updatePhotosNow = (p: Partial<ProfilePhoto>)=>{
            setFormValues(s=>({ ...s,
              initialValues: { ...s.initialValues,
                photos: mapFirstToIfFoundBy(s.initialValues.photos,
                  elem=>({...elem, ...p}),
                  elem=>elem.download?.id===downloadStart.download.id
                ),
              },
              photos: mapFirstToIfFoundBy(s.photos,
                elem=>({...elem, ...p}),
                elem=>elem.download?.id===downloadStart.download.id
              ),
            }))
          }
          const updatePhotos = throttle(
            mapRange(Math.random(),[0,1],[1450,2000]),
            updatePhotosNow
          )
          
          ;(async()=>{
            try {
              const progress = new Progress(2,[90,10])
              const onProgress = (p: number|null)=>{
                progress.progress = p??0
                //console.log('progress', photo.id, progress.value)
                updatePhotos({ download: {
                  ...downloadStart.download,
                  progress: progress.value,
                } })
              }
              
              //console.log('start download id',photo.id)
              const blob = await fetchToBlob(photo.remoteUrl,
                { onProgress, abortCtrl }
              )
              abortCtrl.signal.throwIfAborted()
              
              progress.stage++
              progress.progress = 0
              const dataUrl = await blobToDataUrl(blob,
                { onProgress, abortCtrl }
              )
              abortCtrl.signal.throwIfAborted()
              
              //console.log('completed',photo.id)
              updatePhotosNow({ isDownloaded: true, download: undefined, dataUrl })
            }
            catch (ex){
              // TODO notify about error
              //console.log('download error', ex)
              //console.log('photo', photo)
              updatePhotosNow({ download: undefined })
            }
            finally {
              unlock(photo.remoteUrl)
            }
          })()
          
        }
      })
    },
    [formValues.initialValues.photos]
  )
  
  
  
  
  
  
  
  const genderOptions = useMemo(
    ()=>[
      {
        value: 'MALE',
        text: uiText.male.text,
      },{
        value: 'FEMALE',
        text: uiText.female.text,
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
        text: uiText.notSelected.text,
      },{
        value: 'ofGuys',
        text: uiText.ofGuys.text,
      },{
        value: 'ofGirls',
        text: uiText.ofGirls.text,
      },{
        value: 'ofGuysAndGirls',
        text: uiText.ofGuysAndGirls.text,
      }
    ] satisfies { value: PreferredPeopleOption, text: string }[],
    [uiText]
  )
  
  
  
  return <>
    <Form onSubmit={onFormSubmitCallback}>
      
      {/* <div css={css`
        position: fixed;
        top: 6px; right: 20px;
      `}>
        <Button css={ButtonStyle.roundedSmallAccent}>
          Просмотр
        </Button>
      </div> */}
      
      {/* <FormHeader>{uiText.profile.text}</FormHeader> */}
      
      <ProfileTabHeader thisTabIdx={1}/>
      
      
      <div css={css`
        ${col};
        gap: 0px;
      `}>
        
        <ValidationComponentWrap {...validationProps}
          fieldName="photos"
          render={props =>
          <ProfilePhotos
            images={props.value}
            setImages={props.setValue}
          />
          }
        />
        
        <div css={{ height: 24 }}/>
        
        <ItemContainer>
          <ItemTitleContainer>
            <ItemLabel
              /* onClick={ev=>{
                setImages([images[5],images[0],images[1],images[2],images[3],images[4]])
              }} */
              /* onClick={ev=>{
                setImages([images[0],undefined,images[2],images[3],images[4],images[5]])
              }} */
            >{uiText.aboutMe.text}</ItemLabel>
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
            render={props => <UseBool>{boolProps =>
              <>
                
                <OptionItem
                  icon={<NameCardIc css={css`height: 50%`}/>}
                  title={uiText.name.text}
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
                          <ItemLabel>{uiText.name.text}</ItemLabel>
                          <Input css={InputStyle.inputSmall}
                            autoFocus
                            placeholder={uiText.name.text.toLowerCase()}
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
          }</UseBool>}/>
          
          
          
          
          <ValidationComponentWrap {...validationProps}
            fieldName="birthDate"
            render={props => <UseBool>{boolProps =>
              <>
                
                <OptionItem
                  icon={<GiftBoxIc css={css`height: 50%`}/>}
                  title={uiText.birthDate.text}
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
                      <ItemLabel>{uiText.birthDate.text}</ItemLabel>
                      <Input css={InputStyle.inputSmall}
                        autoFocus
                        inputMode="numeric"
                        placeholder={uiText.birthDatePlaceholder.text.toLowerCase()}
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
            }</UseBool>}/>
          
          
          <ValidationComponentWrap {...validationProps}
            fieldName="gender"
            render={validProps =>
              <UseBool>{bool =>
                <>
                  
                  <UseFakePointerRef>{({ ref })=>
                    <OptionItem
                      icon={<GenderIc css={css`height: 50%`}/>}
                      title={uiText.gender.text}
                      value={genderOptions.find(opt => opt.value === validProps.value)?.text ?? ''}
                      nextIcon={<Arrow6NextIc css={css`height: 44%`}/>}
                      
                      //onClick={bool.setTrue}
                      ref={ref as any}
                      {...onPointerClick(bool.setTrue)}
                    />
                  }</UseFakePointerRef>
                  
                  <UseBottomSheetState
                    open={bool.value}
                    onClosed={bool.setFalse}
                  >
                    {sheetProps =>
                    <ModalPortal>
                      <BottomSheetBasic
                        {...sheetProps.sheetProps}
                        header={uiText.gender.text}
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
                    </ModalPortal>
                  }</UseBottomSheetState>
                </>
              }</UseBool>
            }
          />
          
          
          <OptionItem
            icon={<Search2Ic css={css`height: 50%`}/>}
            title={uiText.imLookingFor.text}
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
        >{actionUiValues.cancel.text}</Button>
      }
      { canSubmit && !isLoading &&
        <Button css={ButtonStyle.roundedSmallAccent}
          onClick={submit}
        >{actionUiValues.save.text}</Button>
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





function currentUserPhotosToProfilePhotos(photos: CurrentUser['photos']): ProfilePhotoArr {
  const profilePhotos: ProfilePhotoArr =
  ArrayUtils.ofIndices(6).map(i => ({
    ...DefaultProfilePhoto,
    type: 'remote',
    id: uuid.v4(),
    remoteIndex: i,
    isEmpty: true,
    isDownloaded: true,
  } satisfies ProfilePhoto))
  photos.forEach(it => {
    profilePhotos[it.index] = {
      ...DefaultProfilePhoto,
      type: 'remote',
      id: it.id,
      remoteIndex: it.index,
      name: it.name,
      mimeType: it.mimeType,
      remoteUrl: it.url,
      isDownloaded: false,
    } satisfies ProfilePhoto
  })
  return profilePhotos
}