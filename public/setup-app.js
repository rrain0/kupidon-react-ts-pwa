
console.log('setup app script: make a setup')



let _htmlProps = {
  // eslint-disable-next-line no-undef
  nodeEnv: NODE_ENV,
  // eslint-disable-next-line no-undef
  publicUrl: PUBLIC_URL,
  lang: "en-US",
  title: "Kupidon",
  description: "Kupidon date app",
}

function setHtmlTags(langs){
  if (langs[0]) {
    _htmlProps.lang = langs[0]
    
    const textPrefix = _htmlProps.nodeEnv==='development' ? 'Dev ' : ''
    
    const AppTitles = [
      {
        value: 'kupidon',
        lang: 'en-US',
        text: 'Kupidon',
      },
      {
        value: 'kupidon',
        lang: 'ru-RU',
        text: 'Купидон',
      },
    ]
    const AppDescriptions = [
      {
        value: 'kupidonDescription',
        lang: 'en-US',
        text: 'Kupidon date app',
      },
      {
        value: 'kupidonDescription',
        lang: 'ru-RU',
        text: 'Купидон - приложение для свидания',
      },
    ]
    
    const prepareUiOptions = function(uiOptions, langs){
      const used = new Set()
      return [...uiOptions]
        .sort((a,b)=>{
          if (a.value===b.value) {
            let langIdxA = langs.findIndex(it=>it===a.lang)
            let langIdxB = langs.findIndex(it=>it===b.lang)
            if (langIdxA===-1) langIdxA = langs.length
            if (langIdxB===-1) langIdxB = langs.length
            return langIdxA - langIdxB
          }
          return 0
        })
        .filter(it=>{
          if (used.has(it.value)) return false
          used.add(it.value)
          return true
        })
    }
    
    const titles = prepareUiOptions(AppTitles,langs)
    const descriptions = prepareUiOptions(AppDescriptions,langs)
    
    _htmlProps.title = textPrefix + titles[0].text
    _htmlProps.description = textPrefix + descriptions[0].text
  }
  
  const html = document.documentElement
  html.lang = _htmlProps.lang
  
  document.title = _htmlProps.title
  
  const htmlDescription = document.querySelector('html head meta[name=description]')
  htmlDescription.content = _htmlProps.description
  
  const manifestSearchParams = new URLSearchParams({
    nodeEnv: _htmlProps.nodeEnv,
    lang: _htmlProps.lang,
  }).toString()
  let manifestUrl = _htmlProps.publicUrl + "/manifest.json"
  if (manifestSearchParams) manifestUrl += '?' + manifestSearchParams
  
  const linkManifest = document.querySelector('html head link[rel=manifest]')
  linkManifest.href = manifestUrl
}





{
  
  const langSettings = JSON.parse(localStorage.getItem('langSettings'))
  if (langSettings?.setting==='manual'){
    setHtmlTags(langSettings.manualSetting)
  } else {
    const AppLangs = ['en-US','ru-RU']
    
    const getLangs = function(){
      let browserLangs = navigator.languages
      if ((!browserLangs || !browserLangs.length) && navigator.language)
        browserLangs = [navigator.language]
      if (!browserLangs || !browserLangs.length) browserLangs = undefined
      browserLangs = browserLangs?.map(it=>{
        if (it.startsWith('en')) return 'en-US'
        if (it.startsWith('ru')) return 'ru-RU'
        return it
      })
      return browserLangs
    }
    
    let langs = getLangs().filter(it=>AppLangs.includes(it))
    if (!langs.length) langs = ['en-US']
    
    setHtmlTags(langs)
  }
  
  
}




/*
https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Trigger_install_prompt
BeforeInstallEvent отправляется браузером, если он определил, что сайт можно установить как PWA.
При первой отправке эвента, браузер показывает свой UI с предолжением установки (его отключаем ev.preventDefault()).
Запрос на установку из эвента можно вызвать только 1 раз, дальше нужен новый эвент.
При отклонении запроса на установку, браузер сразу же отправляет новый эвент.
*/
let beforeInstallPromptEvent
let onBeforeInstallPromptEvent
const setBeforeInstallPromptEvent = ev=>{
  beforeInstallPromptEvent = ev
  onBeforeInstallPromptEvent?.(beforeInstallPromptEvent)
}
const promptInstall = ()=>{
  const ev = beforeInstallPromptEvent
  setBeforeInstallPromptEvent(undefined)
  return ev?.prompt()
}
window.addEventListener('beforeinstallprompt', async ev=>{
  // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getInstalledRelatedApps
  const relatedApps = await navigator.getInstalledRelatedApps() // => { id, platform, url, version }[]
  // Search for a specific installed platform-specific app
  ev.preventDefault()
  if (!relatedApps?.length) setBeforeInstallPromptEvent(ev)
})
window.addEventListener('appinstalled', ev=>{
  setBeforeInstallPromptEvent(undefined)
})




console.log('setup app script: end of setup')