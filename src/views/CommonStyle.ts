import { TypeUtils } from 'src/utils/common/TypeUtils'
import PartialUndef = TypeUtils.PartialUndef


export namespace CommonStyle {
  
  export namespace Attr {
    export const errorName = 'data-error'
    
    export const error = `[${errorName}]`
    export const errorThis = `&[${errorName}]`
    
    export type errorType = PartialUndef<{ [errorName]: boolean }>
    export type errorTrueOrUndefType = PartialUndef<{ [errorName]: true|undefined }>
  }
  export namespace Prop {
    export const color = '--color'
  }
  
}