import { Themes } from 'src/utils/theme/Themes'
import { css } from '@emotion/react'


export const SimpleGradientBgc = (t: Themes.Theme) => css`
  background: linear-gradient(
    to bottom right,
    ${t.page.bgcGradient[0]} 0%,
    ${t.page.bgcGradient[1]} 45% 55%,
    ${t.page.bgcGradient[2]} 100%
  );
`