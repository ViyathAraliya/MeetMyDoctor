const DoctorDto = require('../dtos/DoctorDto');
const Doctor = require('../models/Doctor');
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */


const addDoctor = async (req, res) => {

    const { name, contactNumber, whatsapp, email,
        specialization, educationAbbrivation, generalSlotDuration } = req.body;

    const doctorDto = new DoctorDto(name, contactNumber, whatsapp, email,
        specialization, educationAbbrivation, generalSlotDuration);

    const doctor = new Doctor({
        name: doctorDto.name, contactNumber: doctorDto.contactNumber,
        whatsapp: doctorDto.whatsapp, email: doctorDto.email, specialization: doctorDto.specialization,
        educationAbbrivation: doctorDto.educationAbbrivation, generalSlotDuration: doctorDto.generalSlotDuration
    })
    try {
        await doctor.save();
        res.status(201).send(doctor);

    } catch (error) {
        console.log(error)
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



module.exports = {
    addDoctor,getDoctors
}