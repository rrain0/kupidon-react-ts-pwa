/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    //NODE_ENV: 'development' | 'production' | 'test' // already defined
    //PUBLIC_URL: string // already defined
    
    //CUSTOM_PROP: 'a'|'b' // some custom prop definition
  }
}