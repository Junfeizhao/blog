import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.less'
import reportWebVitals from './reportWebVitals'
import Home from './components/home/index'
import Login from './components/login/index'
import RichText from './components/creation/richtext'

ReactDOM.render(
  <React.StrictMode>
    <RichText />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
