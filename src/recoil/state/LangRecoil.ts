import { atom } from 'recoil'
import { emptyValOrObj, localStorageEffect2 } from '../RecoilPersist'





/*
  todo autodetect language
   'ru'|'en'
   ISO 639-1 language code
   https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
   Initial lang must be undefined and then autodetected
*/


export type LangStateType = string
export const LangRecoil = atom<LangStateType>({
  key: 'lang',
  default: 'ru',
  effects: [localStorageEffect2({ removeWhen: ['reset',emptyValOrObj] })],
})


