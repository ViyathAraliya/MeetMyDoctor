import axios from "axios";
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import "../../../styles/manageDoctors.css"

function ManageDoctors() {

    const [name, setName] = useState(null);
    const [contactNumber, setContactNumber] = useState(null);
    const [whatsapp, setWhatsapp] = useState(null);
    const [email, setEmail] = useState(null);
    const [specialization, setSpecialization] = useState(null);
    const [educationAbbrivation, setEducationAbbrivation] = useState(null);
    const [generalSlotDuration, setGeneralSlotDuration] = useState(null);
    const [doctors, setDoctors] = useState(null);
    const [doctorEditState, setDoctorEditState] = useState(false);


    //edit info
    const [name_edit, setName_edit] = useState(null);
    const [contactNumber_edit, setContactNumber_edit] = useState(null);
    const [whatsapp_edit, setWhatsapp_edit] = useState(null);
    const [email_edit, setEmail_edit] = useState(null);
    const [specialization_edit, setSpecialization_edit] = useState(null);
    const [educationAbbrivation_edit, setEducationAbbrivation_edit] = useState(null);
    const [generalSlotDuration_edit, setGeneralSlotDuration_edit] = useState(null);
  


    useEffect(() => {
        getDoctors();
    }, [])

    async function getDoctors() {
        try {
            const res = await axios.get("http://localhost:8080/doctors");
            setDoctors(res.data);
            console.log(res);
        } catch (error) {
            toast.error("An error occured while fetching doctors. Check console for more details");
            console.log(error);
        }
    }

    async function saveDoctor() {
        try {
            const data = {
                "name": name,
                "contactNumber": contactNumber,
                "whatsapp": whatsapp,
                "email": email,
                "specialization": specialization,
                "educationAbbrivation": educationAbbrivation,
                "generalSlotDuration": generalSlotDuration
            }
            const res = await axios.post("http://localhost:8080/doctors", data)
            toast.success("doctor succesfully saved");
            console.log(res);
            getDoctors();
        } catch (error) {
            toast.error("An error occured while trying to save the doctor. Check console for more details");
            console.log(error);
        }
    }

    async function toggleDoctorEditState(doctor) {
        setName_edit(doctor.name);
        setContactNumber_edit(doctor.contactNumber);
        setWhatsapp_edit(doctor.whatsapp);
        setEmail_edit(doctor.email);
        setSpecialization_edit(doctor.specialization);
        setEducationAbbrivation_edit(doctor.educationAbbrivation);
        setGeneralSlotDuration_edit(doctor.generalSlotDuration);
        setDoctorEditState(!doctorEditState);
        console.log(doctor)
        console.log(doctorEditState);
    }
    async function updateDoctor(doctorId) {
        try {
            const data = {
                "id": doctorId,
                "name": name_edit,
                "contactNumber": contactNumber_edit,
                "whatsapp": whatsapp_edit,
                "email": email_edit,
                "specialization": specialization_edit,
                "educationAbbrivation": educationAbbrivation_edit,
                "generalSlotDuration": generalSlotDuration_edit
            }
            console.log(data);
            const res = await axios.post("http://localhost:8080/doctors", data)
            toast.success("doctor details succesfully updated");
            console.log(res);
            setDoctorEditState(false);
        } catch (error) {
            toast.error("An error occcured while trying to update doctor. Check console for more details");
            console.log(error);
            setDoctorEditState(true);
        }
        finally{getDoctors()}
    }

    async function deleteDoctor(_id){
        try{
            const res=await axios.delete(`http://localhost:8080/doctor/delete/${_id}`)
            toast.success("doctor succesfully deleted");
            console.log(res);
            getDoctors();
        }catch(error){
            toast.error("An error occured while trying to delete doctor. Check console for more details")
            console.log(error);
        }
    }

    return (<>
    <div className="doctor_container">
        <div className="addNewDoctor">
            <label htmlFor="name" />name<label /><input id="name" onChange={(event) => setName(event.target.value)} />
            <br></br>
            <label htmlFor="contactNumber">Contact Number:</label>
            <input id="contactNumber" type="text" onChange={(event) => setContactNumber(event.target.value)} />
            <br></br>
            <label htmlFor="whatsapp">Whatsapp:</label>
            <input id="whatsapp" type="text" onChange={(event) => setWhatsapp(event.target.value)} />
            <br></br>
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" onChange={(event) => setEmail(event.target.value)} />
            <br></br>
            <label htmlFor="specialization">Specialization:</label>
            <input id="specialization" type="text" onChange={(event) => setSpecialization(event.target.value)} />
            <br></br>
            <label htmlFor="educationAbbrivation">Education Abbreviation:</label>
            <input id="educationAbbrivation" type="text" onChange={(event) => setEducationAbbrivation(event.target.value)} />
            <br></br>
            <label htmlFor="generalSlotDuration">General Slot Duration:</label>
            <input id="generalSlotDuration" type="text" onChange={(event) => setGeneralSlotDuration(event.target.value)} />
            <button onClick={saveDoctor}>Save</button>

        </div>
        <div className="doctorTable">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact number</th>
                        <th>whatsapp</th>
                        <th>email</th>
                        <th>specialization</th>
                        <th>education abbrivation</th>
                        <th>general slot duration</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors && doctors.map(doctor => {
                        return doctorEditState ? (<tr key={doctor._id}>
                            <td><input placeholder={doctor.name} onChange={(event) => setName_edit(event.target.value)} readOnly={false} /></td>
                            <td><input placeholder={doctor.contactNumber} onChange={(event) => setContactNumber_edit(event.target.value)} readOnly={false} /></td>
                            <td><input placeholder={doctor.whatsapp} onChange={(event) => setWhatsapp_edit(event.target.value)} readOnly={false}></input></td>
                            <td><input placeholder={doctor.email} onChange={(event) => setEmail_edit(event.target.value)} readOnly={false}></input></td>
                            <td><input placeholder={doctor.specialization} onChange={(event) => setSpecialization(event.target.value)} readOnly={false}></input></td>
                            <td><input placeholder={doctor.educationAbbrivation} onChange={(event) => setEducationAbbrivation(event.target.value)} readOnly={false}></input></td>
                            <td><input placeholder={doctor.generalSlotDuration} onChange={(event) => setEducationAbbrivation(event.target.value)} readOnly={false}></input></td>

                            <td><button onClick={() => updateDoctor(doctor._id)}>update</button>
                            </td>
                            
                        </tr>) : (

                            <tr key={doctor._id}>
                                <td>{doctor.name}</td>
                                <td>{doctor.contactNumber}</td>
                                <td>{doctor.whatsapp}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialization}</td>
                                <td>{doctor.educationAbbrivation}</td>
                                <td>{doctor.generalSlotDuration}</td>
                                <td><button onClick={() => toggleDoctorEditState(doctor)} className="btn btn-primary">edit</button>
                                </td>
                                <td><button onClick={()=>{deleteDoctor(doctor._id)}} className="btn btn-primary">delete</button></td>
                            </tr>

                        )
                    }
                    )

                    }
                </tbody>
            </table>

        </div>
        <div><ToastContainer /></div>
        </div>

    </>);

}


export default ManageDoctors;