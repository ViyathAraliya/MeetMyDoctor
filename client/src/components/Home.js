import { Link } from "react-router-dom";

function Home(){

    return(<>
    <label>Hello</label>
   <li><Link to="/makeAppointment">Make an Appointment</Link></li> 
   <li><Link to="/manageAppointments">Manage Appointments</Link></li>
   <li><Link to="/createClinicSessions">Create Clinic Sessions</Link></li>

    </>)
}
export default Home;