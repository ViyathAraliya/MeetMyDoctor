import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function ManageAppointments() {
    /** 
        display 'NOT_CONFIRMED' appointments
        delete/confirm appointements
        display 'CONFIRMED' appoinemnts
*/

    //fetched data
    const [appointments, setAppointments] = useState(null);
    const [doctors, setDoctors] = useState(null);
    const [clinicSessions, setClinicSessions] = useState(null);
    const [rooms, setRooms] = useState(null);

    //processed data
    const [appointmentDetails, setAppointmentDetails] = useState([]);//appointment,  doctorName, roomNumber, clinicStartsAt, clinicEndsAt

    //displayed
    const [unconfirmedAppointments, setUnconfirmedAppointments] = useState([]);
    const [confirmedAppointments, setConfirmedAppointments] = useState([]);



    useEffect(() => {
        getAppointments();
        getClinicSessions();
        getDoctors();
        getRooms();
    }, [])

    async function getAppointments() {
        try {
            const res = await axios.get("http://localhost:8080/appointments");
            setAppointments(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getClinicSessions() {
        try {
            const res = await axios.get("http://localhost:8080/clinicSessions");
            setClinicSessions(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    async function getDoctors() {
        try {
            const res = await axios.get("http://localhost:8080/doctors");
            setDoctors(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function getRooms() {
        try {
            const res = await axios.get("http://localhost:8080/rooms");
            setRooms(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    //  for 'appointmentDetails' state
    async function createAppointmentDetails() {
        /*   1. initialize empty array named 'appointmentDetails'
             2. access each 'Appointment' in 'appointments' by for loop 'l1'
             3. inside l1 : define a json object named 'appointmentDetail'
             4. inside l1 : assign 'appointment[i]' to 'appointment' propertie in 'appointmentDetail'
             5. inidee l1 : find 'ClinicSession' documnent by 'clinicSessionId' 
             6. inside l1 : find the doctor's name from 'doctors'and assisgn to 'doctorName' property in 'appointmentDetail'
             7. inside l1 : find the roomNumber from 'rooms' and assign to 'roomNumber' property in 'appointmentDetail'
             8. inside l1 : find 'startsAt' from 'clinicSessions'  and assigng to 'startsAt'   ,,   ,,
             9. inside l1 : find 'endsAt' from 'clinicSessions' and assign to 'endsAt'  ,,  ,,
    
            */
        // step 1: initialize empty array named 'appointmentDetails'
        try {
            let appointmentDetails = [];

            // step 2 : access each 'Appointment' in 'appointments' by for loop 'l1'
            l1: for (let j = 0; j < appointments.length; j++) {

                // step 3 : inside l1 : define a json object named 'appointmentDetail'
                let appointmentDetail = {
                    "appointment": null,
                    "doctorName": null,
                    "roomNumber": null,
                    "startsAt": null,
                    "endsAt": null
                };

                // step 4. inside l1 : assign 'appointment[i]' to 'appointment' propertie in 'appointmentDetail'
                const appointment = appointments[j];
                appointmentDetail.appointment = appointment;

                // step 5 : inidee l1 : find 'ClinicSession' documnent by 'clinicSessionId' 
                const clinicSessionId = appointment.clinicSession;
                let clinicSession = null;

                l2: for (let i = 0; i < clinicSessions.length; i++) {
                    if (clinicSessionId == clinicSessions[i]._id) {

                        clinicSession = clinicSessions[i];
                        console.log(clinicSession)
                        break l2;
                    }
                }


                //step 6 :  inside l1 : find the doctor's name from 'doctors'and assisgn to 'doctorName' property in 'appointmentDetail'
                const doctorId = clinicSession.doctorId;
                l3: for (let i = 0; i < doctors.length; i++) {
                    console.log("com : ", doctorId, " vs ", doctors[i]._id, " : ", doctorId == doctors[i]._id)
                    if (doctorId == doctors[i]._id) {
                        appointmentDetail.doctorName = doctors[i].name;
                        console.log("found")
                        break l3;
                    }
                }

                // step 7 : inside l1 : find the roomNumber from 'rooms' and assign to 'roomNumber' property in 'appointmentDetail' 
                const roomId = clinicSession.roomId;
                l4: for (let i = 0; i < rooms.length; i++) {
                    if (roomId == rooms[i]._id) {
                        appointmentDetail.roomNumber = rooms[i].roomNumber;
                        break l4;
                    }
                }

                // step 8 : inside l1 : find 'startsAt' from 'clinicSessions'  and assigng to 'startsAt'   ,,   ,,
                appointmentDetail.startsAt = clinicSession.startsAt;

                // step 9 : inside l1 : find 'endsAt' from 'clinicSessions' and assign to 'endsAt'  ,,  ,,
                appointmentDetail.endsAt = clinicSession.endsAt;

                appointmentDetails.push(appointmentDetail);


            }
            setAppointmentDetails(appointmentDetails);
        } catch (error) {
            console.log(error)
        }



    }

    //delete if status='DISCARD' , update id status('CONFIRMED')
    async function updateAppointmentStatus(appointmentId,status) {
        try {
            const data={    "appointmentId" : appointmentId,
                "status" : status}
            const res = await axios.post("http://localhost:8080/appointments/updateStatus",data);
            console.log(res);
            getAppointments();
        } catch (error) {
            console.log(error);
        }


    }



    return (<><h2>Appointments</h2>
        <button onClick={createAppointmentDetails}>load</button>
        <div className="unconfirmed appointments">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>customer/patient name</th>
                        <th>contact number</th>
                        <th>doctor name</th>
                        <th>room number</th>
                        <th>Queue number</th>
                        <th>clinic starts At</th>
                        <th>clinic ends at </th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointmentDetails && appointmentDetails.map(detail => (
                        detail.appointment.status == 'NOT_CONFIRMED_YET' && (
                            <tr key={detail.appointment._id}>
                                <td>{detail.appointment.patientName}</td>
                                <td>{detail.appointment.contactNo}</td>
                                <td>{detail.doctorName}</td>
                                <td>{detail.roomNumber}</td>
                                <td>{detail.appointment.queueNumber}</td>
                                <td>{detail.startsAt}</td>
                                <td>{detail.endsAt}</td>
                                <td>{detail.appointment.status}</td>
                                <td><button className="btn btn-primary" 
                                onClick={()=>{updateAppointmentStatus(detail.appointment._id,'DISCARD')}}>discard</button></td>
                                <td><button className="btn btn-primary"
                                 onClick={()=>{updateAppointmentStatus(detail.appointment._id,'CONFIRMED')}}>confirm</button></td>
                            </tr>)
                    ))

                    }
                </tbody>
            </table>
        </div>
        <div className="confirmed appointments">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>customer/patient name</th>
                        <th>contact number</th>
                        <th>doctor name</th>
                        <th>room number</th>
                        <th>Queue number</th>
                        <th>clinic starts At</th>
                        <th>clinic ends at </th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointmentDetails && appointmentDetails.map(detail => (
                        detail.appointment.status === 'CONFIRMED' && (
                            <tr key={detail.appointment._id}>
                                <td>{detail.appointment.patientName}</td>
                                <td>{detail.appointment.contactNo}</td>
                                <td>{detail.doctorName}</td>
                                <td>{detail.roomNumber}</td>
                                <td>{detail.appointment.queueNumber}</td>
                                <td>{detail.startsAt}</td>
                                <td>{detail.endsAt}</td>
                                <td>{detail.appointment.status}</td>
                                
                               
                            </tr>)
                    ))

                    }
                </tbody>
            </table>
        </div>
    </>)
}
export default ManageAppointments;