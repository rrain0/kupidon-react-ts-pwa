import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { Lang, LangRecoil } from 'src/recoil/state/LangRecoil'
import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { UiOption } from 'src/utils/lang/UiOption'
import empty = TypeUtils.empty



export const useUiOptionArr = <T>
(uiOptions?: readonly UiOption<T>[] | empty)
: UiOption<T>[] => {
  const langs = useRecoilValue(LangRecoil).lang
  
  const preparedUiOpitons = useMemo(
    ()=>prepareUiOptions(uiOptions??[], langs),
    [langs, uiOptions]
  )
  
  return preparedUiOpitons
}



export const useUiOptionObject = <T extends Record<string, UiOption<any>[]>>
(uiOptions?: T | empty)
: T => {
  const langs = useRecoilValue(LangRecoil).lang
  
  const selectedUiOptions = useMemo(
    ()=>{
      const preparedUiOpitons = {...uiOptions}
      for (const option in preparedUiOpitons) {
        preparedUiOpitons[option] = prepareUiOptions(preparedUiOpitons[option], langs)
      }
      return preparedUiOpitons
    },
    [langs, uiOptions]
  )
  
  return selectedUiOptions as T
}



function prepareUiOptions<T>
(uiOptions: readonly UiOption<T>[], langs: Lang[])
: UiOption<T>[] {
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