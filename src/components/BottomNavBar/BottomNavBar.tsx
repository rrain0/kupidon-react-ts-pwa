/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import QuickSettings from 'src/components/BottomNavBar/QuickSettings/QuickSettings'
import { SimpleSvgIcons } from 'src/components/icons/SimpleSvgIcons'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { Themes } from 'src/theme/Themes'
import row = EmotionCommon.row
import centerAll = EmotionCommon.centerAll
import col = EmotionCommon.col
import resetButton = EmotionCommon.resetButton
import CardsHeartIc = SimpleSvgIcons.CardsHeartIc
import onHover = EmotionCommon.onHover
import RootRoutes = AppRoutes.RootRoutes
import Theme = Themes.Theme
import ProfileIc = SimpleSvgIcons.ProfileIc
import GearIc = SimpleSvgIcons.GearIc



const BottomNavBar = ()=>{
  const [theme, setTheme] = useRecoilState(ThemeRecoil)
  
  /*
  const changeTheme = useCallback(
    ()=>setTheme({
      ...theme,
      type: function(){
        switch (theme.type){
          case 'light': return 'dark'
          case 'dark': default: return 'light'
        }
      }()
    }),
    [theme]
  )
  */
  
  const [settingsOpen, setSettingsOpen] = useState(false)
  
  
  
  
  return <>
    
    <Frame>
      
      <NavLink to={RootRoutes.main.fullPath()}>
        <NavButton>
          <CardsHeartIc css={navButtonIcon}/>
          <div css={navButtonText}>Найти пары</div>
        </NavButton>
      </NavLink>
      
      <NavLink to={RootRoutes.profile.fullPath()}>
        <NavButton>
          <ProfileIc css={navButtonIcon}/>
          <div css={navButtonText}>Профиль</div>
        </NavButton>
      </NavLink>
      
      <NavButton
        onClick={() => setSettingsOpen(true)}
      >
        <GearIc css={navButtonIcon}/>
        <div css={navButtonText}>Настройки</div>
      </NavButton>
    
    </Frame>
    
    <QuickSettings open={settingsOpen} setOpen={setSettingsOpen}/>
    
  </>
}
export default BottomNavBar



const Frame = styled.nav`
  width: 100%;
  height: 50px;
  min-height: 50px;
  ${row};
  justify-content: space-between;
  background: ${p=>p.theme.nav.bgc[0]};
`

const NavButton = styled.button`
  ${resetButton};
  height: 100%;
  flex: 1;
  ${col};
  align-items: center;
  gap: 2px;
  padding: 6px 0 2px;
  ${onHover(css`
    cursor: pointer;
  `)};
`
const navButtonIcon = (t: Theme)=>css`
  &.rrainuiIcon {
    --icon-size: 100%;
    --icon-color: ${t.nav.text[0]};
  }
  a.active &.rrainuiIcon {
    --icon-color: ${t.nav.selected.text[0]};
  }
`
const navButtonText = (t: Theme)=>css`
  color: ${t.nav.text[0]};
  font-weight: 400;
  font-size: 10px;
  line-height: 129%;
  a.active & {
    color: ${t.nav.selected.text[0]};
  }
`
