import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";


const getCurrentLocalDateTime = () => {
    const currentDate = new Date();
    const localDateTimeString = currentDate.toLocaleString();
    const parsedDate = new Date(localDateTimeString);
    const formattedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm");
    return formattedDate;
}
function CreateClinicSessions() {
    const [doctors, setDoctors] = useState(null);
    const [rooms, setRooms] = useState(null);
    const [clinicSessions, setClinicSessions] = useState(null);

    //only difference between doctor and doctorDetail is timeSlots mapped to doctor
    const [doctorDetails, setDoctorDetails] = useState(null);

    //only difference between room and roomDetails is timeSlots mapped to room
    const [roomDetails, setRoomDetails] = useState(null);


    // to toggle visibility of time slots in doctor detail table
    const [showTimeSlots_doctor, setShowTimeSlots_doctor] = useState(false);
    const [showTimeSlots_doctorId, setShowTimeSlots_doctorId] = useState(null);

    // to toggle visibility of time slots in room detail table
    const [showTimeSlots_room, setShowTimeSlots_room] = useState(false);
    const [showTimeSlots_roomId, setShowTimeSlots_roomId] = useState(null);

    //store doctorID and roomId
    const [doctorId, setDoctorId] = useState(null);
    const [roomId, setRoomId] = useState(null);

    //store starting and ending times
    const [startsAt, setStartsAt] = useState(getCurrentLocalDateTime);
    const [endsAt, setEndsAt] = useState(getCurrentLocalDateTime);

    const [doctor, setDoctor] = useState(null);
    const [room, setRoom] = useState(null);


    // fetch data
    useEffect(() => {
        getDoctors();
        getRooms();
        getClinicSessions();


    }, [])

    useEffect(() => {

        createDoctorDetails();
        createRoomDetails();


    }, [doctors, rooms, clinicSessions])

    // set default endsAt datetim
    useEffect(() => {

        setEndsAt(startsAt);
    }, [startsAt])


    async function getDoctors() {
        try {
            const res = await axios.get("http://localhost:8080/doctors");
            setDoctors(res.data);
            
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

    async function getRooms() {
        try {
            const res = await axios.get("http://localhost:8080/rooms")
            setRooms(res.data);

        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    }

    async function getClinicSessions() {
        try {
            const res = await axios.get("http://localhost:8080/clinicSessions")
            setClinicSessions(res.data);
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }
    function createDoctorDetails() {
        if (doctors == null) { return; }
        let tDoctorDetails = [];

        // step 1 : access each doctor
        
       
        l1: for (let i = 0; i < doctors.length; i++) {

            let tDoctorDetail = {
                "doctor": null,
                "timeSlots": null
            }
            const doctor = doctors[i];
            tDoctorDetail.doctor = doctor;

            let timeSlots = [];
          
            if (clinicSessions != null) {
               

                //step 2:  find clinic sessions of the doctor
                for (let j = 0; j < clinicSessions.length; j++) {
                    const clinicSession = clinicSessions[j];

                    // step 3 : if found push the timeSlot to timeSlots
                    if (doctor._id == clinicSession.doctorId) {
                        let timeSlot = `from ${clinicSession.startsAt} to ${clinicSession.endsAt}`
                        timeSlots.push(timeSlot);
                    }
                }
            }

            tDoctorDetail.timeSlots = timeSlots;
            tDoctorDetails.push(tDoctorDetail);
        }

        setDoctorDetails(tDoctorDetails);


    }

    function createRoomDetails() {
        let tRoomDetails = [];

        //step 1: accessing each room
        if (rooms == null) { return; }
        for (let i = 0; i < rooms.length; i++) {
            let tRoomDetail = {
                "room": null,
                "timeSlots": null
            }
            const room = rooms[i];
            tRoomDetail.room = room
            const clinicSessionsOfRoom = room.clinicSessions;//'ClincSession' references in 'Room' 

            let timeSlots = [];

            //step 2: finding clincSession documents from clinicSession references
            for (let j = 0; j < clinicSessionsOfRoom.length; j++) {

                let clinicSessionDoc = null; if (clinicSessions == null) { return; }
                l3: for (let k = 0; k < clinicSessions.length; k++) {

                    if (clinicSessions[k]._id == clinicSessionsOfRoom[j]) {

                        clinicSessionDoc = clinicSessions[k];

                        break l3;
                    }
                }

                // step 3: creating time slot string and adding to timeSlots

                let timeSlot = `from ${clinicSessionDoc.startsAt} to ${clinicSessionDoc.endsAt}`
                timeSlots.push(timeSlot);

            }

            tRoomDetail.timeSlots = timeSlots;
            tRoomDetails.push(tRoomDetail);

        }

        setRoomDetails(tRoomDetails);

    }

    const toggleShowTimeSlots_doctor = (value, id) => {//value : true/false
        setShowTimeSlots_doctor(value);
        setShowTimeSlots_doctorId(id);

    }

    const toggleShowTimeTableSlots_room = (value, id) => {
        setShowTimeSlots_room(value);
        setShowTimeSlots_roomId(id);

    }

    //to handle datetimes
    function handleDateTimeChange_startAt(event) {
        setStartsAt(event.target.value);
    }

    function handleDateTimeChange_endsAt(event) {

        setEndsAt(event.target.value);
    }


    async function createClinicSession() {
        if (doctorId == null || roomId == null) {
            return console.log("please select a doctor and a room");
        }

        const data = {
            "id": null,
            "doctorId": doctorId,
            "startsAt": startsAt,
            "endsAt": endsAt,
            "roomId": roomId
        }
        try {
            const res = await axios.post("http://localhost:8080/clinicSessions", data);
            console.log(res.data);
            
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (<>
        <div className="createClinicSession_manageClinicSessions">
            <h2>Create Clinic Session</h2>
            <div className="doctors_manageClinicSessions">

                <h3>Select Doctor</h3>
                <table className="table table-striped_manageClinicSessions">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact Number</th>
                            <th>WhatsApp</th>
                            <th>Email</th>
                            <th>Specialization</th>
                            <th>Educational Abbreviation</th>
                            <th>General Slot Duration</th>
                            <th>current clinic session time slots </th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctorDetails && doctorDetails.map((detail, index) => (
                            <tr key={detail.doctor._id}>
                                <td>{detail.doctor.name}</td>
                                <td>{detail.doctor.contactNumber}</td>
                                <td>{detail.doctor.whatsapp}</td>
                                <td>{detail.doctor.email}</td>
                                <td>{detail.doctor.specialization}</td>
                                <td>{detail.doctor.educationAbbrivation}</td>
                                <td>{detail.doctor.generalSlotDuration}</td>
                                <td>{(showTimeSlots_doctor && detail.doctor._id == showTimeSlots_doctorId) ? (
                                    <ul>{
                                        detail.timeSlots && detail.timeSlots.map(timeSlot => (
                                            <div key={timeSlot}><li>{timeSlot}</li></div>
                                        ))
                                    }<button onClick={() => toggleShowTimeSlots_doctor(false)}>minimize</button>
                                    </ul>) :
                                    (<button onClick={() => toggleShowTimeSlots_doctor(true, detail.doctor._id)}>show time slots</button>)}
                                </td>
                                <td><button className="btn btn-primary" onClick={() => {
                                    setDoctorId(detail.doctor._id);
                                    setDoctor(doctors[index]);
                                }}>select</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="rooms_manageClinicSessions">

                <h3>Select room</h3>
                <table className="table table-striped_manageClinicSessions">
                    <thead>
                        <tr>
                            <th>Room Number</th>
                            <th>current clinic session time slots</th>
                        </tr>
                    </thead>
                    <tbody>{roomDetails && roomDetails.map((detail, index) => (
                        <tr key={detail.room._id}>
                            <td>{detail.room.roomNumber}</td>
                            <td>{(showTimeSlots_room && showTimeSlots_roomId == detail.room._id) ? (
                                <ul>{detail.timeSlots && detail.timeSlots.map(timeSlot => (
                                    <div key={timeSlot}><li>{timeSlot}</li></div>
                                ))}
                                    <button onClick={() => toggleShowTimeTableSlots_room(false)}>minimize</button></ul>

                            ) : (<button onClick={() => toggleShowTimeTableSlots_room(true, detail.room._id)}>show time slots</button>)}</td>
                            <td><button className="btn btn-primary" onClick={() => {
                                setRoomId(detail.room._id);
                                setRoom(rooms[index]);
                            }}>select</button></td>
                        </tr>
                    ))}</tbody>
                </table>
            </div>


            <div className="submitCreateRequest_manageClinicSessions">
                <label htmlFor="doctor"> Doctor :
                    <span style={{ color: doctorId == null ? 'red' : 'inherit' }}>
                        {doctorId == null ? "not selected yet" : `name : ${doctor.name} , Specialization : ${doctor.specialization}`}
                    </span>
                </label>
                <br>
                </br>
                <label htmlFor='room'>Room :
                    <span style={{ color: roomId == null ? 'red' : 'inherit' }}>
                        {roomId == null ? "not selected yet" : `room Number : ${room.roomNumber}`}
                    </span>
                </label>
                <br></br>
                <div className="selectStartTime_manageClinicSessions" >
                    <label htmlFor="startsAt">{'select start time : '} </label>
                    <input
                        id="startsAt"
                        type="datetime-local"
                        aria-label="Date and time"
                        value={startsAt}
                        min={startsAt}
                        onChange={handleDateTimeChange_startAt} />

                </div>
                <div className="selectEndTime_manageClinicSessions">
                    <label htmlFor="endsAt">{'select end time : '} </label>
                    <input
                        id="endsAt"
                        type="datetime-local"
                        aria-label="Date and time"
                        value={endsAt}
                        min={endsAt}
                        onChange={handleDateTimeChange_endsAt} />
                </div>
                <br></br>
                <button onClick={createClinicSession}>Create Clinic Session</button>
            </div>
        </div>


    </>)
}
export default CreateClinicSessions;