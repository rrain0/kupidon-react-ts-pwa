import { RoutesBuilder } from './utils/RoutesBuilder'


export namespace AppRoutes {
  import RouteDescription = RoutesBuilder.RouteDescription
  
  
  const testRoutes = {
    path: 'test'
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
  
  
  
  const rootRoutes = {
    path: '/',
    paths: {
      test: testRoutes,
      main: mainRoutes, // todo - это заглушка для дальнейшего развития приложения
      login: loginRoutes,
      signup: signupRoutes,
      profile: profileIdRoutes,
    }
  } satisfies RouteDescription
  export const RootRoutes = RoutesBuilder.buildRoutes(rootRoutes)
  
  
  
}