import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewAppointments() {
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
    const [appointmentDetails, setAppointmentDetails] = useState(null);//appointment,  doctorName, roomNumber, clinicStartsAt, clinicEndsAt



    useEffect(() => {
        getAppointments();
        getClinicSessions();
        getDoctors();
        getRooms();
    }, [])

    useEffect(() => {
        if (appointments != null && doctors != null && clinicSessions != null && rooms != null
&& appointments.length!=0 && doctors.length!=0 && clinicSessions.length!=0 && rooms.length!=0
        ) {
            createAppointmentDetails();
        }
    }, [appointments, doctors, clinicSessions, rooms])


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
            console.log("create appintmnet details called");
        try {
            let appointmentDetails = [];

            // step 1 : access each 'Appointment' in 'appointments' by for loop 'l1'
            l1: for (let j = 0; j < appointments.length; j++) {
                let appointmentDetail = {
                    "appointment": null,
                    "doctorName": null,
                    "roomNumber": null,
                    "startsAt": null,
                    "endsAt": null
                };

                const appointment = appointments[j];
                appointmentDetail.appointment = appointment;

                const clinicSessionId = appointment.clinicSession;
                let clinicSession = null;

                // step 2 : find 'ClinicSession' documnent by comparing the clinicSessionId to 'clinicSessionId' in 'clinicSessions' 
                l2: for (let i = 0; i < clinicSessions.length; i++) {
                    if (clinicSessionId == clinicSessions[i]._id) {

                        clinicSession = clinicSessions[i];
                     
                        break l2;
                    }
                }

                //step 3:  find the doctor's name from 'doctors'and assisgn to 'doctorName' property in 'appointmentDetail'
                const doctorId = clinicSession.doctorId;
                l3: for (let i = 0; i < doctors.length; i++) {
                  
                    if (doctorId == doctors[i]._id) {
                        appointmentDetail.doctorName = doctors[i].name;
                    
                        break l3;
                    }
                }

                // step 4 : find the roomNumber from 'rooms' and assign to 'roomNumber' property in 'appointmentDetail' 
                const roomId = clinicSession.roomId; 
                l4: for (let i = 0; i < rooms.length; i++) {
                    if (roomId == rooms[i]._id) {
                        appointmentDetail.roomNumber = rooms[i].roomNumber;
                        break l4;
                    }
                }

                // step 6 : find 'startsAt' from 'clinicSession'  and assigng to 'startsAt'   property in 'appointmentDetail' 
                appointmentDetail.startsAt = clinicSession.startsAt;

                // step 7 : find 'endsAt' from 'clinicSession' and assign to 'endsAt'  property in 'appointmentDetail' 
                appointmentDetail.endsAt = clinicSession.endsAt;

                appointmentDetails.push(appointmentDetail);
            }
            console.log(appointmentDetails)
            setAppointmentDetails(appointmentDetails);
        } catch (error) {
           
            console.log(error)
        }



    }

    //delete if status='DISCARD' , update id status('CONFIRMED')
    async function deleteAppointment(appointmentId) {  console.log(1)
       
        try {
            const data = {
                "appointmentId": appointmentId,
                "status": 'DISCARD'
            }

      
         const  res = await axios.post("http://localhost:8080/appointments/deleteAppointment", data);
         console.log(res);
             getAppointments();
   
        } catch (error) {
          
            const response=error.response;
            if(response!=null){
                return console.log(response.data);
            }
           return  console.log(error);
        }

    }

    const confirmAppointment=async(appointmnetId)=>{
        try{
            const data={
                "appointmentId":appointmnetId,
                "status":"CONFIRMED"
            }
           
            const res=await axios.post("http://localhost:8080/appointments/confirmAppointment", data);
            console.log(res);
            getAppointments();

        }catch(error){
            return console.log(error);
        }

    }



    return (<><h2>Appointments</h2>
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
export default ViewAppointments;