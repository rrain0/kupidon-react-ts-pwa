import { RouteBuilder } from 'src/utils-react/route-builder/RouteBuilder'




export namespace AppRoutes {
  
  
  import buildRoute = RouteBuilder.buildRoute
  import buildPath = RouteBuilder.buildPath
  import path = RouteBuilder.path
  import params = RouteBuilder.params
  
  
  const testRoute = buildRoute({
    [path]: 'test',
    scrollbar: buildPath('scrollbar'),
    bottomSheet: buildPath('bottom-sheet'),
    resizeObserver: buildPath('resize-observer'),
    moveElementToAnotherView: buildPath('move-element-to-another-view'),
  })
  
  
  // todo - это заглушка для дальнейшего развития приложения
  const mainRoute = buildRoute({
    [path]: 'main'
  })
  
  
  const loginRoute = buildRoute({
    [path]: 'login',
    [params]: {
      returnPath: 'return-path',
    }
  })
  
  
  
  const signupRoute = buildRoute({
    [path]: 'signup',
    [params]: {
      returnPath: 'return-path',
    }
  })
  
  
  
  const profileIdRoute = buildRoute({
    [path]: 'id',
    userId: buildPath(':userId'),
  })
  const profileRoute = buildRoute({
    [path]: 'p',
    id: profileIdRoute,
  })
  
  
  
  /*
  const settingsRoute = buildRoute({
   [path]: 'settings'
  })
  */
  
  
  export const RootRoute = buildRoute({
    [path]: '',
    test: testRoute,
    main: mainRoute, // todo - это заглушка для дальнейшего развития приложения
    login: loginRoute,
    signup: signupRoute,
    profile: profileRoute,
    //settings: settingsRoute,
  })
  
}