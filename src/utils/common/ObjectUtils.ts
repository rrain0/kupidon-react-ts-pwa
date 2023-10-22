import { TypeUtils } from 'src/utils/common/TypeUtils'
import anyval = TypeUtils.anyval


export namespace ObjectUtils {
  
  
  
  
  export function copy<T extends object>(
    orig: T,
    update?: { -readonly [Prop in keyof T]?: T[Prop] }
  ): T {
    let newInstance = Object.assign(Object.create(Object.getPrototypeOf(orig)), orig) as T
    Object.assign(newInstance, update)
    return newInstance
  }
  
  
  export const isObject = <O extends {}|null|undefined>(value: O): value is O & object =>
    typeof value === 'object' && value!==null
  
  
  
  
  export type Keys<O extends object> = (keyof O)
  export type ObjectKeysType<O extends object> = (string & keyof O)
  /**
   * Тип для получения массива ключей объекта (для собственных перечисляемых свойств).
   * Беруться только строковые (и числовые) ключи, но не символьные.
   * Порядок перечисления - порядок объявления свойств в коде.
   * Тайпскрипт не позволяет выделить собственные и перечисляемые свойства,
   * так что в типе все свойства, кроме ключей-символов.
   */
  export type ObjectKeysArrType<O extends object> = ObjectKeysType<O>[]
  /**
   * Встроенная функция {@linkcode Object.keys} с улучшенной типизацией
   */
  export function ObjectKeys
    <O extends anyval>
    (object: O)
    : ObjectKeysArrType<O & object>
  {
    if (!isObject(object)) return []
    // The Object.keys() static method returns an array of a given object's own enumerable string-keyed property names.
    return Object.keys(object) as ObjectKeysArrType<O & object>
  }
  
  
  
  export type Values<O extends object> =
    { [Prop in keyof O]: O[Prop] }[keyof O]
  export type ObjectValuesType<O extends object> =
    { [Prop in string & keyof O]: O[Prop] }[string & keyof O]
  /**
   * Тип для получения массива значений объекта (для собственных перечисляемых свойств).
   * Беруться только строковые (и числовые) ключи, но не символьные.
   * Порядок перечисления - порядок объявления свойств в коде.
   * Тайпскрипт не позволяет выделить собственные и перечисляемые свойства,
   * так что в типе все свойства, кроме ключей-символов.
   */
  export type ObjectValuesArrType<O extends object> = ObjectValuesType<O>[]
  /**
   * Встроенная функция {@linkcode Object.values} с улучшенной типизацией
   */
  export function ObjectValues
    <O extends {}|null|undefined>
    (object: O)
    : ObjectValuesArrType<O & object>
  {
    if (typeof object !== 'object' || object===null) return []
    return Object.values(object) as ObjectValuesArrType<O & object>
  }
  
  
  
  export type Entries<O extends object> =
    { [Prop in keyof O]: [Prop,O[Prop]] }[keyof O]
  export type ObjectEntriesType<O extends object> =
    { [Prop in string & keyof O]: [Prop,O[Prop]] }[string & keyof O]
  /**
   * Тип для получения поэлементно типизированного массива записей объекта (для собственных перечисляемых свойств),
   * где элемент - это кортеж [ключ, значение] и тип ключа привязан к типу значения.
   * Беруться только строковые (и числовые) ключи, но не символьные.
   * Порядок перечисления - порядок объявления свойств в коде.
   * Тайпскрипт не позволяет выделить собственные и перечисляемые свойства,
   * так что в типе все свойства, кроме ключей-символов.
   */
  export type ObjectEntriesArrType<O extends object> = ObjectEntriesType<O>[]
  /**
   * Встроенная функция {@linkcode Object.entries} с улучшенной типизацией
   */
  export function ObjectEntries
    <O extends {}|null|undefined>
    (object: O)
    : ObjectEntriesArrType<O & object>
  {
    if (typeof object !== 'object' || object===null) return []
    return Object.entries(object) as ObjectEntriesArrType<O & object>
  }
  
  
  
  
  
  
  
  // Doesn't work but idea is good
  export type FieldsToValues
    <Vs extends object, Fs extends readonly (keyof Vs)[] = readonly (keyof Vs)[]> =
    [
      Fs,
      (values: unknown[] & { [Idx in number & keyof Fs]: Vs[Fs[Idx]] }) => any
    ]
  {
    const obj = {
      a: 'kdjfklj',
      b: 56,
    }
    const fieldsToValues: FieldsToValues<typeof obj> = [
      ['a'] as const,
      // must be [string, never] but actually is (string|number)[]
      ([a,b])=>undefined
    ]
    const fieldsToValuesArr: FieldsToValues<typeof obj>[] = [
      [
        ['a'] as const,
        // must be [string, never] but actually is (string|number)[]
        ([a,b])=>undefined
      ]
    ]
    
  }
  
  
  
  
  /*
  Method to get all own symbol properties
   Object.getOwnPropertySymbols({ a: 'aa', [Symbol('tag')]: 'ss' })
   
   The Object.keys() static method returns an array of a given object's
   own enumerable string-keyed property names.
   
   If you want all string-keyed own properties, including non-enumerable ones,
   see Object.getOwnPropertyNames().
   */
  
  
  
  
}



