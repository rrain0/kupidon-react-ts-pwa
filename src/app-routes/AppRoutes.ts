import { RouteBuilder } from 'src/utils/react/route-builder/RouteBuilder'
import buildRoute = RouteBuilder.buildRoute
import buildPath = RouteBuilder.buildPath
import path = RouteBuilder.path
import params = RouteBuilder.params




export namespace AppRoutes {
  
  
  
  const test = buildRoute({
    [path]: 'test',
    scrollbar: buildPath('scrollbar'),
    bottomSheet: buildPath('bottomSheet'),
    resizeObserver: buildPath('resizeObserver'),
    moveElementToAnotherView: buildPath('moveElementToAnotherView'),
  })
  
  
  
  const findPairs = buildRoute({
    [path]: 'findPairs'
  })
  
  
  
  const login = buildRoute({
    [path]: 'login',
    [params]: {
      returnPath: 'returnPath',
    }
  })
  
  
  
  const signup = buildRoute({
    [path]: 'signup',
    [params]: {
      returnPath: 'returnPath',
    }
  })
  
  
  
  const profileId = buildRoute({
    [path]: 'id',
    userId: buildPath(':userId'),
  })
  const profile = buildRoute({
    [path]: 'p',
    id: profileId,
  })
  
  
  
  const settings = buildRoute({
    [path]: 'settings',
    account: buildPath('account'),
    app: buildPath('app'),
  })
  
  
  
  export const RootRoute = buildRoute({
    [path]: '',
    test: test,
    findPairs: findPairs,
    login: login,
    signup: signup,
    profile: profile,
    settings: settings,
  })
  
}