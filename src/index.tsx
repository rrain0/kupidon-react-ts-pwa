import React from 'react'
import ReactDOM from 'react-dom/client'
import 'src/styles/reset.css'
import 'src/styles/fonts.css'
import 'src/styles/app-styles.css'
import 'react-toastify/dist/ReactToastify.css'
import 'animate.css'
import { generateManifest } from 'src/utils/app/generateManifest'
import App from './pages/App/App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import { RecoilRoot } from 'recoil'
import RecoilNexus from 'recoil-nexus' // access recoil state from not react component
import { BrowserRouter } from 'react-router-dom'



/* {
  const manifest = generateManifest()
  let manifestJsonString = encodeURIComponent(JSON.stringify(manifest));
  let dataUrl = `data:application/manifest+json,${manifestJsonString}`
  const link = document.querySelector('html head link[rel=manifest]') as HTMLLinkElement
  link.href = dataUrl
} */



const root = ReactDOM.createRoot(
  document.getElementById('root')!
)
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilNexus />
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
)



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
