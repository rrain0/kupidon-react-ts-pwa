

export namespace ApiRoutes {
  
  
  export const api = function(){
    switch (process.env.NODE_ENV){
      case 'development': case 'production': default:
        return 'https://dev.kupidon.rrain.ydns.eu:50040/api'
    }
  }()
  
  export const authRefresh = `${api}/auth/refresh`
  export const authLogin = `${api}/auth/login`
  
  export const userCurrent = `${api}/user/current`
  export const userCreate = `${api}/user/create`
  
}