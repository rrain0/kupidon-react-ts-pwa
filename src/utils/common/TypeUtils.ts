export type empty = null|undefined
export type Setter<T> = (value: T)=>void




export namespace TypeUtils {
  
  export type empty = null|undefined
  export type Setter<T> = (value: T)=>void
  
  export type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never
  
  export const arrIsNonEmpty = <T>(arr?: T[] | empty): arr is [T, ...T[]]  => {
    return (arr?.length ?? 0) > 0
  }
  
}