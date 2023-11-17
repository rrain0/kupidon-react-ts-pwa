/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
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
import { Themes } from 'src/utils/theme/Themes'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import Card from 'src/views/Card'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import RadioInput from 'src/views/Inputs/RadioInput/RadioInput'
import { RadioInputGroup } from 'src/views/Inputs/RadioInput/RadioInputGroup'
import { RadioInputStyle } from 'src/views/Inputs/RadioInput/RadioInputStyle'
import col = EmotionCommon.col
import Page = Pages.Page
import ThemeType = Themes.ThemeType
import BrowserIc = SimpleSvgIcons.BrowserIc
import DayNightIc = SimpleSvgIcons.DayNightIc
import DayIc = SimpleSvgIcons.DayIc
import MoonIc = SimpleSvgIcons.MoonIc
import resetH = EmotionCommon.resetH
import row = EmotionCommon.row
import Theme = Themes.Theme
import AddModuleIc = SimpleSvgIcons.AddModuleIc
import Txt = EmotionCommon.Txt
import Mem = ReactUtils.Mem










const ApplicationSettingsPage = ()=>{
  
  
  
  
  const app = useRecoilValue(AppRecoil)
  const lang = useRecoilValue(LangRecoil)
  const theme = useRecoilValue(ThemeRecoil)
  const [themeSettings, setThemeSettings] = useRecoilState(ThemeSettingsRecoil)
  const [langSettings, setLangSettings] = useRecoilState(LangSettingsRecoil)
  
  
  const [clearSite, setClearSite] = useState(false)
  
  
  
  
  
  const uiOptions = useUiTextContainer(ApplicationSettingsUiText)
  
  
  
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
  const languageOptionChecked = useCallback(
    function (value: Lang|'system') {
      return langSettings.setting === 'system' && value === 'system'
        || langSettings.setting !== 'system' && value === langSettings.manualSetting?.[0]
    },
    [langSettings]
  )
  
  
  
  const pageRef = useRef<HTMLElement>(null)
  
  return <>
    
    
    <Page ref={pageRef}>
      <Content>
        
        <FormHeader>{uiOptions.appSettings[0].text}</FormHeader>
        
        
        
        <Card>
          
          
          <OptionHeader>
            {uiOptions.theme[0].text}
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
                  {opt.value === 'system' && <DayNightIc css={icon}/>}
                  {opt.value === 'light' && <DayIc css={icon}/>}
                  {opt.value === 'dark' && <MoonIc css={iconSmall}/>}
                  {opt.text}
                </OptionContainer>
              </RadioInput>)
            }
          </RadioInputGroup>
        
        
        </Card>
        
        <Card>
          
          
          
          <OptionHeader>
            {uiOptions.language[0].text}
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
                  {opt.value !== 'system' && <Flag src={CountryFlag[opt.value]}/>}
                  {opt.value === 'system' && <BrowserIc css={icon}/>}
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
            {uiOptions.installApp[0].text}
          </Button>}
          
          <Button css={ButtonStyle.roundedDanger}
            onClick={() => setClearSite(true)}
          >
            {uiOptions.clearAppData[0].text}
          </Button>
        
        </RoundButtonsContainer>
        
        
        <BottomButtonBar backBtn refreshBtn/>
      
      </Content>
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
  &.rrainuiIcon {
    height: 1.333em;
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
