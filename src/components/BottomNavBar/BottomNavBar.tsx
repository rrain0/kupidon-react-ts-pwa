/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import row = EmotionCommon.row
import centerAll = EmotionCommon.centerAll



const BottomNavBar = ()=>{
  const [theme, setTheme] = useRecoilState(ThemeRecoil)
  
  
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
  
  
  return <Frame>
    <div
      css={css`
        flex: 1;
        ${centerAll};
      `}
    >
      навбар приложения
    </div>
    <button
      css={css`
        ${centerAll};
        padding: 6px;
      `}
      onClick={changeTheme}
    >
      Тема
    </button>
  </Frame>
}
export default BottomNavBar



const Frame = styled.nav`
  width: 100%;
  height: 50px;
  min-height: 50px;
  ${row};
  background: ${p=>p.theme.nav.bgc[0]};
`
