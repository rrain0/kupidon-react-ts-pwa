



export namespace CastUtils {
  
  
  export const trueOrUndef = (value: any): true|undefined => value ? true : undefined
  
  
  /**
   * @param value - любое значение
   * @return {boolean} - возвращает {true} если {value} не равно {null} и не равно {undefined}
   */
  export function isPresent<T>(value: T|null|undefined): value is T {
    return value!==null && value!==undefined
  }
  
  
  
}