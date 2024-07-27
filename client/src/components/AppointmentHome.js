import { Link } from "react-router-dom";
import "../styles/appointmentHome.css";


function AppointmentHome() {

  return (<div className="appointmentHome-container">
    <div className="appointment">
    <li><Link to="/viewAppointments">View Appointments</Link></li>
    <li><Link to="/makeAppointment">Make an Appointment</Link></li>
    <li><Link to="/manageAppointments">Manage Appointments</Link></li>
    </div>
  </div>)
}

export default AppointmentHome;