/** @jsxImportSource @emotion/react */
import { EmotionCommon } from 'src/styles/EmotionCommon'
import center = EmotionCommon.center
import styled from '@emotion/styled'
import { useRecoilState, useResetRecoilState } from 'recoil'
import col = EmotionCommon.col
import { css } from '@emotion/react'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { UserApi } from 'src/api/requests/UserApi'
import { Navigate, useMatch, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import RootRoutes = AppRoutes.RootRoutes
import { Theme } from 'src/theme/Theme'
import React, { useEffect, useRef, useState } from 'react'
import rowWrap = EmotionCommon.rowWrap
import { ProfileMockData } from './MockData'
import BottomSheet from 'src/components/BottomSheet/BottomSheet'
import { SheetSnapPoints, SheetState } from 'src/components/BottomSheet/useBottomSheet'
import row = EmotionCommon.row
import { PinkGrainyGradientBgc } from 'src/styles/bgc/PinkGrainyGradientBgc'
import { ScrollbarOverlayStyle } from 'src/components/ScrollbarOverlay/ScrollbarOverlayStyle'
import ScrollbarOverlay from 'src/components/ScrollbarOverlay/ScrollbarOverlay'
import BottomSheetBasic from '../../components/BottomSheet/BottomSheetBasic';
import { ReactUtils } from '../../utils/ReactUtils';
import ReactMemoTyped = ReactUtils.ReactMemoTyped;
import { SimpleGradientBgc } from '../../styles/bgc/SimpleGradientBgc';
import { FormPage } from '../../components/Page/FormPage';
import Page = FormPage.Page;
import PageContent = FormPage.PageContent;




// todo должен показывать инфу в зависимости от id в url
function ProfilePage(){
  const [searchParams] = useSearchParams()
  
  const [auth,setAuth] = useRecoilState(AuthRecoil)
  const resetAuth = useResetRecoilState(AuthRecoil)
  
  // @ts-ignore
  const urlUserId = useMatch(RootRoutes.profile.id.userId.fullPath())
    .params[RootRoutes.profile.id.userId.path.slice(1)]
  
  const logout = async() => {
    resetAuth()
  }
  const update = async() => {
    try {
      const resp = await UserApi.current()
      setAuth(curr=>({ ...curr!, user: resp.data.user }))
    } catch (e) {
      console.warn(e)
    }
  }
  
  
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
  }
  
  
  
  const [bottomSheetState, setBottomSheetState] =
    useState<SheetState>('closed')
  const [bottomSheetSnapPoints, setBottomSheetSnapPoints] =
    useState<SheetSnapPoints>([0,200,'fit-content','50%','80%'])
  const [snapIdx,setSnapIdx] =
    useState(2)
  const openIdx = 2
  
  
  const [selectedItem, setSelectedItem] = useState('Select Item')
  const [peopleIPrefer, setPeopleIPrefer] = useState('Не выбрано')
  const [selecting, setSelecting] = useState(
    undefined as undefined|'items'|'people-i-prefer'
  )
  useEffect(()=>{
    if (selecting){
      setBottomSheetState('opening')
      setSnapIdx(openIdx)
    }
  },[selecting])
  useEffect(()=>{
    if (bottomSheetState==='closed'){
      setSelecting(undefined)
    }
  },[bottomSheetState])
  
  
  const bottomSheetProps = {
    state: bottomSheetState,
    setState: setBottomSheetState,
    snapPoints: bottomSheetSnapPoints,
    snapIdx: snapIdx,
    setSnapIdx: setSnapIdx,
    setSelectedItem: setSelectedItem,
  }
  
  
  
  
  const [images, setImages] = useState(ProfileMockData.userImages)
  
  // todo вынести в ProfileRouting
  if (!auth || auth.user.id!==urlUserId) return <Navigate to={
    RootRoutes.login.fullPath({
      returnPath: RootRoutes.profile.fullPath3({ urlSearchParams: searchParams })
    })
  }/>
  
  return <Page>
    <ScrollbarOverlay css={ScrollbarOverlayStyle.page}>
      <PageContent>
        <Form onSubmit={onSubmit}>
          
          <h3 css={formHeader}>Профиль</h3>
          
          
          <div css={t=>css`
            ${rowWrap};
            gap: 6px;
            padding: 16px;
            border-radius: 16px;
            background: ${t.page.bgc[1]}77;
          `}>
            { images.map(im=><div
                
                draggable
                onDragStart={ev=>{
                  ev.dataTransfer.setData('text/plain',im)
                }}
                
                onDragOver={ev=>{
                  ev.preventDefault()
                  ev.dataTransfer.dropEffect = 'move'
                }}
                onDrop={ev=>{
                  ev.preventDefault()
                  const data = ev.dataTransfer.getData('text/plain')
                  const thisImIdx = images.findIndex(val=>val===im)
                  const droppedImIdx = images.findIndex(val=>val===data)
                  const newImages = [...images]
                  newImages[thisImIdx] = data
                  newImages[droppedImIdx] = im
                  setImages(newImages)
                }}
                
                key={im}
                css={css`
                width: 100px; height: 100px;
                ${center};
                border-radius: 6px;
                overflow: hidden;
              `}
              >
                <img
                  src={im}
                  css={css`
                  width: 100%; height: 100%;
                  object-position: center;
                  object-fit: cover;
                `}
                />
              </div>
            ) }
          </div>
          
          
          
          <div
            css={css`display: contents;`}
          >
            
            <div
              css={t=>css`
              width: 200px;
              height: 50px;
              border-radius: 16px;
              border: 2px solid ${t.page.text[0]};
              ${row};
              padding: 0 10px;
              align-items: center;
              cursor: pointer;
            `}
              onClick={ev=>{
                setSelecting('items')
              }}
            >
              {selectedItem}
            </div>
            
            { selecting==='items' && <BottomSheetBasic
              {...bottomSheetProps}
              header={'Select Item'}
            >
              <div
                css={css`
                  ${col};
                  gap: 10px;
                `}
              >
                {
                  [...Array(12).keys()]
                    .map(i => <div
                      css={css`
                        cursor: pointer;
                      `}
                      key={i}
                      onClick={() => {
                        setSelectedItem(`Item ${i + 1}`)
                        setBottomSheetState('closing')
                      }}
                    >
                      Item {i + 1}
                    </div>)
                }
              </div>
            </BottomSheetBasic>}
            
          </div>
          
          
          
          <div
            css={css`display: contents;`}
          >
            
            <div
              css={css`
                ${col};
                gap: 10px;
              `}
            >
              <div>
                Я ищу
              </div>
              
              <div
                css={t => css`
                  width: 200px;
                  height: 50px;
                  border-radius: 16px;
                  border: 2px solid ${t.page.text[0]};
                  ${row};
                  padding: 0 10px;
                  align-items: center;
                  cursor: pointer;
                `}
                onClick={ev => {
                  setSelecting('people-i-prefer')
                }}
              >
                {peopleIPrefer}
              </div>
              
              {selecting==='people-i-prefer' && <BottomSheetBasic
                {...bottomSheetProps}
                header={'Я ищу'}
              >
                <div
                  css={css`
                    ${col};
                    gap: 10px;
                  `}
                >
                  {
                    ['Не выбрано','Парней','Девушек','Парней и девушек']
                      .map(v => <div
                        css={css`
                          cursor: pointer;
                        `}
                        key={v}
                        onClick={() => {
                          setPeopleIPrefer(v)
                          setBottomSheetState('closing')
                        }}
                      >
                        {v}
                      </div>)
                  }
                </div>
              </BottomSheetBasic>}
            </div>
          </div>
          
          
          {/*<label>
            <div>Сесуальная ориентация</div>
            <select>
              <option value=''>Не выбрано</option>
              <option value='hetero'>Натурал</option>
              <option value='pervert'>Извращуга</option>
            </select>
          </label>*/}
          
          <InfoItem>id: {auth.user.id}</InfoItem>
          <InfoItem>email: {auth.user.email}</InfoItem>
          <InfoItem>email верифицирован: {auth.user.emailVerified+''}</InfoItem>
          <InfoItem>создан: {new Date(auth.user.created)+''}</InfoItem>
          <InfoItem>обновлён: {new Date(auth.user.updated)+''}</InfoItem>
          <InfoItem>Имя: {auth.user.firstName}</InfoItem>
          <InfoItem>Фамилия: {auth.user.lastName}</InfoItem>
          <InfoItem>Дата рождения: {auth.user.birthDate}</InfoItem>
          <InfoItem>Пол: {auth.user.sex==='MALE' ? 'М' : 'Ж'}</InfoItem>
          <button
            onClick={update}
            css={css`
              width: 100%;
              height: 40px;
              font: 500 10px/129% Roboto;
              color: white;
            `}
          >
            Обновить
          </button>
          <button
            onClick={logout}
            css={css`
              width: 100%;
              height: 40px;
              font: 500 10px/129% Roboto;
              color: white;
            `}
          >
            Выйти
          </button>
        </Form>
        
      </PageContent>
    </ScrollbarOverlay>
  </Page>
}

export default ReactMemoTyped(ProfilePage)




const Form = styled.form`
  max-width: 500px;
  width: 100%;
  ${col};
  gap: 16px;
`

const formHeader = (theme: Theme.Theme) => css`
  font: 500 28px/150% Roboto;
  letter-spacing: 0.05em;
  color: ${theme.page.text[0]};
  align-self: center;
`


const InfoItem = styled.div`
  font: 500 10px/129% Roboto;
  color: ${p=>p.theme.page.text};
`


