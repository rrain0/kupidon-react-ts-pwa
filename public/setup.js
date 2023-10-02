


//console.log('make a setup')


const AppLangs = ['en-US','ru-RU']
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



{
  const prepareUiOptions = function(uiOptions, langs){
    const used = new Set()
    return uiOptions
      .toSorted((a,b)=>{
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
  
  
  const titles = prepareUiOptions(AppTitles,langs)
  const descriptions = prepareUiOptions(AppDescriptions,langs)
  
  const html = document.documentElement
  html.lang = langs[0]
  
  const title = document.querySelector('html head title')
  title.textContent = titles[0].text
  
  const description = document.querySelector('html head meta[name=description]')
  description.content = descriptions[0].text
}