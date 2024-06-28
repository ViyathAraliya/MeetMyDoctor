
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

import MakeAppointment from './components/customerComponents/MakeAppointment';
import ManageAppointments from './components/userComponents/ManageAppointments';
import ManageClinicSessions from './components/userComponents/ManageClinicSessions';

function App() {
  return (
<BrowserRouter>

  <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/makeAppointment" element={<MakeAppointment/>}/>
  <Route path="/manageAppointments" element={<ManageAppointments/>}></Route>
  <Route path="/manageClinicSessions" element={<ManageClinicSessions/>}></Route>
  </Routes>
  </BrowserRouter>
 
  );
}

export default App;
