
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

import MakeAppointment from './components/customerComponents/MakeAppointment';
import ManageAppointments from './components/userComponents/ManageAppointments';

import CreateClinicSessions from './components/userComponents/CreateClinicSessions';
import AddDoctor from './components/userComponents/manageDoctors/AddDoctor';
import ManageDoctors from './components/userComponents/manageDoctors/ManageDoctors';
import Room from './components/userComponents/manageRooms/Room';


function App() {
  return (
<BrowserRouter>

  <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/makeAppointment" element={<MakeAppointment/>}/>
  <Route path="/manageAppointments" element={<ManageAppointments/>}></Route>
  <Route path="/createClinicSessions" element={<CreateClinicSessions/>}></Route>
  <Route path="/manageDoctors" element={<ManageDoctors/>}></Route>
  <Route path="/addDoctor" element={<AddDoctor/>}></Route>
  <Route path="/rooms"  element={<Room/>}></Route>
  </Routes>
  </BrowserRouter>
 
  );
}

export default App;
