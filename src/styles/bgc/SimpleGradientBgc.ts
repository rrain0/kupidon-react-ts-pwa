import { Theme } from 'src/theme/Theme'
import { css } from '@emotion/react'


export const SimpleGradientBgc = (t: Theme.Theme) => css`
  background: linear-gradient(
    to bottom right,
    ${t.page.bgc[0]} 0%,
    ${t.page.bgc[1]} 45% 55%,
    ${t.page.bgc[0]} 100%
  );
`