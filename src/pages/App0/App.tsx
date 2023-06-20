import React, { useState } from 'react';
import logo from '../../logo.svg';
import './App.css';

const localhostDevApiUrl = "http://localhost:4000"
const prodApiUrl = "https://kupidon.ddns.net/api"

const devApiUrl = "https://kupidon.ddns.net:50040"

function App() {
  
  const [responseData, setResponseData] = useState('')
  
  const testCors1 = async ()=>{
    const response = await fetch(
      //`${localhostDevApiUrl}/ktor/hello`,
      //`${prodApiUrl}/ktor/hello`,
      `${devApiUrl}/ktor/hello`,
      {
        method: 'get',
      })
    const textTestData = await response.text()
    console.log('textTestData:', textTestData)
    setResponseData(textTestData)
  }
  
  const testCors2 = async ()=>{
    const response = await fetch(
      //`${localhostDevApiUrl}/ktor/json/test-data/45`,
      //`${prodApiUrl}/ktor/json/test-data/45`,
      `${devApiUrl}/ktor/json/test-data/45`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
          "intProp": 5,
          "boolProp": true,
          "doubleProp": 67.35,
          "stringProp": "какая-то строка",
          "arrayProp": [false, 87, "some string", null],
          "mapProp": {
            "id": 78,
            "name": "Lax",
            "hasSuperpowers": true,
            "color": null
          },
          "nullProp": null
        })
      })
    const jsonTestData = await response.json()
    console.log('jsonTestData:', jsonTestData)
    setResponseData(JSON.stringify(jsonTestData))
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React+
        </a>
        <p>{responseData}</p>
        <button onClick={testCors1}>Test Cors 1</button>
        <button onClick={testCors2}>Test Cors 2</button>
      </header>
    </div>
  );
}

export default App;
