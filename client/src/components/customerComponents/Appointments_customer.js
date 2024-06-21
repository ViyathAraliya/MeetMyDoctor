import axios from "axios";
import { useEffect, useState } from "react"

function Appointments_customer() {
    const [clinicSessions, setClinicSessions] = useState(null);

    useEffect(() => {
        getClinicSessions();

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

    return (
        <>
            <div className="clinicSessionTable">
                <h2>Clinic Sessions</h2>
                <table>
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
        </>
    )
}

export default Appointments_customer;