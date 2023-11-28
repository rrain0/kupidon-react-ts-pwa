/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import { QuickSettingsUiText } from 'src/components/QuickSettings/uiText'
import UseBool from 'src/components/StateCarriers/UseBool'
import { AppRecoil } from 'src/recoil/state/AppRecoil'
import { AuthRecoil } from 'src/recoil/state/AuthRecoil'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import { Themes } from 'src/utils/theme/Themes'
import { CountryFlag } from 'src/utils/lang/CountryFlag'
import { useUiTextContainer } from 'src/utils/lang/useUiText'
import UseModalSheetState from 'src/views/BottomSheet/UseModalSheetState'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
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
import BrowserIc = SvgIcons.BrowserIc
import DayIc = SvgIcons.DayIc
import DayNightIc = SvgIcons.DayNightIc
import AddModuleIc = SvgIcons.AddModuleIc
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import ClearSiteConfirmation from 'src/components/ClearSiteConfirmation/ClearSiteConfirmation'
import LockIc = SvgIcons.LockIc
import GearIc = SvgIcons.GearIc
import RootRoute = AppRoutes.RootRoute
import full = RouteBuilder.full
import Mem = ReactUtils.Mem
import MoonIc = SvgIcons.MoonIc
import ThemeType = Themes.ThemeType
import resetH = EmotionCommon.resetH




const sheetSnaps = [0,'20%','free','fit-content','free','50%','free','80%']
const sheetOpenIdx = 3


export type SettingsProps = {
  open: boolean
  setOpen: Setter<boolean>
}
const QuickSettings = (props: SettingsProps)=>{
  const { open, setOpen } = props
  
  const auth = useRecoilValue(AuthRecoil)
  
  
  const app = useRecoilValue(AppRecoil)
  const lang = useRecoilValue(LangRecoil)
  const theme = useRecoilValue(ThemeRecoil)
  const [themeSettings, setThemeSettings] = useRecoilState(ThemeSettingsRecoil)
  const [langSettings, setLangSettings] = useRecoilState(LangSettingsRecoil)
  
  
  
  
  const uiText = useUiTextContainer(QuickSettingsUiText)
  
  
  const themeOptions = useMemo(
    ()=>{
      let opts = [
        {
          value: 'system',
          text: uiText.systemTheme[0].text,
        },{
          value: 'light',
          text: uiText.lightTheme[0].text,
        },{
          value: 'dark',
          text: uiText.darkTheme[0].text,
        }
      ] satisfies { value: ThemeType|'system', text: string }[]
      if (!theme.systemThemeAvailable) opts = opts.filter(it=>it.value!=='system')
      return opts
    },
    [uiText, theme.systemThemeAvailable]
  )
  const isThemeOptionChecked = useCallback(
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
          text: uiText.systemLanguage[0].text,
        },{
          value: 'ru-RU',
          text: uiText.russian[0].text,
        },{
          value: 'en-US',
          text: uiText.english[0].text,
        }
      ] satisfies { value: Lang|'system', text: string }[]
      if (!lang.availableSystemLangs?.length) opts = opts.filter(it=>it.value!=='system')
      return opts
    },
    [uiText, lang.availableSystemLangs]
  )
  const isLanguageOptionChecked = useCallback(
    function (value: Lang|'system') {
      return langSettings.setting === 'system' && value === 'system'
        || langSettings.setting !== 'system' && value === langSettings.manualSetting?.[0]
    },
    [langSettings]
  )
  
  
  
  
  

  
  
  return <>
    <UseModalSheetState
      open={open}
      setOpen={setOpen}
      snapPoints={sheetSnaps}
      openIdx={sheetOpenIdx}
      render={props => open && <BottomSheetBasic
        {...props.sheetProps}
        header={uiText.settings[0].text}
      >
        <Content>
          
          <OptionHeader>
            {uiText.theme[0].text}:
          </OptionHeader>
          <RadioInputGroup>
            {
              themeOptions.map(opt => <RadioInput
                css={RadioInputStyle.radio}
                childrenPosition="start"
                checked={isThemeOptionChecked(opt.value)}
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
            {uiText.language[0].text}:
          </OptionHeader>
          <RadioInputGroup>
            {
              languageOptions.map(opt => <RadioInput
                css={RadioInputStyle.radio}
                childrenPosition="start"
                checked={isLanguageOptionChecked(opt.value)}
                value={opt.value}
                key={opt.value}
                onChange={ev => {
                  if (opt.value==='system') setLangSettings({
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
            
            {auth && <Link to={RootRoute.settings.account[full]()}>
              <Button css={normalIconRoundButton}
                onClick={props.setClosing}
              >
                <LockIc css={[
                  icon,
                  css`translate: 0 -0.1em;`,
                ]}/>
                {uiText.accountSettings[0].text}
              </Button>
            </Link>}
            
            <Link to={RootRoute.settings.app[full]()}>
              <Button css={normalIconRoundButton}
                onClick={props.setClosing}
              >
                <GearIc css={icon}/>
                {uiText.appSettings[0].text}
              </Button>
            </Link>
            
            <Link to={RootRoute.test[full]()}>
              <Button css={normalIconRoundButton}
                onClick={props.setClosing}
              >
                {uiText.testPage[0].text}
              </Button>
            </Link>
            
            {app.canInstall && <Button css={normalIconRoundButton}
              onClick={async()=>await promptInstall()}
            >
              <AddModuleIc css={icon}/>
              {uiText.installApp[0].text}
            </Button>}
            
            <UseBool render={props => <>
              <Button css={ButtonStyle.roundedDanger}
                onClick={props.setTrue}
              >
                {uiText.clearAppData[0].text}
              </Button>
              <ClearSiteConfirmation open={props.value} setOpen={props.setValue}/>
            </>}/>
          
          
          </RoundButtonsContainer>
        
        
        </Content>
      </BottomSheetBasic>}
    />
    
    
    
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
  ${SvgIcStyle.El.icon} {
    height: 1.3em;
    width: 1.333em;
    ${SvgIcStyle.Prop.color}: var(${ButtonStyle.Prop.color});
  }
`
const iconSmall = (t:Theme)=>css`
  ${icon(t)};
  ${SvgIcStyle.El.icon} {
    height: 1.25em;
  }
`
const RoundButtonsContainer = styled.div`
  ${col};
  align-items: center;
  gap: 10px;
`
const normalIconRoundButton = (t:Theme)=>css`
  ${ButtonStyle.roundedAccent(t)};
  ${ButtonStyle.El.btn} {
    min-width: 90px;
    gap: 0.6em;
  }
`




