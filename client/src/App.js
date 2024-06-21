
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Appointments_customer from './components/customerComponents/Appointments_customer';

function App() {
  return (
<BrowserRouter>

  <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/appointments_customer" element={<Appointments_customer/>}/>
  </Routes>
  </BrowserRouter>
 
  );
}

export default App;
