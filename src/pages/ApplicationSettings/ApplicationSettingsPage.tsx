/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/components/BottomButtonBar/TopButtonBar'
import ClearSiteConfirmation from 'src/components/ClearSiteConfirmation/ClearSiteConfirmation'
import FormHeader from 'src/components/FormElements/FormHeader'
import { Pages } from 'src/components/Page/Pages'
import { PageScrollbarOverlayFrame } from 'src/components/Page/PageScrollbarOverlayFrame'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import UseScrollbars from 'src/components/Scrollbars/UseScrollbars'
import {
  ApplicationSettingsUiText
} from 'src/pages/ApplicationSettings/uiText'
import { AppRecoil } from 'src/recoil/state/AppRecoil'
import { Lang, LangRecoil, LangSettingsRecoil } from 'src/recoil/state/LangRecoil'
import { ThemeRecoil, ThemeSettingsRecoil } from 'src/recoil/state/ThemeRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { CountryFlag } from 'src/utils/lang/CountryFlag'
import { useUiTextContainer } from 'src/utils/lang/useUiText'
import { AllThemes } from 'src/utils/theme/ThemeCollection'
import { Themes } from 'src/utils/theme/Themes'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import Card from 'src/views/Card'
import { CommonStyle } from 'src/views/CommonStyle'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
import RadioInput from 'src/views/Inputs/RadioInput/RadioInput'
import { RadioInputGroup } from 'src/views/Inputs/RadioInput/RadioInputGroup'
import { RadioInputStyle } from 'src/views/Inputs/RadioInput/RadioInputStyle'
import col = EmotionCommon.col
import Page = Pages.Page
import ThemeType = Themes.Type
import BrowserIc = SvgIcons.BrowserIc
import DayNightIc = SvgIcons.DayNightIc
import DayIc = SvgIcons.DayIc
import MoonIc = SvgIcons.MoonIc
import resetH = EmotionCommon.resetH
import row = EmotionCommon.row
import Theme = Themes.Theme
import AddModuleIc = SvgIcons.AddModuleIc
import Txt = EmotionCommon.Txt
import Mem = ReactUtils.Mem










const ApplicationSettingsPage = ()=>{
  const app = useRecoilValue(AppRecoil)
  const lang = useRecoilValue(LangRecoil)
  const theme = useRecoilValue(ThemeRecoil)
  const [themeSettings, setThemeSettings] = useRecoilState(ThemeSettingsRecoil)
  const [langSettings, setLangSettings] = useRecoilState(LangSettingsRecoil)
  
  const uiText = useUiTextContainer(ApplicationSettingsUiText)
  
  const [clearSite, setClearSite] = useState(false)
  
  
  
  const themeOptions = useMemo(
    ()=>{
      let opts = [
        {
          value: 'system',
          text: uiText.systemTheme[0].text,
          icon: <DayNightIc css={icon}/>,
        },{
          value: 'light',
          text: uiText.lightTheme[0].text,
          icon: <DayIc css={icon}/>,
        },{
          value: 'dark',
          text: uiText.darkTheme[0].text,
          icon: <MoonIc css={iconSmall}/>,
        }
      ] satisfies { value: ThemeType|'system', [prop: string]: any }[]
      if (!theme.systemThemeAvailable) opts = opts.filter(it=>it.value!=='system')
      return opts
    },
    [uiText, theme.systemThemeAvailable]
  )
  const themeOptionChecked = useCallback(
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
          icon: <BrowserIc css={icon}/>,
        },{
          value: 'ru-RU',
          text: uiText.russian[0].text,
          icon: <Flag src={CountryFlag['ru-RU']}/>,
        },{
          value: 'en-US',
          text: uiText.english[0].text,
          icon: <Flag src={CountryFlag['en-US']}/>,
        }
      ] satisfies { value: Lang|'system', [prop: string]: any }[]
      if (!lang.availableSystemLangs?.length) opts = opts.filter(it=>it.value!=='system')
      return opts
    },
    [uiText, lang.availableSystemLangs]
  )
  const languageOptionChecked = useCallback(
    function (value: Lang|'system') {
      return langSettings.setting === 'system' && value === 'system'
        || langSettings.setting !== 'system' && value === langSettings.manualSetting?.[0]
    },
    [langSettings]
  )
  
  
  const lightThemeOptions = useMemo(
    ()=>{
      let opts = AllThemes
        .filter(t=>t.type==='light')
        .map(t=>({
          value: t.name,
          text: t.name, // TODO
          icon: <div></div>, // TODO
        }))
      return opts
    },
    [uiText]
  )
  const darkThemeOptions = useMemo(
    ()=>{
      let opts = AllThemes
        .filter(t=>t.type==='dark')
        .map(t=>({
          value: t.name,
          text: t.name, // TODO
          icon: <div></div>, // TODO
        }))
      return opts
    },
    [uiText]
  )
  
  
  
  
  const pageRef = useRef<HTMLElement>(null)
  
  return <>
    
    <Page ref={pageRef}>
      <Content>
        
        <FormHeader>{uiText.appSettings[0].text}</FormHeader>
        
        
        
        <Card>
          <OptionHeader>
            {uiText.theme[0].text}
          </OptionHeader>
          <RadioInputGroup>
            {
              themeOptions.map(opt => <RadioInput
                css={RadioInputStyle.radio}
                childrenPosition="start"
                checked={themeOptionChecked(opt.value)}
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
                  {opt.icon}
                  {opt.text}
                </OptionContainer>
              </RadioInput>)
            }
          </RadioInputGroup>
        </Card>
        
        
        
        <Card>
          <OptionHeader>
            {/* TODO */}
            {'Предпочитаемая светлая тема'}
          </OptionHeader>
          <RadioInputGroup>
            {
              lightThemeOptions.map(opt => <RadioInput
                css={RadioInputStyle.radio}
                childrenPosition="start"
                checked={opt.value===themeSettings.light}
                value={opt.value}
                key={opt.value}
                onChange={ev => {
                  setThemeSettings(s => ({
                    ...s,
                    light: opt.value,
                  }))
                }}
              >
                <OptionContainer>
                  {opt.icon}
                  {opt.text}
                </OptionContainer>
              </RadioInput>)
            }
          </RadioInputGroup>
        </Card>
        
        <Card>
          <OptionHeader>
            {/* TODO */}
            {'Предпочитаемая тёмная тема'}
          </OptionHeader>
          <RadioInputGroup>
            {
              darkThemeOptions.map(opt => <RadioInput
                css={RadioInputStyle.radio}
                childrenPosition="start"
                checked={opt.value===themeSettings.dark}
                value={opt.value}
                key={opt.value}
                onChange={ev => {
                  setThemeSettings(s => ({
                    ...s,
                    dark: opt.value,
                  }))
                }}
              >
                <OptionContainer>
                  {opt.icon}
                  {opt.text}
                </OptionContainer>
              </RadioInput>)
            }
          </RadioInputGroup>
        </Card>
        
        
        <Card>
          <OptionHeader>
            {uiText.language[0].text}
          </OptionHeader>
          <RadioInputGroup>
            {
              languageOptions.map(opt => <RadioInput
                css={RadioInputStyle.radio}
                childrenPosition="start"
                checked={languageOptionChecked(opt.value)}
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
                  {opt.icon}
                  {opt.text}
                </OptionContainer>
              </RadioInput>)
            }
          </RadioInputGroup>
        </Card>
        
        
        {/* TODO: Добавить настройки звука в приложении */}
        
        
        <RoundButtonsContainer>
          
          {app.canInstall && <Button css={normalIconRoundButton}
            onClick={async()=>{
              const installed = await promptInstall()
              console.log('installed', installed)
            }}
          >
            <AddModuleIc css={icon}/>
            {uiText.installApp[0].text}
          </Button>}
          
          <Button css={ButtonStyle.roundedDanger}
            onClick={() => setClearSite(true)}
          >
            {uiText.clearAppData[0].text}
          </Button>
        
        </RoundButtonsContainer>
        
        
      
      </Content>
    </Page>
    
    
    <TopButtonBar backBtn/>
    
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
    
    <BottomButtonBar />
    
    
    <ClearSiteConfirmation open={clearSite} setOpen={setClearSite} />
    
    
  </>
}
export default Mem(ApplicationSettingsPage)






const Content = styled.div`
  max-width: 500px;
  width: 100%;
  ${col};
  gap: 10px;
`







const OptionHeader = styled.h5`
  ${resetH};
  padding: 8px 6px 0 6px;
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
    height: 1.333em;
    width: 1.333em;
    ${SvgIcStyle.Prop.color}: var(${CommonStyle.Prop.color});
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
