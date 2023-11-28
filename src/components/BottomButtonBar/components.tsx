/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import SettingsButton from 'src/components/SettingsButton'
import UseBool from 'src/components/StateCarriers/UseBool'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { useBoolState } from 'src/utils/react/useBoolState'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import fixedBottom = EmotionCommon.fixedBottom
import row = EmotionCommon.row
import Mem = ReactUtils.Mem
import Arrow5FwdIc = SvgIcons.Arrow5FwdIc
import ArrowReloadIc = SvgIcons.ArrowReloadIc
import rotateKfs = EmotionCommon.rotateKfs
import fixedTop = EmotionCommon.fixedTop




export namespace ButtonBarComponents {
  
  
  
  export const TopButtonBarFrame = styled.section`
    pointer-events: none;
    ${fixedTop};
    //padding-bottom: var(--bottom-nav-height);
    display: grid;
    place-items: start stretch;
  `
  export const BottomButtonBarFrame = styled.section`
    pointer-events: none;
    ${fixedBottom};
    padding-bottom: var(--bottom-nav-height);
    display: grid;
    place-items: end stretch;
  `
  
  
  
  export const ButtonsContainer = styled.div`
    pointer-events: none;
    height: var(--bottom-button-bar-height);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    padding: 10px;
    gap: 10px;
    &>*{
      pointer-events: auto;
    }
  `
  
  export const LeftButtonsContainer = styled.div`
    pointer-events: none;
    height: 100%;
    ${row};
    align-items: center;
    justify-content: start;
    gap: 10px;
    &>*{
      pointer-events: auto;
    }
  `
  export const CenterButtonsContainer = styled.div`
    pointer-events: none;
    height: 100%;
    ${row};
    align-items: center;
    gap: 10px;
    &>*{
      pointer-events: auto;
    }
  `
  export const RightButtonsContainer = styled.div`
    pointer-events: none;
    height: 100%;
    ${row};
    align-items: center;
    justify-content: end;
    gap: 10px;
    &>*{
      pointer-events: auto;
    }
  `
  
  
  
  
  
  export const SettingsBtn = Mem(()=>{
    return <UseBool render={props=><>
      <SettingsButton onClick={props.setTrue}/>
      <QuickSettings open={props.value} setOpen={props.setValue}/>
    </>}/>
  })
  
  
  export const BackBtn = Mem(()=>{
    const navigate = useNavigate()
    const back = useCallback(
      ()=>navigate(-1),
      [navigate]
    )
    
    return <Button css={ButtonStyle.iconTransparent}
      onClick={back}
    >
      <Arrow5FwdIc css={css`rotate: 0.5turn;`} />
    </Button>
  })
  
  
  export const RefreshBtn = Mem(()=>{
    
    const [isReloading, , doReloading] = useBoolState(false)
    
    useEffect(
      ()=>{
        if (isReloading) window.location.reload()
      },
      [isReloading]
    )
    
    
    return <Button css={ButtonStyle.iconTransparent}
      onClick={doReloading}
    >
      <ArrowReloadIc css={isReloading && css`&.rrainuiIcon {
      animation: ${rotateKfs} 650ms linear infinite;
    }`}/>
    </Button>
  })
  
}