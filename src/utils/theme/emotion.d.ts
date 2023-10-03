import '@emotion/react'
import { Themes as LibTheme } from 'src/utils/theme/Themes';

declare module '@emotion/react' {
  export interface Theme extends LibTheme.Theme {}
}