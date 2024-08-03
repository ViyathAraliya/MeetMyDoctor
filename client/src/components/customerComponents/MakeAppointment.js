import axios from "axios";
import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../utils/AuthContext";
import '../../styles/makeAppointment.css'



function MakeAppointment() {
    // fetched data
    const [clinicSessions, setClinicSessions] = useState(null);
    const [doctors, setDoctors] = useState(null);
    const [rooms, setRooms] = useState([]);          

    // Created data
    const [clinicSessionDetails, setClinicSessionDetails] = useState([]);



    // customer data
    const [patientName, setPatientName] = useState(null);
    const [contactNo, setContactNo] = useState(null);
    const [address, setAddress] = useState(null);
    const [description, setDescription] = useState(null);


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
     //  deleteSharedDocs();
        getClinicSessions();
        getDoctors();
        getRooms();
        getTime(new Date());
    }, [])


    useEffect(() => {

        if (clinicSessions != null && doctors != null && rooms != null
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
            toast.error("An error occured while fetching clinic sessions. Check console for more details");
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
            toast.error("An error occured while fetching doctors. Check console for more details")
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
            toast.error("An error occured while fetching rooms. Check console for more details")
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


    function handlePatientName(event) {
        setPatientName(event.target.value);
    }

    function handleContactNo(event) {
        setContactNo(event.target.value);
    }

    function handleAddress(event) {
        setAddress(event.target.value);
    }



    function handleDescription(event) {
        setDescription(event.target.value);
    }

    // make appoinetment

    async function makeAppointment(rowId) {
        


        const data = {
            "patientName": patientName, "contactNo": contactNo, "address": address,
            "description": description, "clinicSessionId": rowId
        }
        try {
            const res = await axios.post("http://localhost:8080/appointments", data);
            toast.success(`Appointment saved succesfully`);
            console.log(res.statusText)

        }
        catch (error) {
            const errorRes = error.response;
            if (errorRes!=null) {
                toast.error(errorRes.data);
                console.log(errorRes.data);
            }
            else {
                toast.error("An error occured while saving the appointment. Check console for more details"); 
                console.log(errorRes) }

        }

    }



        return (
            <>
    <div className="makeAppointment_container">
        <div className="makeAppointment-form">
                <form >
                    <label htmlFor="name">Customer/Patient Name</label>
                    <input id="name" onChange={handlePatientName} />
                    <br />
                    <label htmlFor="contactNo">Contact Number</label>
                    <input id="contactNo" onChange={handleContactNo} />
                    <br />
                    <label htmlFor="address">Address</label>
                    <input id="address" onChange={handleAddress} />
                    <br />
                    <label htmlFor="description">Description</label>
                    <input id="description" onChange={handleDescription} />
                    <br />

                </form>
                </div>

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
                                        <td>{detail.doctor?detail.doctor.name:"not found"}</td>
                                        <td>{detail.doctor?detail.doctor.specialization:"not found"}</td>
                                        <td>{detail.doctor?detail.doctor.educationAbbrivation:"not found"}</td>
                                        <td>{detail.startsAt}</td>
                                        <td>{detail.endsAt}</td>
                                        <td>{detail.room?detail.room.roomNumber:"not found"}</td>

                                        <td> <button className="btn btn-primary"
                                            onClick={() => { makeAppointment(detail.id) }}>Make an Appointment</button></td>
                                    </tr>


                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>
                <div><ToastContainer /></div>

                <li><Link to="/">Home</Link></li>
</div>
            </>
        )
    }

    export default MakeAppointment;
    