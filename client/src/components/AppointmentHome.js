import { Link } from "react-router-dom";

function AppointmentHome(){

    return(<div className="appointmentHome">
         <li><Link to="/makeAppointment">Make an Appointment</Link></li> 
         <li><Link to="/manageAppointments">Manage Appointments</Link></li>
    </div>)
}

export default AppointmentHome;