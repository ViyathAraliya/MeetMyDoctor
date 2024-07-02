
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

import MakeAppointment from './components/customerComponents/MakeAppointment';
import ManageAppointments from './components/userComponents/ManageAppointments';


import AddDoctor from './components/userComponents/manageDoctors/AddDoctor';
import ManageDoctors from './components/userComponents/manageDoctors/ManageDoctors';
import Room from './components/userComponents/manageRooms/Room';
import CreateClinicSessions from './components/userComponents/manageClinicSessions/CreateClinicSessions';
import ManageClinicSessions from './components/userComponents/manageClinicSessions/ManageClinicSessions';
import DeleteClinicSessions from './components/userComponents/manageClinicSessions/DeleteClinicSessions';

function App() {
  return (
<BrowserRouter>

  <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/makeAppointment" element={<MakeAppointment/>}/>
  <Route path="/manageAppointments" element={<ManageAppointments/>}/>
  <Route path="/createClinicSessions" element={<CreateClinicSessions/>}/>
  <Route path="/manageDoctors" element={<ManageDoctors/>}/>
  <Route path="/addDoctor" element={<AddDoctor/>}/>
  <Route path="/rooms"  element={<Room/>}/>
  <Route path="/manageClinicSessions" element={<ManageClinicSessions/>}/>
  <Route path="/deleteClinicSessions" element={<DeleteClinicSessions/>}/>
  </Routes>
  </BrowserRouter>
 
  );
}

export default App;
