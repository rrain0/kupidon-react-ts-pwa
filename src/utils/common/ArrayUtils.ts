import { TypeUtils } from 'src/utils/common/TypeUtils'
import empty = TypeUtils.empty


export namespace ArrayUtils {
  
  
  export const eq = (arr1: any[] | empty, arr2: any[] | empty): boolean => {
    if (arr1===arr2) return true
    if (!arr1 || !arr2) return false
    if (arr1.length!==arr2.length) return false
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i]!==arr2[i]) return false
    }
    return true
  }
  
  
  export const arrIndices = (len = 0): number[] => {
    return Array(len).fill(undefined).map((_,i)=>i)
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