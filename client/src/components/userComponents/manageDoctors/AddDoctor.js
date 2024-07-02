import axios from "axios";
import { useState } from "react"

function AddDoctor() {

    const [name, setName] = useState(null);
    const [contactNumber, setContactNumber] = useState(null);
    const [whatsapp, setWhatsapp] = useState(null);
    const [email, setEmail] = useState(null);
    const [specialization, setSpecialization] = useState(null);
    const [educationAbbrivation, setEducationAbbrivation] = useState(null);
    const [generalSlotDuration, setGeneralSlotDuration] = useState(null);

    async function saveDoctor(){
        try{const data={"name":name,
            "contactNumber": contactNumber,
            "whatsapp":whatsapp,
            "email": email,
            "specialization":specialization,
            "educationAbbrivation":educationAbbrivation,
            "generalSlotDuration": generalSlotDuration
        }
            const res=await axios.post("http://localhost:8080/doctors",data)
            console.log(res);
        }catch(error){
            if(error.response.data.code==11000){
               return  console.log("duplicate entry of contactNumber. Contact number must be unique")
            }
            console.log(error);
        }
    }


    return(<>
    <label htmlFor="name"/>name<label/><input id="name" onChange={(event)=>setName(event.target.value)}/>
    <br></br>
    <label htmlFor="contactNumber">Contact Number:</label>
      <input id="contactNumber" type="text"onChange={(event) => setContactNumber(event.target.value)}/>
      <br></br>
      <label htmlFor="whatsapp">Whatsapp:</label>
      <input id="whatsapp" type="text" onChange={(event) => setWhatsapp(event.target.value)}/>
<br></br>
      <label htmlFor="email">Email:</label>
      <input id="email" type="email" onChange={(event) => setEmail(event.target.value)}/>
      <br></br>
      <label htmlFor="specialization">Specialization:</label>
      <input id="specialization" type="text" onChange={(event) => setSpecialization(event.target.value)}/>
      <br></br>
      <label htmlFor="educationAbbrivation">Education Abbreviation:</label>
      <input id="educationAbbrivation" type="text" onChange={(event) => setEducationAbbrivation(event.target.value)}/>
      <br></br>
      <label htmlFor="generalSlotDuration">General Slot Duration:</label>
      <input id="generalSlotDuration" type="text" onChange={(event) => setGeneralSlotDuration(event.target.value)}/>
    <button onClick={saveDoctor}>Save</button>
    </>);

}


export default AddDoctor;