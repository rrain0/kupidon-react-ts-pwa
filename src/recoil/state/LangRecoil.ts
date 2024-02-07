import { atom } from 'recoil'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { Lang } from 'src/utils/lang/Lang'
import { emptyValOrObj, localStorageEffect2 } from '../RecoilPersist'
import DefaultAppLang = Lang.DefaultAppLang
import AppLangType = Lang.AppLangType
import NonEmptyArr = ArrayUtils.NonEmptyArr









export type LangSettingsRecoilType = {
  setting: 'manual' | 'system'
  manualSetting: NonEmptyArr<AppLangType> | undefined
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
  lang: NonEmptyArr<AppLangType>
  availableSystemLangs: AppLangType[] | undefined
}
export const LangRecoil = atom<LangRecoilType>({
  key: 'lang',
  default: {
    lang: [DefaultAppLang],
    availableSystemLangs: undefined,
  },
})


