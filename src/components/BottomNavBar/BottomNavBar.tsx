/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
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
        <Button css={ButtonStyle.nav}>
          <CardsHeartIc/>
          <div>Найти пары</div>
        </Button>
      </NavLink>
      
      <NavLink to={RootRoutes.profile.fullPath()}>
        <Button css={ButtonStyle.nav}>
          <ProfileIc/>
          <div>Профиль</div>
        </Button>
      </NavLink>
      
      <Button css={ButtonStyle.nav}
        onClick={()=>setSettingsOpen(true)}
      >
        <GearIc/>
        <div>Настройки</div>
      </Button>
    
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