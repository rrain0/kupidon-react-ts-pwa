import { atom } from 'recoil'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { emptyValOrObj, localStorageEffect2 } from '../RecoilPersist'
import ArrayElement = ArrayUtils.ArrayElement
import NonEmptyArr = ArrayUtils.NonEmptyArr







export type Lang = ArrayElement<AppLangsType>

export const fallbackLang: Lang = 'en-US'



export type LangSettingsRecoilType = {
  setting: 'manual' | 'system'
  manualSetting: NonEmptyArr<Lang> | undefined
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
  lang: NonEmptyArr<Lang>
  availableSystemLangs: Lang[] | undefined
}
export const LangRecoil = atom<LangRecoilType>({
  key: 'lang',
  default: {
    lang: [fallbackLang],
    availableSystemLangs: undefined,
  },
})


