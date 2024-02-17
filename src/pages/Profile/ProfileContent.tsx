/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { ApiUtils } from 'src/api/ApiUtils'
import { CurrentUser } from 'src/api/entity/CurrentUser'
import { GenderEnum } from 'src/api/entity/GenderEnum'
import { UserApi } from 'src/api/requests/UserApi'
import { useApiRequest } from 'src/api/useApiRequest'
import Form from 'src/components/FormElements/Form'
import ItemContainer from 'src/components/FormElements/ItemContainer'
import ItemLabel from 'src/components/FormElements/ItemLabel'
import ItemTitleContainer from 'src/components/FormElements/ItemTitleContainer'
import ProfileContentBirthDate from 'src/pages/Profile/profile-content/ProfileContentBirthDate'
import ProfileContentGender from 'src/pages/Profile/profile-content/ProfileContentGender'
import ProfileContentImLookingFor
  from 'src/pages/Profile/profile-content/ProfileContentImLookingFor'
import ProfileContentName from 'src/pages/Profile/profile-content/ProfileContentName'
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
import { AuthRecoil, AuthStateType } from 'src/recoil/state/AuthRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { AsyncUtils } from 'src/utils/common/AsyncUtils'
import { MathUtils } from 'src/utils/common/NumberUtils'
import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { DateTime } from 'src/utils/DateTime'
import { FileUtils } from 'src/utils/file/FileUtils'
import { useFormFailures } from 'src/utils/form-validation/hooks/useFormFailures'
import { useFormSubmit } from 'src/utils/form-validation/hooks/useFormSubmit'
import { useFormToasts } from 'src/utils/form-validation/hooks/useFormToasts'
import { useFormValuesProps } from 'src/utils/form-validation/hooks/useFormValuesProps'
import ValidationWrap from 'src/utils/form-validation/ValidationWrap'
import { ActionUiText } from 'src/utils/lang/ui-values/ActionUiText'
import { useUiValues } from 'src/utils/lang/useUiText'
import { Progress } from 'src/utils/Progress'
import { useAsyncEffect } from 'src/utils/react/useAsyncEffect'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import Card2 from 'src/views/Card2'
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
import fixedTop = EmotionCommon.fixedTop
import photosComparator = ProfilePageValidation.photosComparator
import fetchToBlob = FileUtils.fetchToBlob
import blobToDataUrl = FileUtils.blobToDataUrl
import mapFirstToIfFoundBy = ArrayUtils.mapFirstToIfFoundBy
import findBy = ArrayUtils.findBy
import throttle = AsyncUtils.throttle
import ApiResponse = ApiUtils.ApiResponse
import AddProfilePhoto = UserApi.AddProfilePhoto
import mapRange = MathUtils.mapRange
import CurrentUserSuccessData = UserApi.CurrentUserSuccessData
import UpdateUserErrorData = UserApi.UpdateUserErrorData
import AddProfilePhotoErrorData = UserApi.AddProfilePhotoErrorData
import Setter = TypeUtils.Setter
import SetterOrUpdater = TypeUtils.SetterOrUpdater







export type ProfileContentProps = {
  setProfileHeader: Setter<string>
}


const ProfileContent =
React.memo(
(props: ProfileContentProps)=>{
  
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
      (values: FormValues, failedFields: (keyof FormValues)[])=>
        profileUpdateApiRequest(values,failedFields,setFormValues,setAuth),
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
  
  
  
  const { formProps, valuesProps } = useFormValuesProps(
    formValues, setFormValues, userDefaultValues, failures
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
          
          if (valuesProps.name.isInitial) newValues.name = u.name
          if (valuesProps.birthDate.isInitial) newValues.birthDate = u.birthDate
          if (valuesProps.gender.isInitial) newValues.gender = u.gender
          if (valuesProps.aboutMe.isInitial) newValues.aboutMe = u.aboutMe
          
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
            if (diff.isRemoved){
              diff.fromElem.download?.abort()
              diff.fromElem.compression?.abort()
            }
          })
          ArrayUtils.diff2
          (s.photos, newValues.photos, (a,b)=>a.id===b.id)[0]
          .forEach(diff => {
            if (diff.isRemoved){
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
        
        <ValidationWrap {...validationProps}
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
          <ValidationWrap {...validationProps}
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
          
          
          <ValidationWrap {...validationProps}
            fieldName="name"
            render={validProps => <ProfileContentName {...validProps}/>}
          />
          
          
          <ValidationWrap {...validationProps}
            fieldName="birthDate"
            render={validProps => <ProfileContentBirthDate {...validProps}/>}
          />
          
          
          <ValidationWrap {...validationProps}
            fieldName="gender"
            render={validProps => <ProfileContentGender {...validProps}/> }
          />
          
          
          <ProfileContentImLookingFor/>
          
          
        </Card2>
      
      </div>
      
    </Form>
    
    { (canSubmit || formProps.hasChanges) && <TopButtonBarFrame>
      { formProps.hasChanges &&
        <Button css={ButtonStyle.roundedSmallSecondary}
          onClick={formProps.resetUserFields}
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





const profileUpdateApiRequest = (
  values: FormValues,
  failedFields: (keyof FormValues)[],
  setFormValues: SetterOrUpdater<FormValues>,
  setAuth: SetterOrUpdater<AuthStateType>
)=>{
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
      ArrayUtils.diff2(values.initialValues.photos, values.photos, photosComparator)
    userToUpdate.photos = {
      remove: fwd
        .filter(it=>it.isRemoved && it.fromElem.type==='remote')
        .map(it=>it.fromElem.id),
      replace: fwd
        .filter(it=>it.isReplaced && it.fromElem.type==='remote')
        .map(it=>({ id: it.fromElem.id, index: it.toIdx })),
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
}







const currentUserPhotosToProfilePhotos =
(photos: CurrentUser['photos']): ProfilePhotoArr => {
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


