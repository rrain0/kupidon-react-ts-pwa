import { TypeUtils } from 'src/utils/common/TypeUtils'
import empty = TypeUtils.empty
import ComparatorEq = TypeUtils.ComparatorEq
import defaultComparatorEq = TypeUtils.defaultComparatorEq
import defaultPredicate = TypeUtils.defaultPredicate
import Mapper = TypeUtils.Mapper
import Filter = TypeUtils.Filter




export namespace ArrayUtils {
  
  
  import Merger = TypeUtils.Merger
  import exists = TypeUtils.exists
  import MergerIndexed = TypeUtils.MergerIndexed
  import CombinerIndexed = TypeUtils.CombinerIndexed
  import Exists = TypeUtils.Exists
  export const eq = (arr1: any[] | empty, arr2: any[] | empty): boolean => {
    if (arr1===arr2) return true
    if (!arr1 || !arr2) return false
    if (arr1.length!==arr2.length) return false
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i]!==arr2[i]) return false
    }
    return true
  }
  
  
  export const ofIndices = (len = 0): number[] => {
    return Array(len).fill(undefined).map((_,i)=>i)
  }
  
  
  
  /**
   * Проверка является ли переданное значение массивом
   * @param obj any
   * @returns {boolean} true если obj является массивом
   */
  export const isArray = <T, E>(obj: T | E[]): obj is Array<E> => obj instanceof Array
  
  
  export const ofFirstOrEmpty = <T>(arr?: readonly [T?, ...unknown[]] | empty): [T] | [] => {
    if (arr?.length) return [arr[0] as T]
    return []
  }
  
  
  
  export const diff = <T1, T2 = T1>
  (arr1: T1[], arr2: T2[],
   comparator: ComparatorEq<T1,T2> = defaultComparatorEq
  )=>{
    const fwd:  (number|undefined)[] = Array(arr1.length).fill(undefined)
    const back: (number|undefined)[] = Array(arr2.length).fill(undefined)
    arr1.forEach((one,i1)=>{
      for (let i2 = 0; i2 < arr2.length; i2++) {
        const two = arr2[i2]
        if ((!fwd.includes(i2)) && comparator(one,two)){
          fwd[i1] = i2
          back[i2] = i1
          break
        }
      }
    })
    return [fwd,back] as const
  }
  
  
  
  export const merge = <T1, T2 = T1>
  (arr1: T1[], arr2: T2[],
   merger: MergerIndexed<T1,T2>,
   comparator: ComparatorEq<T1,T2> = defaultComparatorEq
  ): [T1[],T2[]] => {
    const newArr1 = [...arr1]
    const newArr2 = [...arr2]
    const [fwd] = diff(arr1,arr2,comparator)
    fwd.forEach((to,from)=>{
      if (exists(to)){
        const [newElem1, newElem2] = merger(arr1[from], arr2[to], from, to)
        newArr1[from] = newElem1
        newArr2[to]   = newElem2
      }
    })
    return [newArr1,newArr2]
  }
  
  
  
  export const combine = <T1, T2 = T1>
  (arr1: T1[], arr2: T2[],
   combiner: CombinerIndexed<T1,T2>,
   comparator: ComparatorEq<T1,T2> = defaultComparatorEq
  ): T1[] => {
    const newArr1 = [...arr1]
    const [fwd] = diff(arr1,arr2,comparator)
    fwd.forEach((to,from)=>{
      if (exists(to)){
        const newElem1 = combiner(arr1[from], arr2[to], from, to)
        newArr1[from] = newElem1
      }
    })
    return newArr1
  }
  
  
  
  export type FindResult<T> = {
    isFound: true
    index: number
    elem: T
  } | {
    isFound: false
    index: -1
    elem: undefined
  }
  export const findBy =
  <T>(arr: T[], filter: Filter<T> = defaultPredicate): FindResult<T> => {
    for (let i = 0; i < arr.length; i++) {
      const elem = arr[i]
      if (filter(elem)){
        return {
          isFound: true,
          index: i,
          elem: elem,
        } satisfies FindResult<T>
      }
    }
    return {
      isFound: false,
      index: -1,
      elem: undefined,
    } satisfies FindResult<T>
  }
  
  
  
  
  
  export const replaceFirstToIfFoundBy =
  <T>(arr: T[], elem: T, filter: Filter<T> = defaultPredicate): T[] => {
    const findResult = findBy(arr, filter)
    if (findResult.isFound){
      const newArr = [...arr]
      newArr[findResult.index] = elem
      return newArr
    }
    return arr
  }
  export const mapFirstToIfFoundBy =
  <T>(arr: T[], mapper: Mapper<T>, filter: Filter<T> = defaultPredicate): T[] => {
    const findResult = findBy(arr, filter)
    if (findResult.isFound){
      const newArr = [...arr]
      newArr[findResult.index] = mapper(findResult.elem)
      return newArr
    }
    return arr
  }
  
  
  
  export type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never
  
  export const arrIsNonEmpty = <T>(arr?: T[] | empty): arr is [T, ...T[]]  => {
    return (arr?.length ?? 0) > 0
  }
  
  
  export type NonEmptyArr<T> = [T, ...T[]]
  
  
  
  export type ArrayOfNonEmpty<A extends Array<any>> = A extends Array<infer E>
    ? Array<Exists<E>>
    : never
  
  
  
  
}