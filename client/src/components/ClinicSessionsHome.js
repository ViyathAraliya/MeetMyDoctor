import { Link } from "react-router-dom";
import "../styles/clinicSessionsHome.css"


function ClinicSessionsHome() {
    return (
        <div className="clinicSessionsHome-container">
            <div className="clinicSessionsHome">
                <li><Link to="/viewClinicSessions">view clinic sessions</Link></li>
                <li><Link to="/createClinicSessions">Create Clinic Sessions</Link></li>
                <li><Link to="/deleteClinicSessions">Delete Clinic Sessions</Link></li>

            </div>
        </div>
    )
}

export default ClinicSessionsHome;