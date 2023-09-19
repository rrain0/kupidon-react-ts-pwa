import '@emotion/react'
import { Themes as LibTheme } from 'src/theme/Themes';

declare module '@emotion/react' {
  export interface Theme extends LibTheme.Theme {}
}