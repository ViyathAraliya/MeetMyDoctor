import axios from "axios";
import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';


function Appointments_customer() {
    const [clinicSessions, setClinicSessions] = useState(null);
    const [doctors, setDoctors]=useState(null);
    const [clinicSessionDetails,setClinicSessionDetails]=useState([]);
    const [rooms,setRooms]=useState([]);
    
    useEffect(() => {
        getClinicSessions();
        getDoctors();
        getRooms();
    },[])

    

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

    function getRooms(){
        axios.get("http://localhost:8080/rooms")
        .then(function(response){
            setRooms(response.data)
        }).catch(function(error){
            console.log(error)
        })
    }
    // function 3: create 'clinicDetails' array 
    function createClinicDetails(){  
        const details=[];

        // step 1 : access elements in 'clinicSessions'
        for(let i=0;i<clinicSessions.length;i++){
            const doctorId_CS=clinicSessions[i].doctorId;

            // step 2 : access elements in 'doctors'
          l2:  for(let j=0;j<doctors.length;j++){
                const doctorId_D=doctors[j]._id;
                
                // step 3 : compare ids if match found create element  using the name of the doctor along with other noteworthy attributes
                if(doctorId_CS==doctorId_D){

                    // step 4 : find roomNumber 
                    let roomNumber=null;
                   l3:  for(let k=0;k<rooms.length;k++ ){
                 
                        if(clinicSessions[i].roomId==rooms[k]._id){
                            roomNumber=rooms[k].roomNumber;
                            break l3;
                        }
                   }
                   //step 5: ensure only unfinished clinic sessions are shown
                   const endsAt=clinicSessions[i].endsAt;
                   if(new Date(endsAt)<=new Date()){
                   break l2;
                   }


                   // step 6 : create clinic session detail
                    const newDetail={"clinicSessionId":clinicSessions[i]._id,
                        "name":doctors[j].name,"specialization": doctors[j].specialization,
                        "education":doctors[j].educationAbbrivation,"startsAt":clinicSessions[i].startsAt,
                        "endsAt": endsAt,"roomId":roomNumber
                    }
                   details.push(newDetail);
                
                    break l2;
                }
            }
        }
        setClinicSessionDetails(details);

    }
    
  

    return (
        <>
            <div className="clinicSessionTable">

                <h2>Clinic Sessions</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>doctorID</th>
                            <th>doctor name</th>
                            <th>starts at</th>
                            <th>ends at</th>
                            <th>room id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clinicSessions && clinicSessions.map(clinicSession => (
                            <tr key={clinicSession._id}><td>
                                {clinicSession._id}</td>
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
                <div className="clinic_details">      <button onClick={createClinicDetails}>clinic Session details</button>
                 <table className="table table-striped">
                    <thead>
                        
                            <tr>
                                
                <th>name</th>
                <th>specialization</th>
                <th>edcuation</th>
                <th>clinic starts At</th>
                <th>ends At</th>
                <th>room number</th>
                                
                            </tr>
                        
                    </thead>
                    <tbody>
                        {clinicSessionDetails && clinicSessionDetails.map(detail=>(
                            <tr key={detail.clinicSessionId}>
                                <td>{detail.name}</td>
                                <td>{detail.specialization}</td>
                                <td>{detail.education}</td>
                                <td>{detail.startsAt}</td>
                                <td>{detail.endsAt}</td>
                                <td>{detail.roomId}</td>
                            </tr>
                        
                            
                        ))}
                    </tbody>

                 </table>
                </div>
               
                
            </div>
        </>
    )
}

export default Appointments_customer;