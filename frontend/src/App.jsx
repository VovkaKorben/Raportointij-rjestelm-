import { useErrorLog } from './helpers/ErrorProvider.jsx';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

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
    <Router>

      <Header />
      <div className='buttons frlc'>
        <NavLink to="/" >
          <Button text="Dashboard" ico="dashboard" />
        </NavLink>

        <Button text="Data enter" ico="forms" />
        <Button text="Reports" ico="analytics" />
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/enter" element={<div style={{ padding: '20px' }}>Здесь будет форма ввода данных</div>} />
        <Route path="/reports" element={<div style={{ padding: '20px' }}>Здесь будут отчеты</div>} />
      </Routes>


      {errors.length > 0 &&
        <div className="error-log" onClick={clearErrors}>

          {errors.map((e, i) => <div key={i} className='error-line' >⚠️ {e}</div>)}
          {/* <div className="error-close">        </div> */}
        </div>
      }
    </Router>
  )
}

export default App
