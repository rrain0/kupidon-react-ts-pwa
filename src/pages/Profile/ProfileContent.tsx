/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { ProfileMockData } from 'src/pages/Profile/MockData'
import ProfileImages from 'src/pages/Profile/ProfileImages'
import { ProfileUiOptions } from 'src/pages/Profile/ProfileUiOptions'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { Setter } from 'src/utils/common/TypeUtils'
import { useUiOptionsContainer } from 'src/utils/lang/useUiOptions'
import { Themes } from 'src/utils/theme/Themes'
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import { SheetSnapPoints, SheetState } from 'src/views/BottomSheet/useBottomSheet'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import Card from 'src/views/Card'
import DataField from 'src/views/DataField/DataField'
import { DataFieldStyle } from 'src/views/DataField/DataFieldStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import RadioInput from 'src/views/Inputs/RadioInput/RadioInput'
import { RadioInputStyle } from 'src/views/Inputs/RadioInput/RadioInputStyle'
import Textarea from 'src/views/Textarea/Textarea'
import { TextareaStyle } from 'src/views/Textarea/TextareaStyle'
import FloppyDisk1Ic = SimpleSvgIcons.FloppyDisk1Ic
import row = EmotionCommon.row
import center = EmotionCommon.center
import col = EmotionCommon.col
import textNormal = EmotionCommon.textNormal1
import textSmall1 = EmotionCommon.textSmall2





export type ProfileContentProps = {
  setCanSave?: Setter<boolean> | undefined,
}
const ProfileContent = (props: ProfileContentProps)=>{
  
  
  const [auth,setAuth] = useRecoilState(AuthRecoil)
  const resetAuth = useResetRecoilState(AuthRecoil)
  
  const {
    id,
    email,
    emailVerified,
    created,
    updated,
    firstName,
    lastName,
    birthDate,
    sex,
  } = auth!.user
  
  const logout = async() => {
    resetAuth()
  }
  
  
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
  }
  
  
  
  const [sheetState, setSheetState] = useState<SheetState>('closed')
  const [sheetSnaps] = useState<SheetSnapPoints>(
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
  
  
  useEffect(
    ()=>{
      props.setCanSave?.(preferredPeople!=='notSelected')
    },
    [preferredPeople]
  )
  
  
  const bottomSheetProps = {
    state: sheetState,
    setState: setSheetState,
    snapPoints: sheetSnaps,
    snapIdx: snapIdx,
    setSnapIdx: setSnapIdx,
  }
  
  const [images, setImages] = useState(ProfileMockData.userImages)
  
  
  const uiOptions = useUiOptionsContainer(ProfileUiOptions)
  
  
  
  
  return <Form onSubmit={onSubmit}>
    
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
          {id}
        </DataField>
      </ItemContainer>
      
      <ItemContainer>
        <ItemLabel>{uiOptions.email[0].text}</ItemLabel>
        <DataField css={DataFieldStyle.statikSmall}>
          {email}
        </DataField>
      </ItemContainer>
      
      <ItemContainer>
        <ItemLabel>{uiOptions.emailVerified[0].text}</ItemLabel>
        <DataField css={DataFieldStyle.statikSmall}>
          { emailVerified
            ? uiOptions.yes[0].text.toLowerCase()
            : uiOptions.no[0].text.toLowerCase()
          }
        </DataField>
      </ItemContainer>
      
      <ItemContainer>
        <ItemLabel>{uiOptions.userCreated[0].text}</ItemLabel>
        <DataField css={DataFieldStyle.statikSmall}>
          {new Date(created) + ''}
        </DataField>
      </ItemContainer>
      
      <ItemContainer>
        <ItemLabel>{uiOptions.userUpdated[0].text}</ItemLabel>
        <DataField css={DataFieldStyle.statikSmall}>
          {new Date(updated) + ''}
        </DataField>
      </ItemContainer>
      
      <ItemContainer>
        <ItemLabel>{uiOptions.name[0].text}</ItemLabel>
        <DataField css={DataFieldStyle.statikSmall}>
          {firstName}
        </DataField>
      </ItemContainer>
      
      <ItemContainer>
        <ItemLabel>{uiOptions.lastName[0].text}</ItemLabel>
        <DataField css={DataFieldStyle.statikSmall}>
          {lastName}
        </DataField>
      </ItemContainer>
      
      <ItemContainer>
        <ItemLabel>{uiOptions.birthDate[0].text}</ItemLabel>
        <DataField css={DataFieldStyle.statikSmall}>
          {birthDate}
        </DataField>
      </ItemContainer>
      
      <ItemContainer>
        <ItemLabel>{uiOptions.sex[0].text}</ItemLabel>
        <DataField css={DataFieldStyle.statikSmall}>
          {sex === 'MALE'
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
      <Button css={ButtonStyle.bigRectPrimary}
        onClick={logout}
      >
        {uiOptions.signOut[0].text}
      </Button>
    </div>
  
  </Form>
}
export default ProfileContent






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