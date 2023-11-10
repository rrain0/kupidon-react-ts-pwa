/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { UserApi } from 'src/api/requests/UserApi'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import { Pages } from 'src/components/Page/Pages'
import { PageScrollbarOverlayFrame } from 'src/components/Page/PageScrollbarOverlayFrame'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import UseScrollbars from 'src/components/Scrollbars/UseScrollbars'
import { AccountSettingsUiText } from 'src/pages/AccountSettings/AccountSettingsUiText'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { useUiTextContainer } from 'src/utils/lang/useUiText'
import { Themes } from 'src/utils/theme/Themes'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import Card from 'src/views/Card'
import DataField from 'src/views/DataField/DataField'
import { DataFieldStyle } from 'src/views/DataField/DataFieldStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import FloppyDisk1Ic = SimpleSvgIcons.FloppyDisk1Ic
import col = EmotionCommon.col
import textNormal = EmotionCommon.textNormal1
import textSmall1 = EmotionCommon.textSmall2
import Page = Pages.Page







const AccountSettingsPage = ()=>{
  
  const uiText = useUiTextContainer(AccountSettingsUiText)
  
  const [auth,setAuth] = useRecoilState(AuthRecoil)
  const resetAuth = useResetRecoilState(AuthRecoil)
  
  
  const fetchUser = async() => {
    const resp = await UserApi.current()
    if (resp.success)
      setAuth(curr=>({ ...curr!, user: resp.data.user }))
    else console.warn('Failed to fetch user:', resp)
  }
  useEffect(
    ()=>void fetchUser(),
    []
  )
  
  
  const [canSave, setCanSave] = useState(false)
  
  const {
    id,
    email,
    emailVerified,
    created,
    updated,
  } = auth!.user
  
  const logout = async() => {
    resetAuth()
  }
  
  
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
  }
  
  
  
  
  const pageRef = useRef<HTMLElement>(null)
  
  
  
  return <>
    
    <Page ref={pageRef}>
      <Form onSubmit={onSubmit}>
        
        <h3 css={formHeader}>{uiText.account[0].text}</h3>
        
        
        
        <Card>
          
          <ItemContainer>
            <ItemLabel>{uiText.id[0].text}</ItemLabel>
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
            <ItemLabel>{uiText.email[0].text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {email}
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiText.emailVerified[0].text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              { emailVerified
                ? uiText.yes[0].text.toLowerCase()
                : uiText.no[0].text.toLowerCase()
              }
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiText.userCreated[0].text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {new Date(created) + ''}
            </DataField>
          </ItemContainer>
          
          <ItemContainer>
            <ItemLabel>{uiText.userUpdated[0].text}</ItemLabel>
            <DataField css={DataFieldStyle.statikSmall}>
              {new Date(updated) + ''}
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
        
        <div css={notInCard}>
          <Button css={ButtonStyle.bigRectDanger}
            onClick={undefined}
          >
            {uiText.deleteAccount[0].text}
          </Button>
        </div>
      
      </Form>
    </Page>
    
    
    <PageScrollbarOverlayFrame>
      <UseScrollbars
        containerIsWindow={true}
        contentRef={pageRef}
        render={(
          { canScrollVertical, canScrollHorizontal, ...scrollbarProps }
        )=><ScrollbarOverlay css={ScrollbarOverlayStyle.page}
          {...scrollbarProps}
          showVertical={canScrollVertical}
          showHorizontal={canScrollHorizontal}
        />}
      />
    </PageScrollbarOverlayFrame>
    
    
    <BottomButtonBar
      css={css`
        padding-bottom: var(--bottom-nav-height);
      `}
    >
      
      {/* <Button css={ButtonStyle.icon}
       onClick={fetchUser}
       disabled={false}
       >
       <ArrowReload />
       </Button> */}
      
      <Button css={ButtonStyle.icon}
        onClick={undefined}
        disabled={!canSave}
      >
        <FloppyDisk1Ic />
      </Button>
    
    </BottomButtonBar>
    
  </>
}
export default AccountSettingsPage






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