
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

import MakeAppointment from './components/customerComponents/MakeAppointment';
import ManageAppointments from './components/userComponents/ManageAppointments';



import Room from './components/userComponents/manageRooms/Room';
import CreateClinicSessions from './components/userComponents/manageClinicSessions/CreateClinicSessions';
import ManageClinicSessions from './components/userComponents/manageClinicSessions/ManageClinicSessions';
import DeleteClinicSessions from './components/userComponents/manageClinicSessions/DeleteClinicSessions';
import StorageMM from './components/StorageMM';
import ManageDoctors from './components/userComponents/manageDoctors/ManageDoctors';
import Users from './components/userComponents/Users';
import Login from './components/userComponents/Login';
import { AuthProvider } from './utils/AuthContext';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './utils/ProtectedRoute';
import AppointmentHome from './components/AppointmentHome';
import ViewClinicSessions from './components/viewCollections/ViewClinicSessions';
import ClinicSessionsHome from './components/ClinicSessionsHome';
import ViewAppointments from './components/viewCollections/ViewAppointments';



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Routes>
          <Route element={<ProtectedRoute/>}>
          <Route path="/createClinicSessions" element={<CreateClinicSessions />} />
           </Route>

          {/*unprotected*/}
          <Route path="/makeAppointment" element={<MakeAppointment />} />
          <Route path="/viewClinicSessions" element={<ViewClinicSessions/>} />
          <Route path="/viewAppointments" element={<ViewAppointments/>}/>
          <Route path="/clinicSesssions" element={<ClinicSessionsHome/>}/>

          <Route path="/" element={<Home />} />

          <Route path="/appointments" element={<AppointmentHome/>}></Route>
          <Route path="/manageAppointments" element={<ManageAppointments />} />
        
          <Route path="/manageDoctors" element={<ManageDoctors />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/manageClinicSessions" element={<ManageClinicSessions />} />
          <Route path="/deleteClinicSessions" element={<DeleteClinicSessions />} />
          <Route path="/storage" element={<StorageMM />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </BrowserRouter>
      <ToastContainer/>
    </AuthProvider>

  );
}

export default App;
