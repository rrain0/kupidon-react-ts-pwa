



export namespace CastUtils {
  
  
  export const trueOrUndef = (value: any): true|undefined => value ? true : undefined
  export const falsishToUndef = <T>(value: T) => value ? value : undefined
  
  
  /**
   * @param value - любое значение
   * @return {boolean} - возвращает {true} если {value} не равно {null} и не равно {undefined}
   */
  export function isPresent<T extends {}|null|undefined>(value: T): value is T & {} {
    return value!==null && value!==undefined
  }
  
  
}