import axios from "axios";
import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';


function Appointments_customer() {
    const [clinicSessions, setClinicSessions] = useState(null);
    const [doctors, setDoctors]=useState(null);

    useEffect(() => {
        getClinicSessions();
        getDoctors();

    })

    function getClinicSessions() {
        axios.get("http://localhost:8080/clinicSessions")
            .then(function (response) {
                setClinicSessions(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getDoctors(){
        axios.get("http://localhost:8080/doctors")
        .then(function(response){
            setDoctors(response.data)
        })
        .catch(function(error){
            console.log(error)
        })

    }

    return (
        <>
            <div className="clinicSessionTable">
                <h2>Clinic Sessions</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>doctorID</th>
                            <th>starts at</th>
                            <th>ends at</th>
                            <th>room id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clinicSessions && clinicSessions.map(clinicSession => (
                            <tr key={clinicSession._id}><td>
                                {clinicSession.doctorId}</td>
                                <td>{clinicSession.startsAt}</td>
                                <td>{clinicSession.endsAt}</td>
                                <td>{clinicSession.roomId}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="clinicSessionTable">
                <h2>Clinic Sessions</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>doctor</th>
                            <th>specialization</th>
                            <th>education</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {doctors && doctors.map(doctor => (
                            <tr key={doctor._id}><td>
                                {doctor.name}</td>
                                <td>{doctor.specialization}</td>
                                <td>{doctor.educationAbbrivation}</td>
                              </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Appointments_customer;