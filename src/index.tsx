import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ReactDOM from 'react-dom/client'
import 'src/styles/reset.css'
import 'src/styles/fonts.css'
import 'src/styles/app-styles.css'
import 'react-toastify/dist/ReactToastify.css'
import 'animate.css'
import App from './pages/App/App'
import * as serviceWorkerRegistration from 'src/serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import { RecoilRoot } from 'recoil'
import RecoilNexus from 'recoil-nexus' // access recoil state from not react component






const root = ReactDOM.createRoot(
  document.getElementById('root')!
)
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilNexus />
      <DndProvider backend={HTML5Backend}>
        <App/>
      </DndProvider>
    </RecoilRoot>
  </React.StrictMode>
)





//navigator.serviceWorker.ready.then(()=>{})



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()



// test message to service worker
/* navigator.serviceWorker.ready.then(swRegistration=>{
  swRegistration.active?.postMessage({
    type: 'console.log',
    data: {
      msg1: 'test message for service worker',
      isTest: true,
    },
  })
}) */



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
