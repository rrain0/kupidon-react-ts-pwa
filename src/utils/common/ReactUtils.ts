import React, {CSSProperties} from "react"


export namespace ReactUtils {
  
  // React.memo wrapper
  export const Mem = <C>(Component: C): C => {
    // @ts-ignore
    return React.memo(Component)
  }
  
  export type CssProps = {
    className?: string | undefined
    style?: CSSProperties | undefined
  }
  
}



