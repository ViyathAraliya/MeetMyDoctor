import { Link } from "react-router-dom";

function ClinicSessionsHome(){
    return(<div className="clinicSessionsHome">
        <Link to="/viewClinicSessions">view clinic sessions</Link>
    </div>)
}

export default ClinicSessionsHome;