import axios from "axios";
import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


function MakeAppointment() {
    // fetched data
    const [clinicSessions, setClinicSessions] = useState(null);
    const [doctors, setDoctors]=useState(null);
    const [rooms,setRooms]=useState([]);

    // Created data
    const [clinicSessionDetails,setClinicSessionDetails]=useState([]);
    const [selectedClinicSession, setSelectedClinicSession]=useState(null);


    // customer data
    
const[patientName,setPatientName]=useState(null);
const[contactNo,setContactNo]=useState(null);
const[address,setAddress]=useState(null);
const[description,setDescription]=useState(null);


    useEffect(()=>{
        getClinicSessions();
        getDoctors();
        getRooms();
    },[])
    
   
useEffect(()=>{
  if(clinicSessions!==null && doctors!==null && rooms!==null)
    createClinicDetails();
},[clinicSessions,doctors,rooms]);

// fetching 'ClinicSession' documents
  async function getClinicSessions() {
    try{
      const res=await  axios.get("http://localhost:8080/clinicSessions");
      setClinicSessions(res.data);

    }
      catch(error){
        console.log(error);
      }
     
    }

    // fetching 'Doctors' documents
   async function getDoctors(){

        try{const res=await axios.get("http://localhost:8080/doctors");
            setDoctors(res.data);
        }
        catch(error){
            console.log(error);
        }
      
    }

 //fetching 'Room' documents
  async  function getRooms(){
       try{
        const res=await axios.get("http://localhost:8080/rooms");
        setRooms(res.data);

       } 
       catch(error){
        console.log(error);
       }
    }
// function 3: create 'clinicDetails' array to display info in a table to be read by customer/patient
function createClinicDetails(){  
        const details=[];

        // step 1 : access elements in 'clinicSessions'
        for(let i=0;i<clinicSessions.length;i++){
            const doctorId_CS=clinicSessions[i].doctorId;

        // step 2 : access elements in 'doctors'
          l2:  for(let j=0;j<doctors.length;j++){
                const doctorId_D=doctors[j]._id;
                
                // step 3 : compare ids, if match found create element  using the name of the doctor along with other noteworthy attributes
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
    
 
function handlePatientName(event){
    setPatientName(event.target.value);
}

function handleContactNo(event){
    setContactNo(event.target.value);
}

function handleAddress(event){
    setAddress(event.target.value);
}



function handleDescription(event){
    setDescription(event.target.value);
}

 // make appoinetment

 async function makeAppointment(rowId){
    setSelectedClinicSession(rowId);
    
    const data={"patientName":patientName,"contactNo":contactNo,"address": address,
        "description": description, "clinicSessionId": selectedClinicSession
    }
    try{
    const res=await axios.post("http://localhost:8080/appointments",data);
console.log(res)}
catch(error){console.log(error);}

}





    return (
        <>
            
            <form >
                <label htmlFor="name">Customer/Patient Name</label>
                <input id="name" onChange={handlePatientName}/>
                <br/>
                <label htmlFor="contactNo">Contact Number</label>
                <input id="contactNo" onChange={handleContactNo}/>
                <br/>
                <label htmlFor="address">Address</label>
                <input id="address" onChange={handleAddress}/>
                <br/>
                <label htmlFor="description">Description</label>
                <input id="description" onChange={handleDescription}/>
                <br/>
               
            </form>

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
                        {clinicSessionDetails && clinicSessionDetails.map(detail=>(
                            <tr key={detail.clinicSessionId}
                          
                          >
                                <td>{detail.name}</td>
                                <td>{detail.specialization}</td>
                                <td>{detail.education}</td>
                                <td>{detail.startsAt}</td>
                                <td>{detail.endsAt}</td>
                                <td>{detail.roomId}</td>
                               <td> <button className="btn btn-primary"
                                onClick={()=>{makeAppointment(detail.clinicSessionId)}}>Make an Appointment</button></td>
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

export default MakeAppointment;