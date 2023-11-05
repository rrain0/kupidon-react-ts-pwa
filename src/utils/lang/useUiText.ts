import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { Lang, LangRecoil } from 'src/recoil/state/LangRecoil'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { UiText, UiTextContainer } from 'src/utils/lang/UiText'
import empty = TypeUtils.empty



export const useUiTextArr = <T>
(uiText?: readonly UiText<T>[] | empty)
: UiText<T>[] => {
  const langs = useRecoilValue(LangRecoil).lang
  
  const preparedUiText = useMemo(
    ()=>prepareUiOptions(uiText??[], langs),
    [langs, uiText]
  )
  
  return preparedUiText
}



export const useUiTextContainer = <T extends UiTextContainer>
(uiText?: T | empty)
: T => {
  const langs = useRecoilValue(LangRecoil).lang
  
  const selectedUiText = useMemo(
    ()=>{
      const preparedUiText = {...uiText}
      for (const option in preparedUiText) {
        preparedUiText[option] = prepareUiOptions(preparedUiText[option], langs)
      }
      return preparedUiText
    },
    [langs, uiText]
  )
  
  return selectedUiText as T
}



function prepareUiOptions<T>
(uiOptions: readonly UiText<T>[], langs: Lang[])
: UiText<T>[] {
  const used = new Set<T>()
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