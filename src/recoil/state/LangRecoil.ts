import { atom } from 'recoil'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { emptyValOrObj, localStorageEffect2 } from '../RecoilPersist'
import ArrayElement = ArrayUtils.ArrayElement







export type Lang = ArrayElement<AppLangsType>

export const fallbackLang: Lang = 'en-US'



export type LangSettingsRecoilType = {
  setting: 'manual' | 'system'
  manualSetting: [Lang, ...Lang[]] | undefined
}
export const LangSettingsRecoil = atom<LangSettingsRecoilType>({
  key: langSettingsName,
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


