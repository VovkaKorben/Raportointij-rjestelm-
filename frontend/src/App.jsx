// import api from './helpers/api.js'; 
import { useErrorLog } from './helpers/ErrorProvider.jsx';

// import { useState, useEffect } from 'react'
import './assets/css/App.css'
import './assets/css/flex.css'
import './assets/css/errors.css'

import Button from './components/Button.jsx'


import Dashboard from './pages/Dashboard.jsx'


const Header = () => {
  return <div className='header frlc nw' >🐮 Pour Milk production</div>
}


function App() {
  const { errors, clearErrors } = useErrorLog();


  return (
    <>

      <Header />
      <div className='buttons frlc'>
        <Button text="Dashboard" ico="dashboard" />
        <Button text="Data enter" ico="forms" />
        <Button text="Reports" ico="analytics" />
      </div>
      <Dashboard />
      {errors.length > 0 &&
        <div className="error-log" onClick={clearErrors}>

          {errors.map((e, i) => <div key={i} className='error-line' >⚠️ {e}</div>)}
          {/* <div className="error-close">        </div> */}
        </div>
      }
    </>
  )
}

export default App
