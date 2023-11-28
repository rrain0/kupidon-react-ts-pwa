import { Themes } from 'src/utils/theme/Themes'
import { DarkPink } from 'src/utils/theme/themes/DarkPink'
import { LightPink } from 'src/utils/theme/themes/LightPink'
import Theme = Themes.Theme



export const LightOrange: Theme = {
  ...LightPink,
  name: 'Light Orange',
  
  buttonMain: {
    ...LightPink.buttonMain,
    bgc: ['#f95c67'],
  },
  
  input: {
    ...LightPink.input,
    border:      ['#ef7b7d','#fb3570'],
    borderHover: ['#00a8f3'],
  },
}


export const DarkOrange: Theme = {
  ...DarkPink,
  name: 'Dark Orange',
  
  buttonMain: {
    ...LightPink.buttonMain,
    bgc: ['#d9816f'],
  },
  
  input: {
    ...LightPink.input,
    border:      ['#ef7b7d','#fb3570'],
    borderHover: ['#00a8f3'],
  },
}



export const LightPinkGradient: Theme = {
  ...LightPink,
  name: 'Light Pink Gradient',
  
  page: {
    ...LightPink.page,
    bgcGradient: ['#ffaeba','#f0f0f0','#f0f0f0'],
    //bgc: ['#ffb6c1','#f5f5f5','#d8701a'],
  },
  nav: {
    ...LightPink.nav,
    bgc: ['#f6d6db'],
  }
}


export const DarkGradient: Theme = {
  ...DarkPink,
  name: 'Dark Pink Gradient',
  
  page: {
    ...DarkPink.page,
    bgcGradient: ['#992c46','#282c34','#282c34'],
    //bgc: ['#992c46','#282c34','#994500'],
  },
  buttonNav: {
    ...DarkPink.buttonNav,
    contentAccent: ['#d92a54'],
  },
  nav: {
    ...DarkPink.nav,
    bgc: ['#b06772'],
  }
}
