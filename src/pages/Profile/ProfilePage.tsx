/** @jsxImportSource @emotion/react */
import { AppRoutes } from 'src/app-routes/AppRoutes'
import BottomButtonBar, {
  bottomButtonBarHeight,
} from 'src/components/BottomButtonBar/BottomButtonBar'
import { bottomNavBarHeight } from 'src/components/BottomNavBar/BottomNavBar'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import { ProfileUiOptions } from 'src/pages/Profile/ProfileUiOptions'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import styled from '@emotion/styled'
import { useRecoilState, useResetRecoilState } from 'recoil'
import col = EmotionCommon.col
import { css } from '@emotion/react'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { UserApi } from 'src/api/requests/UserApi'
import { Navigate, useMatch, useSearchParams } from 'react-router-dom'
import { Themes } from 'src/theme/Themes'
import React, { useEffect, useRef, useState } from 'react'
import { useUiOptionObject } from 'src/utils/lang/useUiOptions'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import { useContainerScrollState } from 'src/views/Scrollbar/useContainerScrollState'
import Textarea from 'src/views/Textarea/Textarea'
import { TextareaStyle } from 'src/views/Textarea/TextareaStyle'
import { ProfileMockData } from './MockData'
import { SheetSnapPoints, SheetState } from 'src/views/BottomSheet/useBottomSheet'
import row = EmotionCommon.row
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped;
import { Pages } from 'src/components/Page/Pages'
import Page = Pages.Page
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
import FloppyDisk1Ic = SimpleSvgIcons.FloppyDisk1Ic
import ArrowReload = SimpleSvgIcons.ArrowReloadIc
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
  
  
  const bottomSheetProps = {
    state: sheetState,
    setState: setSheetState,
    snapPoints: sheetSnaps,
    snapIdx: snapIdx,
    setSnapIdx: setSnapIdx,
  }
  
  
  const pageRef = useRef<HTMLElement>(null)
  
  const {
    canScrollHorizontal,
    canScrollVertical,
    ...scrollbarProps
  } = useContainerScrollState({
    containerIsWindow: true,
    contentRef: pageRef,
  })
  
  
  const [images, setImages] = useState(ProfileMockData.userImages)
  
  
  const uiOptions = useUiOptionObject(ProfileUiOptions)
  
  
  // todo вынести в ProfileRouting
  if (!auth || auth.user.id!==urlUserId) return <Navigate to={
    RootRoute.login[fullAllowedNameParams]({
      returnPath: RootRoute.profile[fullAnySearchParams](searchParams)
    })
  }/>
  
  
  return <>
    <Page
      ref={pageRef}
      css={css`
        padding-bottom: calc(${bottomNavBarHeight}px + ${bottomButtonBarHeight}px);
      `}
    >
        
      <Form onSubmit={onSubmit}>
        
        <h3 css={formHeader}>{uiOptions.profile[0].text}</h3>
        
        
        <ProfileImages
          images={images}
          setImages={setImages}
        />
        
        
        <Card>
          
          
          <ItemContainer>
            <ItemLabel>{uiOptions.id[0].text}</ItemLabel>
            <DataField css={[
              DataFieldStyle.statikSmall,
              css`&.rrainuiFrame {
                ${textSmall1};
              }`,
            ]}
            >
              {auth.user.id}
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiOptions.email[0].text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {auth.user.email}
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiOptions.emailVerified[0].text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {auth.user.emailVerified ? 'да' : 'нет'}
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiOptions.userCreated[0].text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {new Date(auth.user.created) + ''}
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiOptions.userUpdated[0].text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {new Date(auth.user.updated) + ''}
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiOptions.name[0].text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {auth.user.firstName}
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiOptions.lastName[0].text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {auth.user.lastName}
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiOptions.birthDate[0].text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {auth.user.birthDate}
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiOptions.sex[0].text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {auth.user.sex === 'MALE'
                ? uiOptions.male[0].text
                : uiOptions.female[0].text
              }
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiOptions.aboutMe[0].text}</ItemLabel>
            <Textarea css={TextareaStyle.textareaSmall}/>
          </ItemContainer>
          
          
          <ItemContainer>
            <div
              css={css`
                ${row};
                gap: 6px;
              `}
            >
              <ItemLabel>{uiOptions.imLookingFor[0].text}</ItemLabel>
              {preferredPeople!=='notSelected' && <div
                css={t => css`
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
              onClick={ev => setSelecting('preferred-genders')}
              role="listbox"
            >
              {uiOptions.preferredPeople.find(it=>it.value===preferredPeople)?.text}
            </DataField>
            
            
            {selecting === 'preferred-genders' && <BottomSheetBasic
              {...bottomSheetProps}
              header={uiOptions.imLookingFor[0].text}
            >
              <div
                css={css`
                  ${col};
                  padding-bottom: 20px;
                `}
              >
                {
                  uiOptions.preferredPeople
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
            </BottomSheetBasic>}
          
          
          </ItemContainer>
        
        </Card>
        
        <div css={notInCard}>
          <Button css={ButtonStyle.buttonPrimary}
            onClick={logout}
          >
            {uiOptions.signOut[0].text}
          </Button>
        </div>
      
      </Form>
        
      
    </Page>
    
    
    
    <div
      css={css`
        position: fixed;
        top: 0; right: 0; bottom: ${bottomNavBarHeight}px; left: 0;
        pointer-events: none;
      `}
    >
      <ScrollbarOverlay css={ScrollbarOverlayStyle.page}
        {...scrollbarProps}
        showVertical={canScrollVertical}
        showHorizontal={canScrollHorizontal}
      />
    </div>
    
    
    <BottomButtonBar
      css={css`
        padding-bottom: ${bottomNavBarHeight}px;
      `}
    >
      
      <Button css={ButtonStyle.icon}
        onClick={update}
        disabled={false}
      >
        <ArrowReload />
      </Button>
      
      <Button css={ButtonStyle.icon}
        onClick={undefined}
        disabled={preferredPeople==='notSelected'}
      >
        <FloppyDisk1Ic />
      </Button>
    
    </BottomButtonBar>
    
  
  </>
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


