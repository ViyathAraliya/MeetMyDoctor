import axios from "axios";
import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


function DeleteClinicSessions() {
    // fetched data
    const [clinicSessions, setClinicSessions] = useState(null);
    const [doctors, setDoctors] = useState(null);
    const [rooms, setRooms] = useState([]);

    // Created data
    const [clinicSessionDetails, setClinicSessionDetails] = useState([]);

//returns a formated time String
    const getTime = (time) => {
        if (time instanceof Date) {

            const year = time.getFullYear();
            const month = time.getMonth();
            const day = time.getDate();
            const hours = time.getHours();
            const mins = time.getMinutes();

            let dayt = day < 10 ? `0${day}` : `${day}`
            let montht = month < 10 ? `0${month}` : `${month}`
            let hourst = hours < 10 ? `0${hours}` : `${hours}`
            let minst = mins < 10 ? `0${mins}` : `${mins}`
            let timeString = `${year}-${montht}-${dayt} ${hourst}:${minst}`;
            return timeString
        }
        else { return "invalid time format"; }
    }

    useEffect(() => {
        getClinicSessions();
        getDoctors();
        getRooms();
        getTime(new Date());
    }, [])


    useEffect(() => {

        if (clinicSessionDetails != null && doctors != null && rooms != null
            && clinicSessions.length != 0 && doctors.length != 0 && rooms.length != 0) {
            createClinicDetails();
        }
    }, [clinicSessions, doctors, rooms]);

    // fetching 'ClinicSession' documents
    async function getClinicSessions() {

        try {
            const res = await axios.get("http://localhost:8080/clinicSessions");

            setClinicSessions(res.data);

        }
        catch (error) {
            console.log(error);
        }

    }

    // fetching 'Doctors' documents
    async function getDoctors() {

        try {
            const res = await axios.get("http://localhost:8080/doctors");

            setDoctors(res.data);
        }
        catch (error) {
            console.log(error);
        }

    }

    //fetching 'Room' documents
    async function getRooms() {
        try {
            const res = await axios.get("http://localhost:8080/rooms");

            setRooms(res.data);

        }
        catch (error) {
            console.log(error);
        }
    }
    // function 3: create 'clinicDetails' array to display info in a table to be read by customer/patient
    function createClinicDetails() {


        const details = [];

        // step 1 : access each clinic session 
        for (let i = 0; i < clinicSessions.length; i++) {

            let detail = {
                "id": clinicSessions[i]._id,
                "doctor": null,
                "room": null,
                "startsAt": getTime(new Date(clinicSessions[i].startsAt)),
                "endsAt": getTime(new Date(clinicSessions[i].endsAt))
            }
            const doctorId_CS = clinicSessions[i].doctorId;
            const roomId_CS = clinicSessions[i].roomId;

            //step 2 : find and set doctor document to detail
            l1: for (let j = 0; j < doctors.length; j++) {
                const doctorId_D = doctors[j]._id;

                if (doctorId_CS == doctorId_D) {
                    detail.doctor = doctors[j];
                    break l1;
                }
            }

            //step 3 : find and set room document to detail
            l2: for (let j = 0; j < rooms.length; j++) {
                const roomId_R = rooms[j]._id;

                if (roomId_CS == roomId_R) {
                    detail.room = rooms[j];
                    break l2;
                }
            }
            details.push(detail);


        }
        setClinicSessionDetails(details);
    }


    // make appoinetment

    async function deleteClinicSession(rowId) {


        const data = {
           "id":rowId
        }
        try {
            const res = await axios.post("http://localhost:8080/deleteClinicSession", data);
            console.log(res)
        }
        catch (error) { console.log(error); }

    }

    return (
        <>
            <div className="clinicSessionTable">
                <h2>Clinic Sessions</h2>

                <div className="clinic_details">
                    <table className="table table-striped">
                        <thead>

                            <tr>

                                <th>doctor name</th>
                                <th>specialization</th>
                                <th>edcuation</th>
                                <th>clinic starts At</th>
                                <th>ends At</th>
                                <th>room number</th>

                            </tr>

                        </thead>
                        <tbody>
                            {clinicSessionDetails && clinicSessionDetails.map(detail => (
                                <tr key={detail.id}

                                >
                                    <td>{detail.doctor.name}</td>
                                    <td>{detail.doctor.specialization}</td>
                                    <td>{detail.doctor.educationAbbrivation}</td>
                                    <td>{detail.startsAt}</td>
                                    <td>{detail.endsAt}</td>
                                    <td>{detail.room.roomNumber}</td>

                                    <td> <button className="btn btn-primary"
                                        onClick={() => { deleteClinicSession(detail.id) }}>delete</button></td>
                                </tr>


                            ))}
                        </tbody>

                    </table>
                </div>

            </div>

            <li><Link to="/">Home</Link></li>

        </>
    )
}

export default DeleteClinicSessions;