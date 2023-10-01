




const manifestJson = {
  // !!! Manifest changes only when reinstalling - may be it because of caching
  
  "short_name": "Kupidon",
  "name": "Kupidon",
  "description": "Kupidon date app",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait", // only in installed app mode
  
  // Shlashscreen colors can't be overriden by html <meta/>
  // When app has loaded, html <meta/> will override manifest values.
  
  // На нижний бар с полоской навигации андроида эти настройки не влияют
  
  // Title bar of window, status bar on mobile.
  // Splashscreen status bar color.
  // It will be overriden by <meta name="theme-color" ... />.
  "theme_color": "#f0f0f0",
  
  // Window or viewport background - before your app's stylesheets have loaded.
  // Splashscreen bgc color.
  // It will be overriden by <meta name="background-color" ... />.
  "background_color": "#f0f0f0",
  
  "icons": [
    {
      "src": "/logo64.png",
      "type": "image/png",
      "sizes": "64x64"
    },{
      "src": "/logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },{
      "src": "/logo512.png",
      "type": "image/png",
      "sizes": "512x512" // splashscreen icon
    }
  ]
} as const




export const generateManifest = ()=>{
  const newManifest = {
    ...manifestJson,
    id: `kupidon-react-app-${process.env.NODE_ENV}`,
  }
  return newManifest
}