import { useErrorLog } from './helpers/api.js';
import { BrowserRouter , Routes, Route, NavLink } from 'react-router-dom';

import './assets/css/App.css'
import './assets/css/flex.css'
import './assets/css/errors.css'

import Button from './components/Button.jsx'


import Dashboard from './pages/Dashboard.jsx'
import Enter from './pages/Enter.jsx'
import Reports from './pages/Reports.jsx'


const Header = () => {
  return <div className='header frlc nw' >🐮 Pour Milk production</div>
}


function App() {
  const { errors, clearErrors } = useErrorLog();


  return (
    <BrowserRouter>

      <Header />
      <div className='buttons frlc'>
        <NavLink to="/" >
          <Button text="Dashboard" ico="dashboard" />
        </NavLink>

        <NavLink to="/enter" >
          <Button text="Data enter" ico="forms" />
        </NavLink>
        <NavLink to="/reports" >
          <Button text="Reports" ico="analytics" />
        </NavLink>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/enter/:department?" element={<Enter />} />
        <Route path="/reports" element={<div style={{ padding: '20px' }}>Here will be reports</div>} />
      </Routes>


      {errors.length > 0 &&
        <div className="error-log" onClick={clearErrors}>

          {errors.map((e, i) => <div key={i} className='error-line' >⚠️ {e}</div>)}
          {/* <div className="error-close">        </div> */}
        </div>
      }
    </BrowserRouter>
  )
}

export default App
