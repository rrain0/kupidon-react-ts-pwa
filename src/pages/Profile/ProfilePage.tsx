/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useState } from 'react'
import { ApiUtils } from 'src/api/ApiUtils'
import { CurrentUser } from 'src/api/entity/CurrentUser'
import { GenderEnum } from 'src/api/entity/GenderEnum'
import { useApiRequest } from 'src/api/useApiRequest'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import { ButtonBarComponents } from 'src/components/BottomButtonBar/components'
import Form from 'src/components/FormElements/Form'
import OverflowWrapper from 'src/components/Scrollbars/OverflowWrapper'
import { OverflowWrapperStyle } from 'src/components/Scrollbars/OverflowWrapperStyle'
import Preview from 'src/pages/Profile/Preview/Preview'
import Profile from 'src/pages/Profile/Profile/Profile'
import { useRecoilState } from 'recoil'
import ProfilePageTabHeader, { ProfilePageTabHeaderContext } from 'src/pages/Profile/ProfilePageTabHeader'
import {
  DefaultOperation,
  DefaultProfilePhoto,
  Operation,
  ProfilePhoto,
} from 'src/pages/Profile/ProfilePhotoModels'
import { ProfilePageValidation } from 'src/pages/Profile/validation'
import { AuthRecoil, AuthStateType } from 'src/recoil/state/AuthRecoil'
import { UserApi } from 'src/api/requests/UserApi'
import { Pages } from 'src/components/Page/Pages'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
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
import { ActionUiText } from 'src/utils/lang/ui-values/ActionUiText'
import { Progress } from 'src/utils/Progress'
import { useAsyncEffect } from 'src/utils/react/useAsyncEffect'
import Tab from 'src/views/Tabs/Tab'
import Tabs from 'src/views/Tabs/Tabs'
import { TabsState } from 'src/views/Tabs/useTabs'
import UseTabsState from 'src/views/Tabs/UseTabsState'
import * as uuid from 'uuid'
import SoftRefreshBtn = ButtonBarComponents.SoftRefreshBtn
import TabsPage = Pages.TabsPage
import safePageContentPaddings = Pages.safePageContentPaddings
import fill = EmotionCommon.fill
import blobToDataUrl = FileUtils.blobToDataUrl
import fetchToBlob = FileUtils.fetchToBlob
import mapRange = MathUtils.mapRange
import throttle = AsyncUtils.throttle
import mapFirstToIfFoundBy = ArrayUtils.mapFirstToIfFoundBy
import mapFailureCodeToUiText = ProfilePageValidation.mapFailureCodeToUiText
import validators = ProfilePageValidation.validators
import defaultValues = ProfilePageValidation.defaultValues
import FormValues = ProfilePageValidation.FormValues
import AddProfilePhotoErrorData = UserApi.AddProfilePhotoErrorData
import UpdateUserErrorData = UserApi.UpdateUserErrorData
import CurrentUserSuccessData = UserApi.CurrentUserSuccessData
import ApiResponse = ApiUtils.ApiResponse
import photosComparator = ProfilePageValidation.photosComparator
import SetterOrUpdater = TypeUtils.SetterOrUpdater
import UserToUpdate = UserApi.UserToUpdate
import AddProfilePhoto = UserApi.AddProfilePhoto
import userDefaultValues = ProfilePageValidation.userDefaultValues
import ObjectKeys = ObjectUtils.ObjectKeys
import findBy = ArrayUtils.findBy
import PageContentPaddings = Pages.PageContentPaddings











const ProfilePage =
React.memo(
()=>{
  
  
  
  
  
  
  const [auth,setAuth] = useRecoilState(AuthRecoil)
  
  
  
  
  
  
  
  
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
  
  
  
  
  
  
  
  
  
  
  
  const [needToFetchUser, setNeedToFetchUser] = useState(true)
  const [isFetchingUser, setFetchingUser] = useState(false)
  useAsyncEffect(
    (lock,unlock)=>{
      if (needToFetchUser && !isFetchingUser
        && lock(UserApi.current)
      ){
        setNeedToFetchUser(false)
        setFetchingUser(true)
        ;(async()=>{
          try {
            const resp = await UserApi.current()
            if (resp.isSuccess)
              setAuth(curr=>({ ...curr!, user: resp.data.user }))
            else
              console.warn('failed to fetch user:', resp)
          }
          finally {
            setFetchingUser(false)
            unlock(UserApi.current)
          }
        })()
      }
    },
    [needToFetchUser, isFetchingUser]
  )
  
  
  
  
  return <>
    <TabsPage>
      
      <UseTabsState initialIdx={1}>{tabsProps=><>
        <Tabs css={fill} {...tabsProps}>{({ tabContainerSpring, computedTabsDimens }) => <>
          {ArrayUtils.ofIndices(4).map(tabIdx =>
            <Tab css={fill} key={tabIdx}
              width={computedTabsDimens.frameWidth}
            >
              
              
            <OverflowWrapper css={css`
              ${OverflowWrapperStyle.defolt};
              ${OverflowWrapperStyle.El.container.thiz()}{
                touch-action: pan-y;
              }
              ${OverflowWrapperStyle.El.scrollbarOverlay.thiz()}{
                ${safePageContentPaddings};
              }
            `}
              showVertical={!(['dragging', 'snapping'] as TabsState[]).includes(tabsProps.tabsState)}
            >
                  
              <ProfilePageTabHeaderContext.Provider value={{
                tabContainerSpring,
                tabWidth: computedTabsDimens.frameWidth,
                headers: ['Предпросмотр', formValues.name, 'Партнёр', 'Свидание'],
                setTabsState: tabsProps.setTabsState,
                setTabIdx: tabsProps.setTabIdx,
              }}>
              {function(){
                switch (tabIdx) {
                  case 0:
                    return <Preview formValues={formValues}/>
                  case 1:
                    return <Profile
                      validationProps={validationProps}
                      onFormSubmitCallback={onFormSubmitCallback}
                      submit={submit}
                      canSubmit={canSubmit}
                      formProps={formProps}
                      isLoading={isLoading}
                    />
                  case 2:
                    return <PageContentPaddings>
                      <Form><ProfilePageTabHeader thisTabIdx={2}/></Form>
                    </PageContentPaddings>
                  case 3:
                    return <PageContentPaddings>
                      <Form><ProfilePageTabHeader thisTabIdx={3}/></Form>
                    </PageContentPaddings>
                }
              }()}
              </ProfilePageTabHeaderContext.Provider>
              
            </OverflowWrapper>
            
            
            </Tab>
          )}
        </>}</Tabs>
      
      
      
      { process.env.NODE_ENV==='development' && tabsProps.tabIdx===1 && <BottomButtonBar
        refreshPageBtn
        rightChildren={
          <SoftRefreshBtn
            refresh={()=>setNeedToFetchUser(true)}
            isLoading={isFetchingUser}
          />
        }
      /> }
      
      </>}</UseTabsState>
      
    </TabsPage>
    
    
    
    
    
    
  
  </>
})
export default ProfilePage





const currentUserPhotosToProfilePhotos =
(photos: CurrentUser['photos']): ProfilePhoto[] => {
  const profilePhotos: ProfilePhoto[] =
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


