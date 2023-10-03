import { Themes } from 'src/utils/theme/Themes'
import { css } from '@emotion/react'
import noise from 'src/res/img/effect/noise.svg'


export const PinkGrainyGradientBgc = (t: Themes.Theme) => css`
  background-color: ${t.page.bgc[1]};
  
  background-image: url(${noise}),
    radial-gradient(circle at 1000px 0px, ${t.page.bgcPinkGradients[0]} 0% 200px, transparent 300px 100%),
    radial-gradient(circle at 1000px 1000px, ${t.page.bgcPinkGradients[0]} 0% 200px, transparent 300px 100%),
    radial-gradient(circle at 0px 1000px, ${t.page.bgcPinkGradients[0]} 0% 200px, transparent 300px 100%),
    radial-gradient(circle at 0px 0px, ${t.page.bgcPinkGradients[0]} 0% 200px, transparent 300px 100%),

    radial-gradient(circle at 0px 405px, ${t.page.bgcPinkGradients[1]} 0% 120px, transparent 220px 100%),
    radial-gradient(circle at 1000px 405px, ${t.page.bgcPinkGradients[1]} 0% 120px, transparent 220px 100%),
  
    radial-gradient(circle at 306px 1000px, ${t.page.bgcPinkGradients[2]} 0% 76px, transparent 150px 100%),
    radial-gradient(circle at 306px 0px, ${t.page.bgcPinkGradients[2]} 0% 76px, transparent 150px 100%),
  
    radial-gradient(circle at 1000px 1000px, ${t.page.bgcPinkGradients[3]} 0% 246px, transparent 666px 100%),
    radial-gradient(circle at 0px 1000px, ${t.page.bgcPinkGradients[3]} 0% 246px, transparent 666px 100%),
    radial-gradient(circle at 1000px 0px, ${t.page.bgcPinkGradients[3]} 0% 246px, transparent 666px 100%),
    radial-gradient(circle at 0px 0px, ${t.page.bgcPinkGradients[3]} 0% 246px, transparent 666px 100%),
  
    radial-gradient(circle at 232px 202px, ${t.page.bgcPinkGradients[4]} 0% 70px, transparent 130px 100%),
    radial-gradient(circle at 400px 146px, ${t.page.bgcPinkGradients[5]} 0% 70px, transparent 130px 100%),
    radial-gradient(circle at 333px 333px, ${t.page.bgcPinkGradients[6]} 0% 70px, transparent 130px 100%),
    radial-gradient(circle at 511px 306px, ${t.page.bgcPinkGradients[7]} 0% 66px, transparent 150px 100%),
    radial-gradient(circle at 300px 500px, ${t.page.bgcPinkGradients[4]} 0% 150px, transparent 300px 100%),
    radial-gradient(circle at 700px 400px, ${t.page.bgcPinkGradients[4]} 0% 150px, transparent 300px 100%),
    radial-gradient(circle at 750px 500px, ${t.page.bgcPinkGradients[8]} 0% 150px, transparent 250px 100%);

  background-size: 200px 200px,
    1000px 1000px, 1000px 1000px, 1000px 1000px, 1000px 1000px, 1000px 1000px,
    1000px 1000px, 1000px 1000px, 1000px 1000px, 1000px 1000px, 1000px 1000px,
    1000px 1000px, 1000px 1000px, 1000px 1000px, 1000px 1000px, 1000px 1000px,
    1000px 1000px, 1000px 1000px, 1000px 1000px, 1000px 1000px, 1000px 1000px,
    1000px 1000px;
`