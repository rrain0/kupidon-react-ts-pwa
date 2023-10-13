import { atom } from 'recoil'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { emptyValOrObj, localStorageEffect2 } from '../RecoilPersist'
import ArrayElement = ArrayUtils.ArrayElement





/*
  todo autodetect language
   'ru'|'en'
   ISO 639-1 language code
   https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
   Initial lang must be undefined and then autodetected
 
   https://datatracker.ietf.org/doc/html/rfc5646
*/

export const AppLangs = ['en-US','ru-RU'] as const
export type Lang = ArrayElement<typeof AppLangs>

export const fallbackLang: Lang = 'en-US'



export type LangSettingsRecoilType = {
  setting: 'manual' | 'system'
  manualSetting: [Lang, ...Lang[]] | undefined
}
export const LangSettingsRecoil = atom<LangSettingsRecoilType>({
  key: 'langSettings',
  default: {
    setting: 'system',
    manualSetting: undefined,
  },
  effects: [localStorageEffect2({ removeWhen: ['reset',emptyValOrObj] })],
})



export type LangRecoilType = {
  lang: [Lang, ...Lang[]]
  systemLangAvailable: boolean | undefined
}
export const LangRecoil = atom<LangRecoilType>({
  key: 'lang',
  default: {
    lang: [fallbackLang],
    systemLangAvailable: undefined,
  },
})


