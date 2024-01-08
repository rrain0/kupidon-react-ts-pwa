import { TypeUtils } from 'src/utils/common/TypeUtils'
import empty = TypeUtils.empty


export namespace ArrayUtils {
  
  
  import ComparatorEq = TypeUtils.ComparatorEq
  import exists = TypeUtils.exists
  import defaultComparatorEq = TypeUtils.defaultComparatorEq
  import Predicate = TypeUtils.Predicate
  import defaultPredicate = TypeUtils.defaultPredicate
  import Mapper = TypeUtils.Mapper
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
  
  
  
  export const diff = <T1,T2>
  (arr1: T1[], arr2: T2[],
   comparator: ((a: T1, b: T2)=>boolean)|undefined = undefined
  )=>{
    const fwd: (number|undefined)[] = Array(arr1.length).fill(undefined)
    const back: (number|undefined)[] = Array(arr2.length).fill(undefined)
    arr1.forEach((one,i1)=>{
      for (let i2 = 0; i2 < arr2.length; i2++) {
        const two = arr2[i2]
        if ((!fwd.includes(i2)) && (
            (comparator && comparator(one,two)) ||
            (!comparator && (one as any)===(two as any))
          )
        ){
          fwd[i1] = i2
          back[i2] = i1
          break
        }
      }
    })
    return [fwd,back] as const
  }
  
  
  
  /**
   * Проверка является ли переданное значение массивом
   * @param obj any
   * @returns {boolean} true если obj является массивом
   */
  export const isArray = <T, E>(obj: T | E[]): obj is Array<E> => obj instanceof Array
  
  
  export const firstOrEmpty = <T>(arr?: readonly [T?, ...unknown[]] | empty): [T] | [] => {
    if (arr?.length) return [arr[0] as T]
    return []
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
  <T>(arr: T[], predicate: Predicate<T> = defaultPredicate): FindResult<T> => {
    for (let i = 0; i < arr.length; i++) {
      const elem = arr[i]
      if (predicate(elem)){
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
  
  
  
  
  export const ifFoundThenReplaceTo =
  <T>(arr: T[], elem: T, comparator: ComparatorEq<T> = defaultComparatorEq): T[] => {
    const findResult = findBy(arr, it=>comparator(it,elem))
    if (findResult.isFound) {
      const newArr = [...arr]
      newArr[findResult.index] = elem
      return newArr
    }
    return arr
  }
  
  
  
  export const ifFoundByThenReplaceTo =
  <T>(arr: T[], elem: T, predicate: Predicate<T> = defaultPredicate): T[] => {
    const findResult = findBy(arr, predicate)
    if (findResult.isFound){
      const newArr = [...arr]
      newArr[findResult.index] = elem
      return newArr
    }
    return arr
  }
  export const ifFoundByThenMapTo =
  <T>(arr: T[], mapper: Mapper<T>, predicate: Predicate<T> = defaultPredicate): T[] => {
    const findResult = findBy(arr, predicate)
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
  
  
  
  export type ArrWithNonEmptyElements<A extends Array<E>, E = any> = A extends Array<infer E>
    ? Array<Exclude<E, null|undefined>>
    : never
  
  
  
  
}