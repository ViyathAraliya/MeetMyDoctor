import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home(){
    useEffect(()=>{
        clearExpiredDocs();

    },[])


    async function clearExpiredDocs(){
            try{
                const res= await axios.delete("http://localhost:8080/clinicSessionsd/deleteExpiredDocs");
                console.log(res);

            }catch(error){
                console.log(error.response.message);
            }
    }

    return(<>
    <label>Hello</label>
   <li><Link to="/makeAppointment">Make an Appointment</Link></li> 
   <li><Link to="/manageAppointments">Manage Appointments</Link></li>
   <li><Link to="/createClinicSessions">Create Clinic Sessions</Link></li>
   <li><Link to="/manageDoctors">Manage Doctors</Link></li>
   <li><Link to="/rooms">Manage Rooms</Link></li>
   <li><Link to="/manageClinicSessions">Manage ClincSessions</Link></li>
   <li><Link to="/storageMM">Manage Store</Link></li>
   
    </>)
}
export default Home;