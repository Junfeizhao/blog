import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.less'
import reportWebVitals from './reportWebVitals'
import { Route, Routes } from 'react-router-dom';
import history from './utils/history'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Home from './components/home/index'
import Login from './components/login/index'
import Quill from './components/creation/quill/index'
ReactDOM.render(
  <HistoryRouter history={history}>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/creation/quill' element={<Quill />}></Route>
    </Routes>
  </ HistoryRouter>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
