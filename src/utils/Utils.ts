


export namespace Utils {
  
  export const wait = async <T>(delay:number, value?:T) => new Promise<T>(
    resolve => setTimeout(resolve,delay,value)
  )
  
  
  export const arrEq = (arr1: any[] | empty, arr2: any[] | empty): boolean => {
    if (arr1===arr2) return true
    if (!arr1 || !arr2) return false
    if (arr1.length!==arr2.length) return false
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i]!==arr2[i]) return false
    }
    return true
  }
  
  
  // Создать новый Set из элементов set, исключая элементы из exclude
  export const SetExclude = <T>(set: Set<T>, exclude: Set<any>): Set<T> => {
    return new Set([...set].filter(v=>!exclude.has(v)))
  }
  // равно ли содержимое сетов
  export const SetEquals = (set: Set<any>, otherSet: Set<any>) => {
    if (set.size!==otherSet.size) return false
    for (const el of set) {
      if (!otherSet.has(el)) return false
    }
    return true
  }
  
  
  export class Lazy<T> {
    private inited = false
    private value!: T
    constructor( private initializer: ()=>T ) {}
    get(){
      if (!this.inited) {
        this.inited = true
        this.value = this.initializer()
      }
      return this.value
    }
  }
  
  
  export const trueOrUndef = (value: any): true|undefined => value ? true : undefined
  
  
  export function copy<T extends object>(
    orig: T,
    update?: { -readonly [Prop in keyof T]?: T[Prop] }
  ): T {
    let newInstance = Object.assign(Object.create(Object.getPrototypeOf(orig)), orig) as T
    Object.assign(newInstance, update)
    return newInstance
  }
  
  
  
  /**
   * Операция получение по файлу его DataURL
   * @param file Файл для получения DataURL
   * @returns {Promise<string>}
   */
  export const readAsUrl = async (file: Blob) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (ev) => resolve(ev?.target?.result as string);
      reader.onerror = (ev) => reject(ev);
      
      //reader.readAsArrayBuffer(file)
      
      reader.readAsDataURL(file);
    });
  
  /**
   * Функция округления
   * @param n Значение
   * @param scale Масштаб
   * @returns
   */
  export const round = (n: number, scale: number = 0) => {
    const mult = (n < 0 ? -1 : 1) * 10 ** scale;
    return Math.round(n * mult) / mult;
  };
  
  /**
   * Конвертация значения типа number в обычную строку (без сокращений типа 2e+67)
   * @param n Число
   * @returns {string} Число в виде обычной строки
   */
  export const numberToPlainString = (n: number) => {
    return n.toLocaleString(["fullwide", "en-Us"], {
      useGrouping: false,
      maximumSignificantDigits: 21,
    });
  };
  
  /**
   * Получение процента
   * @param value Значение
   * @param total Общее значение
   * @param scale Масштаб
   * @returns {string}
   */
  export const getPercent = (value: number, total: number, scale: number = 1) => {
    return numberToPlainString(round((value * 100) / total, scale));
  };
  
  /**
   * Деление с остатком
   * @param a Значение a
   * @param b Значение b
   * @returns {number} (a + b) % b
   */
  export const mod = (a: number, b: number) => (a + b) % b;
  
  /**
   * Функция, подгоняющая текущее значение под диапазон
   * @param min Минимальное значение включительно
   * @param curr Текущее значение
   * @param max Максимальное значение включительно
   * @returns {number} Результирующее значение, находящееся в диапазоне [min,max]
   */
  export const fitRange = (min: number, curr: number, max: number) =>
    curr < min ? min : curr > max ? max : curr;
  
  /**
   * Определение, находится ли текущее значение между минимальным и максимальным включительно
   * @param min Минимальное значение
   * @param curr Текущее значение
   * @param max Максимальное значение
   * @returns {boolean} Результат сравнения
   */
  export const inRange = (min: number, curr: number, max: number) =>
    curr >= min && curr <= max;
  
  
  export const nonNegIntOrDefault =
    (value: any, defolt: number): number => {
      value = +value
      if (isNaN(value) || value < 0) value = defolt
      return value
    }
  
  
  // +1 in range inclusive
  export const nextLooped = (min: number, curr: number, max: number) =>
    curr<=min ? min+1 : curr>=max ? min : curr+1
  
  
  // -1 in range inclusive
  export const prevLooped = (min: number, curr: number, max: number) =>
    curr<=min ? max : curr>=max ? max-1 : curr-1
  
  
  
  export function ifNumberToPx(value: string|number): string {
    if (typeof value === 'number') return value+'px'
    return value
  }
  
  
  
  /**
   * Проверка является ли переданное значение массивом
   * @param obj any
   * @returns {boolean} true если obj является массивом
   */
  export const isArray = <T, E>(obj: T | E[]): obj is Array<E> => obj instanceof Array;
  
  /**
   * Переключатель элемента в множестве (если он есть - удаляется, иначе - добавляется)
   * @param set Множество
   * @param element Элемент
   * @returns {Set<E>}
   */
  export const toggleInSet = <E>(set: Set<E>, element: E) => {
    if (set.has(element)) set.delete(element);
    else set.add(element);
    return set;
  };
  
  
  
  let id = 1
  export const nextId = ()=>''+id++
  
  
  export type empty = null|undefined
  export type WithId<E extends object> = E & { id: string }
  export type Setter<T> = (value: T)=>void
  export type NonEmptyArr<A extends Array<E>, E = any> = A extends Array<infer E>
    ? Array<Exclude<E, null|undefined>>
    : never
  
  
  export type PointerEventListener<E extends HTMLElement = HTMLElement> =
    (this:E, ev: PointerEvent) => any
  
  
  // Получить тип, в котором ко всем именам свойств переданного объекта добавляется суффикс
  export type Suffix<O extends object,Suff extends string> =
    { [Prop in keyof O as Prop extends string ? `${Prop}${Suff}` : never]: O[Prop] }
  
  
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
  
  
  // First, define a type that, when passed a union of keys, creates an object which
  // cannot have those properties. I couldn't find a way to use this type directly,
  // but it can be used with the below type.
  export type Impossible<K extends keyof any> = { [P in K]: never }

  
  // The secret sauce! Provide it the type that contains only the properties you want,
  // and then a type that extends that type, based on what the caller provided
  // using generics.
  export type NoExtraProperties<T, U extends T = T> = U & Impossible<Exclude<keyof U, keyof T>>
  
  
  
  /**
   * Возвращение округлённого вниз в сторону нуля числа
   * @param n - исходное число
   * @returns {number} - округлённое в сторону нуля число
   */
  export function floor(n: number){
    return n<0 ? -Math.floor(-n) : Math.floor(n)
  }
  
  
  /**
   * Возвращение случайного числа в диапазоне [{@linkcode from},{@linkcode to})
   * @param [from=0] - начало диапазона включительно
   * @param [to=1] - конец диапазона не включительно, {@linkcode to} должно быть больше чем {@linkcode from}
   * @returns {number} - случайное число из диапазона [{@linkcode from},{@linkcode to})
   */
  export function random(from: number, to: number): number
  export function random(to?: number): number
  export function random(a?: number, b?: number): number {
    let from = 0, to = 1
    if (typeof a === 'number' && typeof b === 'number'){
      from = a
      to = b
    } else if (typeof a === 'number'){
      to = a
    }
    if (from>=to) throw new Error(`'to'=${to} must be greater than 'from'=${from}`)
    return (to-from)*Math.random() + from
  }
  
  
  
  /**
   * Возвращение целого случайного числа в диапазоне [{@linkcode from},{@linkcode to}]
   * @param [from=0] - начало диапазона включительно
   * @param [to=1] - конец диапазона включительно, {@linkcode to} должно быть больше-равно чем {@linkcode from}
   * @returns {number} - случайное число из диапазона [{@linkcode from},{@linkcode to}]
   */
  export function randomInt(from: number, to: number): number
  export function randomInt(to?: number): number
  export function randomInt(a?: number, b?: number): number {
    let from = 0, to = 1
    if (typeof a === 'number' && typeof b === 'number'){
      from = floor(a)
      to = floor(b)
    } else if (typeof a === 'number'){
      to = floor(a)
    }
    if (from>to) throw new Error(`'to'=${to} must be greater-equal than 'from'=${from}`)
    return floor(random(from,to+1))
  }
  
  
  /**
   * @param value - любое значение
   * @return {boolean} - возвращает {true} если {value} не равно {null} и не равно {undefined}
   */
  export function isPresent<T>(value: T|null|undefined): value is T {
    return value!==null && value!==undefined
  }
  
  
  /**
   *   Обрезает у строки хвост {tail} с начала и с конца
   */
  export const trimTails = (str: string, tail: string) =>
    str.replaceAll(RegExp(`^(${tail})|(${tail})$`,'g'),'')
  
  /**
   *   Обрезает у строки '/' с начала и с конца
   */
  export const trimSlash = (str: string) => trimTails(str,'/')
  
  
}



