
import api, { useErrorLog } from './helpers/api.jsx';

import { useState, useEffect } from 'react'
import './assets/css/App.css'
import './assets/css/flex.css'

import Button from './components/Button.jsx'


import Dashboard from './pages/Dashboard.jsx'


const Header = () => {
  return <div className='header frlc nw' >🐮 Pour Milk production</div>
}


function App() {
  const { addError, errors } = useErrorLog();


  return (
    <>

      <Header />
      <div className='buttons frlc'>
        <Button text="Dashboard" ico="dashboard" />
        <Button text="Data enter" ico="forms" />
        <Button text="Reports" ico="analytics" />
      </div>
      <Dashboard />
      <div className="error-log">
        {errors.map((e, i) => <p key={i} style={{ color: 'red' }}>⚠️ {e}</p>)}
      </div>
    </>
  )
}

export default App
