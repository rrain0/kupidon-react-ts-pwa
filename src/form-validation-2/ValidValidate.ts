import { ValidCore } from './ValidCore'


export namespace ValidValidate {
  import Failure = ValidCore.Failure
  import Validator = ValidCore.Validator
  
  
  export function validate<
    Values extends object = object,
  >(
    values: Values,
    validators: Validator<Values>[],
  ): Failure[] {
    
    
    throw new Error('Not implemented')
  }
  
  
}