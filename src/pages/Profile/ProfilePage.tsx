/** @jsxImportSource @emotion/react */
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import styled from '@emotion/styled'
import { useRecoilState, useResetRecoilState } from 'recoil'
import col = EmotionCommon.col
import { css } from '@emotion/react'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { UserApi } from 'src/api/requests/UserApi'
import { Navigate, useMatch, useSearchParams } from 'react-router-dom'
import { Themes } from 'src/theme/Themes'
import React, { useEffect, useState } from 'react'
import { RouteBuilder } from 'src/utils-react/route-builder/RouteBuilder'
import Textarea from 'src/views/Textarea/Textarea'
import { TextareaStyle } from 'src/views/Textarea/TextareaStyle'
import { ProfileMockData } from './MockData'
import { SheetSnapPoints, SheetState } from 'src/views/BottomSheet/useBottomSheet'
import row = EmotionCommon.row
import { ScrollbarOverlayStyle } from 'src/components/ScrollbarOverlay/ScrollbarOverlayStyle'
import ScrollbarOverlay from 'src/components/ScrollbarOverlay/ScrollbarOverlay'
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import { ReactUtils } from 'src/utils/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped;
import { FormPage } from 'src/components/Page/FormPage'
import Page = FormPage.Page
import PageContent = FormPage.PageContent
import ProfileImages from './ProfileImages'
import DataField from 'src/views/DataField/DataField'
import { DataFieldStyle } from 'src/views/DataField/DataFieldStyle'
import RadioInput from 'src/views/Inputs/RadioInput'
import { RadioInputStyle } from 'src/views/Inputs/RadioInputStyle'
import Card from 'src/views/Card'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import textNormal = EmotionCommon.textNormal1
import textSmall1 = EmotionCommon.textSmall1
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import center = EmotionCommon.center
import rowWrap = EmotionCommon.rowWrap
import FloppyDisk1Ic = SimpleSvgIcons.FloppyDisk1Ic
import ArrowReload = SimpleSvgIcons.ArrowReload
import abs = EmotionCommon.abs
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import path = RouteBuilder.path
import fullAllowedNameParams = RouteBuilder.fullAllowedNameParams
import fullAnySearchParams = RouteBuilder.fullAnySearchParams




// todo должен показывать инфу в зависимости от id в url
function ProfilePage(){
  const [searchParams] = useSearchParams()
  
  const [auth,setAuth] = useRecoilState(AuthRecoil)
  const resetAuth = useResetRecoilState(AuthRecoil)
  
  const urlUserId = useMatch(RootRoute.profile.id.userId[full]())!
    .params[RootRoute.profile.id.userId[path].slice(1)]
  
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
  
  
  
  const [sheetState, setSheetState] = useState<SheetState>('closed')
  const [sheetSnaps, setSheetSnaps] = useState<SheetSnapPoints>(
    [0,200,'fit-content','50%','80%']
  )
  const [snapIdx,setSnapIdx] = useState(2)
  const openIdx = 2
  
  
  const [preferredGenders, setPreferredGenders] = useState('Не выбрано')
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
  
  
  const bottomSheetProps = {
    state: sheetState,
    setState: setSheetState,
    snapPoints: sheetSnaps,
    snapIdx: snapIdx,
    setSnapIdx: setSnapIdx,
  }
  
  /*
  useEffect(()=>{
    console.log('sheetState',sheetState)
  },[sheetState])
  useEffect(()=>{
    console.log('selecting',selecting)
  },[selecting])
  */
  
  
  const [images, setImages] = useState(ProfileMockData.userImages)
  
  // todo вынести в ProfileRouting
  if (!auth || auth.user.id!==urlUserId) return <Navigate to={
    RootRoute.login[fullAllowedNameParams]({
      returnPath: RootRoute.profile[fullAnySearchParams](searchParams)
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
            
              
            <ItemContainer>
              <ItemLabel>id</ItemLabel>
              <DataField css={[
                DataFieldStyle.statikSmall,
                css`&.rrainuiFrame{
                  ${textSmall1};
                }`
              ]}
              >
                {auth.user.id}
              </DataField>
            </ItemContainer>
            
            <ItemContainer>
              <ItemLabel>Email</ItemLabel>
              <DataField css={DataFieldStyle.statikSmall}>
                {auth.user.email}
              </DataField>
            </ItemContainer>
            
            <ItemContainer>
              <ItemLabel>Email верифицирован</ItemLabel>
              <DataField css={DataFieldStyle.statikSmall}>
                {auth.user.emailVerified ? 'да' : 'нет'}
              </DataField>
            </ItemContainer>
            
            <ItemContainer>
              <ItemLabel>Пользователь создан</ItemLabel>
              <DataField css={DataFieldStyle.statikSmall}>
                {new Date(auth.user.created)+''}
              </DataField>
            </ItemContainer>
            
            <ItemContainer>
              <ItemLabel>Пользователь обновлён</ItemLabel>
              <DataField css={DataFieldStyle.statikSmall}>
                {new Date(auth.user.updated)+''}
              </DataField>
            </ItemContainer>
            
            <ItemContainer>
              <ItemLabel>Имя</ItemLabel>
              <DataField css={DataFieldStyle.statikSmall}>
                {auth.user.firstName}
              </DataField>
            </ItemContainer>
            
            <ItemContainer>
              <ItemLabel>Фамилия</ItemLabel>
              <DataField css={DataFieldStyle.statikSmall}>
                {auth.user.lastName}
              </DataField>
            </ItemContainer>
            
            <ItemContainer>
              <ItemLabel>Дата рождения</ItemLabel>
              <DataField css={DataFieldStyle.statikSmall}>
                {auth.user.birthDate}
              </DataField>
            </ItemContainer>
            
            <ItemContainer>
              <ItemLabel>Пол</ItemLabel>
              <DataField css={DataFieldStyle.statikSmall}>
                {auth.user.sex==='MALE' ? 'Мужской' : 'Женский'}
              </DataField>
            </ItemContainer>
            
            <ItemContainer>
              <ItemLabel>Обо мне</ItemLabel>
              <Textarea css={TextareaStyle.textareaSmall}/>
            </ItemContainer>
            
            
            <ItemContainer>
              <div
                css={css`
                  ${row};
                  gap: 6px;
                `}
              >
                <ItemLabel>Я ищу</ItemLabel>
                { preferredGenders!=='Не выбрано' && <div
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
                    css={t=>css`svg&{ --icon-color: ${t.icon.warning.color[0]} }`}
                  />
                </div>}
              </div>
              
              <DataField
                css={DataFieldStyle.interactiveSmall}
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
                          setSheetState('closing')
                        }}
                        onClick={ev=>{
                          setPreferredGenders(v)
                          setSheetState('closing')
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
              
              
            </ItemContainer>
            
          </Card>
          
          <div css={notInCard}>
            <Button css={ButtonStyle.buttonPrimary}
              onClick={logout}
            >
              Выйти
            </Button>
          </div>
          
        </Form>
        
      </PageContent>
    </ScrollbarOverlay>
    
    
    
    <BottomButtonBar>
      
      <Button css={ButtonStyle.icon}
        onClick={update}
        disabled={false}
      >
        <ArrowReload />
      </Button>
      
      <Button css={ButtonStyle.icon}
        onClick={undefined}
        disabled={preferredGenders==='Не выбрано'}
      >
        <FloppyDisk1Ic />
      </Button>
      
    </BottomButtonBar>
    
    
    
  </Page>
}

export default ReactMemoTyped(ProfilePage)




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
  line-height: 1.5em; // for icon
  color: ${p=>p.theme.page.text[0]}
`

const notInCard = css`
  ${col};
  gap: inherit;
  padding: 0 12px;
`


