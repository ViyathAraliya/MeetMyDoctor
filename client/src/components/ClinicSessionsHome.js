import { Link } from "react-router-dom";

function ClinicSessionsHome(){
    return(<div className="clinicSessionsHome">
        <li><Link to="/viewClinicSessions">view clinic sessions</Link></li>
        <li><Link to="/createClinicSessions">Create Clinic Sessions</Link></li>
        <li><Link to="/deleteClinicSessions">Delete Clinic Sessions</Link></li>

    </div>)
}

export default ClinicSessionsHome;