import '@emotion/react'
import { Theme as LibTheme } from './Theme';

declare module '@emotion/react' {
  export interface Theme extends LibTheme.Theme {}
}