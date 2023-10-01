import { atom } from 'recoil'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { emptyValOrObj, localStorageEffect2 } from '../RecoilPersist'
import ArrayElement = TypeUtils.ArrayElement





/*
  todo autodetect language
   'ru'|'en'
   ISO 639-1 language code
   https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
   Initial lang must be undefined and then autodetected
*/

export const AppLangs = ['en-US','ru-RU'] as const
export type Lang = ArrayElement<typeof AppLangs>

export const fallbackLang: Lang = 'en-US'



export type LangSettingsRecoilType = {
  setting: 'user' | 'system'
  userSetting: [Lang, ...Lang[]] | undefined
}
export const LangSettingsRecoil = atom<LangSettingsRecoilType>({
  key: 'langSettings',
  default: {
    setting: 'system',
    userSetting: undefined,
  },
  effects: [localStorageEffect2({ removeWhen: ['reset',emptyValOrObj] })],
})



export type LangRecoilType = {
  lang: [Lang, ...Lang[]]
  systemLangAvailable: boolean
  askUser: boolean
}
export const LangRecoil = atom<LangRecoilType>({
  key: 'lang',
  default: {
    lang: [fallbackLang],
    systemLangAvailable: false,
    askUser: false,
  },
})


