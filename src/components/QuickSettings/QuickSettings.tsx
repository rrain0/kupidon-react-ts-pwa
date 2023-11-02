/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { QuickSettingsUiOptions } from 'src/components/QuickSettings/QuickSettingsUiOptions'
import { AppRecoil } from 'src/recoil/state/AppRecoil'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import { Themes } from 'src/utils/theme/Themes'
import { CountryFlag } from 'src/utils/lang/CountryFlag'
import { useUiOptionsContainer } from 'src/utils/lang/useUiOptions'
import { SheetState } from 'src/views/BottomSheet/useBottomSheet'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import RadioInput from 'src/views/Inputs/RadioInput/RadioInput'
import { RadioInputGroup } from 'src/views/Inputs/RadioInput/RadioInputGroup'
import { RadioInputStyle } from 'src/views/Inputs/RadioInput/RadioInputStyle'
import { Lang, LangRecoil, LangSettingsRecoil } from 'src/recoil/state/LangRecoil'
import { ThemeRecoil, ThemeSettingsRecoil } from 'src/recoil/state/ThemeRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Setter = TypeUtils.Setter
import col = EmotionCommon.col
import row = EmotionCommon.row
import Theme = Themes.Theme
import BrowserIc = SimpleSvgIcons.BrowserIc
import DayIc = SimpleSvgIcons.DayIc
import DayNightIc = SimpleSvgIcons.DayNightIc
import AddModuleIc = SimpleSvgIcons.AddModuleIc
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import ClearSiteConfirmation from 'src/components/ClearSiteConfirmation/ClearSiteConfirmation'
import LockIc = SimpleSvgIcons.LockIc
import GearIc = SimpleSvgIcons.GearIc
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import Mem = ReactUtils.Mem
import MoonIc = SimpleSvgIcons.MoonIc
import ThemeType = Themes.ThemeType
import resetH = EmotionCommon.resetH




const sheetSnaps = [0,'20%','free','fit-content','free','50%','free','80%']
const openIdx = 3

export type SettingsProps = {
  open: boolean
  setOpen: Setter<boolean>
}
const QuickSettings = (props: SettingsProps)=>{
  const auth = useRecoilValue(AuthRecoil)
  
  const [sheetState, setSheetState] = useState<SheetState>('closed')
  const [snapIdx,setSnapIdx] = useState(openIdx)
  
  const app = useRecoilValue(AppRecoil)
  const lang = useRecoilValue(LangRecoil)
  const theme = useRecoilValue(ThemeRecoil)
  const [themeSettings, setThemeSettings] = useRecoilState(ThemeSettingsRecoil)
  const [langSettings, setLangSettings] = useRecoilState(LangSettingsRecoil)
  
  
  const [clearSite, setClearSite] = useState(false)
  
  
  const uiOptions = useUiOptionsContainer(QuickSettingsUiOptions)
  
  
  const themeOptions = useMemo(
    ()=>{
      let opts = [
        {
          value: 'system',
          text: uiOptions.systemTheme[0].text,
        },{
          value: 'light',
          text: uiOptions.lightTheme[0].text,
        },{
          value: 'dark',
          text: uiOptions.darkTheme[0].text,
        }
      ] satisfies { value: ThemeType|'system', text: string }[]
      if (!theme.systemThemeAvailable) opts = opts.filter(it=>it.value!=='system')
      return opts
    },
    [uiOptions, theme.systemThemeAvailable]
  )
  const onThemeOptionChecked = useCallback(
    function (value: ThemeType|'system') {
      return themeSettings.setting === 'system' && value === 'system'
        || themeSettings.setting !== 'system' && value === themeSettings.manualSetting
    },
    [themeSettings]
  )
  
  
  const languageOptions = useMemo(
    ()=>{
      let opts = [
        {
          value: 'system',
          text: uiOptions.systemLanguage[0].text,
        },{
          value: 'ru-RU',
          text: uiOptions.russian[0].text,
        },{
          value: 'en-US',
          text: uiOptions.english[0].text,
        }
      ] satisfies { value: Lang|'system', text: string }[]
      if (!lang.availableSystemLangs?.length) opts = opts.filter(it=>it.value!=='system')
      return opts
    },
    [uiOptions, lang.availableSystemLangs]
  )
  const onLanguageOptionChecked = useCallback(
    function (value: Lang|'system') {
      return langSettings.setting === 'system' && value === 'system'
        || langSettings.setting !== 'system' && value === langSettings.manualSetting?.[0]
    },
    [langSettings]
  )
  
  
  
  
  
  useEffect(()=>{
    if (props.open){
      setSheetState('opening')
      setSnapIdx(openIdx)
    }
  },[props.open])
  useEffect(()=>{
    if (sheetState==='closed'){
      props.setOpen(false)
    }
  },[props.setOpen, sheetState])
  
  
  const bottomSheetProps = {
    state: sheetState,
    setState: setSheetState,
    snapPoints: sheetSnaps,
    snapIdx: snapIdx,
    setSnapIdx: setSnapIdx,
  }
  
  
  return <>
    {props.open && <BottomSheetBasic
      {...bottomSheetProps}
      header={uiOptions.settings[0].text}
    >
      <Content>
        
        <OptionHeader>
          {uiOptions.theme[0].text}:
        </OptionHeader>
        <RadioInputGroup>
          {
            themeOptions.map(opt => <RadioInput
              css={RadioInputStyle.radio}
              childrenPosition="start"
              checked={onThemeOptionChecked(opt.value)}
              value={opt.value}
              key={opt.value}
              onChange={ev => {
                setThemeSettings(s => ({
                  ...s,
                  setting: opt.value === 'system' ? 'system' : 'manual',
                  manualSetting: opt.value === 'system' ? s.manualSetting : opt.value,
                }))
              }}
            >
              <OptionContainer>
                {opt.value === 'system' && <DayNightIc css={icon}/>}
                {opt.value === 'light' && <DayIc css={icon}/>}
                {opt.value === 'dark' && <MoonIc css={iconSmall}/>}
                {opt.text}
              </OptionContainer>
            </RadioInput>)
          }
        </RadioInputGroup>
        
        
        <OptionHeader>
          {uiOptions.language[0].text}:
        </OptionHeader>
        <RadioInputGroup>
          {
            languageOptions.map(opt => <RadioInput
              css={RadioInputStyle.radio}
              childrenPosition="start"
              checked={onLanguageOptionChecked(opt.value)}
              value={opt.value}
              key={opt.value}
              onChange={ev => {
                if (opt.value === 'system') setLangSettings({
                  ...langSettings,
                  setting: 'system',
                })
                else {
                  setLangSettings({
                    setting: 'manual',
                    manualSetting: [opt.value],
                  })
                }
              }}
            >
              <OptionContainer>
                {opt.value !== 'system' && <Flag src={CountryFlag[opt.value]}/>}
                {opt.value === 'system' && <BrowserIc css={icon}/>}
                {opt.text}
              </OptionContainer>
            </RadioInput>)
          }
        </RadioInputGroup>
        
        <RoundButtonsContainer>
          
          { auth && <Link to={RootRoute.settings.account[full]()}>
            <Button css={normalIconRoundButton}
              onClick={()=>setSheetState('closing')}
            >
              <LockIc css={[
                icon,
                css`translate: 0 -0.1em;`,
              ]}/>
              {uiOptions.accountSettings[0].text}
            </Button>
          </Link> }
          
          <Link to={RootRoute.settings.app[full]()}>
            <Button css={normalIconRoundButton}
              onClick={()=>setSheetState('closing')}
            >
              <GearIc css={icon} />
              {uiOptions.appSettings[0].text}
            </Button>
          </Link>
          
          <Link to={RootRoute.test[full]()}>
            <Button css={normalIconRoundButton}
              onClick={()=>setSheetState('closing')}
            >
              {uiOptions.testPage[0].text}
            </Button>
          </Link>
          
          {app.canInstall && <Button css={normalIconRoundButton}
            onClick={async()=>{
              const installed = await promptInstall()
              console.log('installed', installed)
            }}
          >
            <AddModuleIc css={icon}/>
            {uiOptions.installApp[0].text}
          </Button>}
          
          <Button css={ButtonStyle.roundedDanger}
            onClick={() => setClearSite(true)}
          >
            {uiOptions.clearAppData[0].text}
          </Button>
        
        </RoundButtonsContainer>
      
      
      </Content>
    </BottomSheetBasic>}
    
    <ClearSiteConfirmation open={clearSite} setOpen={setClearSite} />
    
  </>
}
export default Mem(QuickSettings)



const Content = styled.div`
  ${col};
  padding-bottom: 20px;
`

const OptionHeader = styled.h5`
  ${resetH};
  padding: 8px 6px;
`
const OptionContainer = styled.div`
  flex: 1;
  padding-top: 4px;
  padding-bottom: 4px;
  ${row};
  gap: 0.3em;
  align-items: center;
`
const Flag = styled.img`
  width: 1.333em;
  aspect-ratio: 4/3;
  object-position: center;
  object-fit: cover;
  vertical-align: middle;
`
const icon = (t:Theme)=>css`
  &.rrainuiIcon {
    height: 1.3em;
    width: 1.333em;
    --icon-color: var(--color);
  }
`
const iconSmall = (t:Theme)=>css`
  ${icon(t)};
  &.rrainuiIcon {
    height: 1.25em;
  }
`
const RoundButtonsContainer = styled.div`
  ${col};
  align-items: center;
  gap: 10px;
`
const normalIconRoundButton = (t:Theme)=>css`
  ${ButtonStyle.roundedNormal(t)};
  &.rrainuiButton {
    min-width: 90px;
    gap: 0.6em;
  }
`




