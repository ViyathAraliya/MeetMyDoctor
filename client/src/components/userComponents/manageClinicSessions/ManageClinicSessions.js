import { Link } from "react-router-dom";

function ManageClinicSessions(){
    return(<>
    <li><Link to="/createClinicSessions">Create Clinic Sessions</Link></li>
    <li><Link to="/deleteClinicSessions">Delete Clinic Session</Link></li>
    </>
)

}

export default ManageClinicSessions;