
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

import MakeAppointment from './components/customerComponents/MakeAppointment';
import ManageAppointments from './components/userComponents/ManageAppointments';

import CreateClinicSessions from './components/userComponents/CreateClinicSessions';

function App() {
  return (
<BrowserRouter>

  <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/makeAppointment" element={<MakeAppointment/>}/>
  <Route path="/manageAppointments" element={<ManageAppointments/>}></Route>
  <Route path="/createClinicSessions" element={<CreateClinicSessions/>}></Route>
  </Routes>
  </BrowserRouter>
 
  );
}

export default App;
