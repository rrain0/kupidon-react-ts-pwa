import { RouteBuilder } from 'src/utils-react/route-builder/RouteBuilder'
import { RoutesBuilder } from 'src/examples/routes-builder/RoutesBuilder'
import RouteDescription = RoutesBuilder.RouteDescription



export namespace AppRoutes0 {
  
  
  const testRoutes = {
    path: 'test',
    paths: {
      scrollbar: 'scrollbar',
      bottomSheet: 'bottom-sheet',
      resizeObserver: 'resize-observer',
    }
  }
  
  
  // todo - это заглушка для дальнейшего развития приложения
  const mainRoutes = {
    path: 'main'
  } satisfies RouteDescription
  
  
  const loginRoutes = {
    path: 'login',
    params: {
      returnPath: 'return-path',
    }
  } satisfies RouteDescription
  
  
  
  const signupRoutes = {
    path: 'signup',
    params: {
      returnPath: 'return-path',
    }
  } satisfies RouteDescription
  
  
  
  const profileIdRoutes = {
    path: 'p',
    paths: {
      id: { path: 'id',
        paths: {
          userId: ':userId',
        }
      },
    }
  } satisfies RouteDescription
  
  
  
  /*
  const settingsRoutes = {
    path: 'settings'
  } satisfies RouteDescription
  */
  
  
  const rootRoutes = {
    path: '/',
    paths: {
      test: testRoutes,
      main: mainRoutes, // todo - это заглушка для дальнейшего развития приложения
      login: loginRoutes,
      signup: signupRoutes,
      profile: profileIdRoutes,
      //settings: settingsRoutes,
    }
  } satisfies RouteDescription
  
  export const RootRoutes = RoutesBuilder.buildRoutes(rootRoutes)
  
}




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