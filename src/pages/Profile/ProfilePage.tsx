/** @jsxImportSource @emotion/react */
import { EmotionCommon } from 'src/styles/EmotionCommon'
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
import React, { useEffect, useState } from 'react'
import { ProfileMockData } from './MockData'
import { SheetSnapPoints, SheetState } from 'src/components/BottomSheet/useBottomSheet'
import row = EmotionCommon.row
import { ScrollbarOverlayStyle } from 'src/components/ScrollbarOverlay/ScrollbarOverlayStyle'
import ScrollbarOverlay from 'src/components/ScrollbarOverlay/ScrollbarOverlay'
import BottomSheetBasic from 'src/components/BottomSheet/BottomSheetBasic'
import { ReactUtils } from 'src/utils/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped;
import { FormPage } from 'src/components/Page/FormPage'
import Page = FormPage.Page
import PageContent = FormPage.PageContent
import ProfileImages from './ProfileImages'
import DataField from '../../components/DataField/DataField';
import { DataFieldStyle } from '../../components/DataField/DataFieldStyle';
import RadioInput from '../../components/Inputs/RadioInput';
import { RadioInputStyle } from '../../components/Inputs/RadioInputStyle';
import Card from '../../components/Card';
import Button from '../../components/Buttons/Button';
import { ButtonStyle } from '../../components/Buttons/ButtonStyle';




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
  const [preferredGenders, setPreferredGenders] = useState('Не выбрано')
  const [selecting, setSelecting] = useState(
    undefined as undefined|'items'|'preferred-genders'
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
          
          
          <ProfileImages
            images={images}
            setImages={setImages}
          />
          
          
          <Card>
            <fieldset
              css={css`display: contents;`}
            >
              
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
                  setSelecting('items')
                }}
              >
                {selectedItem}
              </div>
              
              {selecting === 'items' && <BottomSheetBasic
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
            
            </fieldset>
          
            
            <fieldset
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
                
                <DataField
                  css={DataFieldStyle.dataField}
                  onClick={ev=>setSelecting('preferred-genders')}
                  role='listbox'
                >
                  {preferredGenders}
                </DataField>
                
                {selecting==='preferred-genders' && <BottomSheetBasic
                  {...bottomSheetProps}
                  header={'Я ищу'}
                >
                  <div
                    css={css`
                      ${col};
                      padding-bottom: 20px;
                    `}
                  >
                    {
                      ['Не выбрано','Парней','Девушек','Парней и девушек']
                        .map(v=><RadioInput
                          css={RadioInputStyle.radio}
                          childrenPosition='start'
                          role='option'
                          aria-selected={v===preferredGenders}
                          checked={v===preferredGenders}
                          value={v}
                          key={v}
                          onChange={ev=>{
                            setPreferredGenders(v)
                            setBottomSheetState('closing')
                          }}
                        >
                          <div
                            css={css`
                              flex: 1;
                              padding-top: 4px;
                              padding-bottom: 4px;
                            `}
                          >{v}</div>
                        </RadioInput>)
                    }
                    
                  </div>
                </BottomSheetBasic>}
              </div>
            </fieldset>
            
            
            <InfoItem>id: {auth.user.id}</InfoItem>
            <InfoItem>email: {auth.user.email}</InfoItem>
            <InfoItem>email верифицирован: {auth.user.emailVerified+''}</InfoItem>
            <InfoItem>создан: {new Date(auth.user.created)+''}</InfoItem>
            <InfoItem>обновлён: {new Date(auth.user.updated)+''}</InfoItem>
            <InfoItem>Имя: {auth.user.firstName}</InfoItem>
            <InfoItem>Фамилия: {auth.user.lastName}</InfoItem>
            <InfoItem>Дата рождения: {auth.user.birthDate}</InfoItem>
            <InfoItem>Пол: {auth.user.sex==='MALE' ? 'М' : 'Ж'}</InfoItem>
          </Card>
          
          <Button css={ButtonStyle.primary}
            onClick={update}
          >
            Обновить
          </Button>
          <Button css={ButtonStyle.primary}
            onClick={logout}
          >
            Выйти
          </Button>
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


