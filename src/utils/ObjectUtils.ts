



export namespace ObjectUtils {
  
  
  
  export function copy<T extends object>(
    orig: T,
    update?: { -readonly [Prop in keyof T]?: T[Prop] }
  ): T {
    let newInstance = Object.assign(Object.create(Object.getPrototypeOf(orig)), orig) as T
    Object.assign(newInstance, update)
    return newInstance
  }
  
  
  
  
  
  export type Keys<O extends object> = (keyof O)
  
  /**
   * Тип для получения массива ключей объекта (для собственных перечисляемых свойств).
   * Беруться только строковые (и числовые) ключи, но не символьные.
   * Порядок перечисления - порядок объявления свойств в коде.
   * Тайпскрипт не позволяет выделить собственные и перечисляемые свойства,
   * так что в типе все свойства, кроме ключей-символов.
   */
  export type ObjectKeysArrType<O extends object> = (string & keyof O)[]
  /**
   * Встроенная функция {@linkcode Object.keys} с улучшенной типизацией
   */
  export function ObjectKeys<O extends {}|null|undefined>(object: O): ObjectKeysArrType<O & object> {
    if (typeof object !== 'object' || object===null) return []
    // @ts-ignore
    return Object.keys(object)
  }
  
  
  export type Values<O extends object> = { [Prop in keyof O]: O[Prop] }[keyof O]
  
  /**
   * Тип для получения массива значений объекта (для собственных перечисляемых свойств).
   * Беруться только строковые (и числовые) ключи, но не символьные.
   * Порядок перечисления - порядок объявления свойств в коде.
   * Тайпскрипт не позволяет выделить собственные и перечисляемые свойства,
   * так что в типе все свойства, кроме ключей-символов.
   */
  export type ObjectValuesArrType<O extends object> = { [Prop in string & keyof O]: O[Prop] }[string & keyof O][]
  /**
   * Встроенная функция {@linkcode Object.values} с улучшенной типизацией
   */
  export function ObjectValues<O extends {}|null|undefined>(object: O): ObjectValuesArrType<O & object> {
    if (typeof object !== 'object' || object===null) return []
    // @ts-ignore
    return Object.values(object)
  }
  
  
  /**
   * Тип для получения поэлементно типизированного массива записей объекта (для собственных перечисляемых свойств),
   * где элемент - это кортеж [ключ, значение] и тип ключа привязан к типу значения.
   * Беруться только строковые (и числовые) ключи, но не символьные.
   * Порядок перечисления - порядок объявления свойств в коде.
   * Тайпскрипт не позволяет выделить собственные и перечисляемые свойства,
   * так что в типе все свойства, кроме ключей-символов.
   */
  export type ObjectEntriesArrType<O extends object> =
    { [Prop in string & keyof O]: [Prop,O[Prop]] }[string & keyof O][]
  /**
   * Встроенная функция {@linkcode Object.entries} с улучшенной типизацией
   */
  export function ObjectEntries<O extends {}|null|undefined>(object: O): ObjectEntriesArrType<O & object> {
    if (typeof object !== 'object' || object===null) return []
    // @ts-ignore
    return Object.entries(object)
  }
  
  
  
}