import axios from "axios";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";


function ManageClinicSessions() {
    const [doctors, setDoctors] = useState(null);
    const [rooms, setRooms] = useState(null);
    const [clinicSessions, setClinicSessions] = useState(null);

    //only difference between doctor and doctorDetail is timeSlots mapped to doctor
    const [doctorDetails, setDoctorDetails] = useState(null);

    //only difference between room and roomDetails is timeSlots mapped to room
    const [roomDetails, setRoomDetails] = useState(null);

    //DateTime 
    const [minDateTime, setMinDateTime] = useState(getCurrentDateTime());

    // to toggle visibility of time slots in doctor detail table
    const [showTimeSlots_doctor, setShowTimeSlots_doctor] = useState(false);
    const [showTimeSlots_doctorId, setShowTimeSlots_doctorId] = useState(null);

    // to toggle visibility of time slots in room detail table
    const [showTimeSlots_room, setShowTimeSlots_room] = useState(false);
    const [showTimeSlots_roomId, setShowTimeSlots_roomId] = useState(null);


    function getCurrentDateTime() {
        const now = new Date();
        return now.toISOString().slice(0, 16);
    }

    function handleDateTimeChange(event) {
        setMinDateTime(event.target.value);
    }

    useEffect(() => {
        getDoctors();
        getRooms();
        getClinicSessions();

    }, [])


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

        let tDoctorDetails = [];

        // step 1 : access each doctor
        for (let i = 0; i < doctors.length; i++) {

            let tDoctorDetail = {
                "doctor": null,
                "timeSlots": null
            }
            const doctor = doctors[i];
            tDoctorDetail.doctor = doctor;
            let timeSlots = [];

            //step 2:  find clinic sessions of the doctor
            for (let j = 0; j < clinicSessions.length; j++) {
                const clinicSession = clinicSessions[j];

                // step 3 : if found push the timeSlot to timeSlots
                if (doctor._id == clinicSession.doctorId) {
                    let timeSlot = `from ${clinicSession.startsAt} to ${clinicSession.endsAt}`
                    timeSlots.push(timeSlot);
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

                let clinicSessionDoc = null;
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

    const toggleShowTimeTableSlots_room=(value,id)=>{
        setShowTimeSlots_room(value);
        setShowTimeSlots_roomId(id);
        console.log(value,id)
    }

    return (<>
        <div className="createClinicSession_manageClinicSessions">
            <h2>Create Clinic Session</h2>
            <div className="doctors_manageClinicSessions">
                <button onClick={createDoctorDetails}>Load</button>
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
                        {doctorDetails && doctorDetails.map(detail => (
                            <tr key={detail.doctor._id}>
                                <td>{detail.doctor._id}</td>
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
                                <td><button className="btn btn-primary">select</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="rooms_manageClinicSessions">
                <button onClick={createRoomDetails}>Load</button>
                <h3>Select room</h3>
                <table className="table table-striped_manageClinicSessions">
                    <thead>
                        <tr>
                            <th>Room Number</th>
                            <th>current clinic session time slots</th>
                        </tr>
                    </thead>
                    <tbody>{roomDetails && roomDetails.map(detail => (
                        <tr key={detail.room._id}>
                            <td>{detail.room.roomNumber}</td>
                            <td>{(showTimeSlots_room && showTimeSlots_roomId == detail.room._id) ? (
                                <ul>{detail.timeSlots && detail.timeSlots.map(timeSlot => (
                                    <div key={timeSlot}><li>{timeSlot}</li></div>
                                ))}
                                <button onClick={()=>toggleShowTimeTableSlots_room(false)}>minimize</button></ul>
                                
                            ) : (<button onClick={()=>toggleShowTimeTableSlots_room(true,detail.room._id)}>show time slots</button>)}</td>
                            <td><button className="btn btn-primary">select</button></td>
                        </tr>
                    ))}</tbody>
                </table>
            </div>

            <div className="selectDateTime_manageClinicSessions" >
                <label htmlFor="datetime">select time: </label>
                <input
                    id="datetime"
                    type="datetime-local"
                    aria-label="Date and time"
                    value={minDateTime}
                    min={minDateTime}
                    onChange={handleDateTimeChange} />

            </div>


        </div>


    </>)
}
export default ManageClinicSessions;