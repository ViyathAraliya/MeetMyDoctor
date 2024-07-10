const DoctorDto = require('../dtos/DoctorDto');
const ClinicSession = require('../models/ClinicSession');
const Doctor = require('../models/Doctor');
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */

//save or update doctor
const addOrUpdateDoctor = async (req, res) => {
    let update = false;
    const { id, name, contactNumber, whatsapp, email,
        specialization, educationAbbrivation, generalSlotDuration } = req.body;

    const doctorDto = new DoctorDto(id, name, contactNumber, whatsapp, email,
        specialization, educationAbbrivation, generalSlotDuration);
    let doctor = null;
    if (id == null) {
        doctor = new Doctor({
            name: doctorDto.name, contactNumber: doctorDto.contactNumber,
            whatsapp: doctorDto.whatsapp, email: doctorDto.email, specialization: doctorDto.specialization,
            educationAbbrivation: doctorDto.educationAbbrivation, generalSlotDuration: doctorDto.generalSlotDuration
        });
    }
    else {
        update = true;

        doctor = new Doctor({
            _id: id,
            name: doctorDto.name, contactNumber: doctorDto.contactNumber,
            whatsapp: doctorDto.whatsapp, email: doctorDto.email, specialization: doctorDto.specialization,
            educationAbbrivation: doctorDto.educationAbbrivation, generalSlotDuration: doctorDto.generalSlotDuration
        });
    }
    try {
        let doctor_new=null;
        
        if (update) {console.log(update)
           doctor_new = await Doctor.findByIdAndUpdate(doctor._id, {
                name, contactNumber, whatsapp, email,
                specialization, educationAbbrivation, generalSlotDuration
            }, { new: true });
        } else {
           doctor_new= await doctor.save();
        }
        res.status(201).send(doctor_new);

    } catch (error) {
       
        res.status(400).send(error);
    }

}
const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        return res.status(200).send(doctors);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

const deleteDoctor=async (req,res)=>{
    const _id=req.params.id;
    console.log(_id)
    try{
        const doctorHasClinicSessions=await ClinicSession.exists({doctorId:_id});
        if(doctorHasClinicSessions){
            return res.status(409).send("Cant delete becuase doctor is already registered for a clinic session");
        }
        const deletedDoctor=await Doctor.findByIdAndDelete({_id:_id});
        return res.status(200).send("doctor deleted succesfullly");
    }
    catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}



module.exports = {
    getDoctors, addOrUpdateDoctor,deleteDoctor
}