/** @jsxImportSource @emotion/react */
import { useRecoilState } from 'recoil'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import React from 'react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import row = EmotionCommon.row




function AppPage(){
  const [theme, setTheme] = useRecoilState(ThemeRecoil)
  
  const changeTheme = ()=>{
    switch (theme.type){
      case 'light': setTheme(v=>({ ...v, type: 'dark' })); break
      case 'dark': default: setTheme(v=>({ ...v, type: 'light' })); break
    }
  }
  
  return <>
    <SomeSettings>
      <button onClick={changeTheme}>Тема</button>
    </SomeSettings>
  </>
}
export default AppPage



const SomeSettings = styled.div`
  position: fixed;
  bottom: 0; right: 0;
  padding: 6px;
  ${row};
  justify-content: end;
`