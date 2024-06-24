
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

import MakeAppointment from './components/customerComponents/MakeAppointment';
import ManageAppointments from './components/userComponents/ManageAppointments';

function App() {
  return (
<BrowserRouter>

  <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/makeAppointment" element={<MakeAppointment/>}/>
  <Route path="/ManageAppointments" element={<ManageAppointments/>}></Route>
  </Routes>
  </BrowserRouter>
 
  );
}

export default App;
