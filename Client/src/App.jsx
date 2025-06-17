import EmployeeLogin from "./EmployeeLogin"
import AdminLogin from "./AdminLogin"
import AdminSignup from "./AdminSignup"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Welcomepage from './welcomepage'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/AdminSignup" element={<AdminSignup />}></Route>
        <Route path="/AdminLogin" element={<AdminLogin />}></Route>
        <Route path="/EmployeeLogin" element={<EmployeeLogin />}></Route>
       <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App