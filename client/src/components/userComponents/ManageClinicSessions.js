import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ManageClinicSessions() {
    const [doctors, setDoctors] = useState(null);
    const [rooms, setRooms] = useState(null);
    const [clinicSessions, setClinicSessions] = useState(null);

    const [doctorDetails, setDoctorDetails] = useState(null);
    const [roomDetails, setRoomDetails] = useState(null);


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
    }}/* name: String,
    contactNumber: { 
        type: String,
        required: true,
        unique: true,
        index: true

    },
    whatsapp: String, 
    email: String,
    specialization: String,
    educationAbbrivation: String,

    generalSlotDuration: Number   */

        function createDoctorDetails() {
           
            let tDoctorDetails = [];

            // step 1 : access each doctor
            for (let i = 0; i < doctors.length; i++) {

                let tDoctorDetail ={
                    "doctor":null,
                    "timeSlots":null
                }
                const doctor = doctors[i];
                tDoctorDetail.doctor=doctor;
                let timeSlots=[];

                //step 2:  find clinic sessions of the doctor
                for (let j = 0; j < clinicSessions.length; j++) {
                    const clinicSession=clinicSessions[j];
                
                    // step 3 : if found push the timeSlot to timeSlots
                    if (doctor._id==clinicSession.doctorId) {
                        let timeSlot=`${clinicSession.startsAt}-${clinicSession.endsAt}`
                        timeSlots.push(timeSlot);
                     }
                }
                
                tDoctorDetail.timeSlots=timeSlots;
                tDoctorDetails.push(tDoctorDetail);
            }
           console.log(tDoctorDetails)
            setDoctorDetails(tDoctorDetails);
        }
    
    return (<>
    
    <div className="doctors">
    <button onClick={createDoctorDetails}>Load</button>
    <table className="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Contact Number</th>
                <th>WhatsApp</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>Educational Abbreviation</th>
                <th>General Slot Duration</th>
            </tr>
        </thead>
        <tbody>
            {doctorDetails && doctorDetails.map(detail => (
                <tr key={detail.doctor._id}>
                    <td>{detail.doctor.name}</td>
                    <td>{detail.doctor.contactNumber}</td>
                    <td>{detail.doctor.whatsapp}</td>
                    <td>{detail.doctor.email}</td>
                    <td>{detail.doctor.specialization}</td>
                    <td>{detail.doctor.educationAbbrivation}</td>
                    <td>{detail.doctor.generalSlotDuration}</td>
                    <td>{detail.timeSlots && detail.timeSlots.map(timeSlot=>(
                        <div key={timeSlot}>{timeSlot}</div>
                    ))}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

      

    </>)
}
export default ManageClinicSessions;