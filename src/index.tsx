import React from 'react'
import ReactDOM from 'react-dom/client'
import 'src/styles/reset.css'
import 'src/styles/fonts.css'
import 'src/styles/index.css'
import 'react-toastify/dist/ReactToastify.css'
import 'animate.css'
import App from './pages/App/App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import { RecoilRoot } from 'recoil'
import RecoilNexus from 'recoil-nexus' // access recoil state from not react component
import { BrowserRouter } from 'react-router-dom'
import { StyleSheetManager } from 'styled-components';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilNexus />
      <BrowserRouter>
        <StyleSheetManager
          // 'styled-components' will not render this as html attributes
          shouldForwardProp={prop=>!['css','theme'].includes(prop)}
        >
          <App/>
        </StyleSheetManager>
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
