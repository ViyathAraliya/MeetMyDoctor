const { default: mongoose } = require("mongoose");
const AppointmentDto = require("../dtos/AppointmentDto");
const Appointment = require("../models/Appointment");

const addAppointment = async (req, res) => {
  console.log(1);
  const { patientName, contactNo, address,  queueNumber, description, clinicSessionId } = req.body;

  const appointmentDto = new AppointmentDto(patientName, contactNo, address, 
    queueNumber, description, clinicSessionId);

  // converting 'clinicSessionId' to ObjectId
 
   const _clinicSessionId = new mongoose.Types.ObjectId(clinicSessionId);

  //validating properties and creating 'Appointment'
  const appointment = new Appointment({
    patientName: appointmentDto.patientName, contactNo: appointmentDto.contactNo,
    address: appointmentDto.address,  clinicSession: _clinicSessionId
  });

  try {
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
   
    res.status(400).send(error);
  }


}

module.exports = addAppointment;