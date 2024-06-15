const { default: mongoose } = require("mongoose");
const AppointmentDto = require("../dtos/AppointmentDto");
const Appointment = require("../models/Appointment");
const ClinicSession = require("../models/ClinicSession");

const addAppointment = async (req, res) => {

  const { patientName, contactNo, address, queueNumber, description, clinicSessionId } = req.body;

  const appointmentDto = new AppointmentDto(null,patientName, contactNo, address,
    queueNumber, description, clinicSessionId);

  // converting 'clinicSessionId' to ObjectId

  const _clinicSessionId = new  mongoose.Types.ObjectId(clinicSessionId);

  //validating properties and creating 'Appointment'
  const appointment = new Appointment({
    patientName: appointmentDto.patientName, contactNo: appointmentDto.contactNo,
    address: appointmentDto.address, clinicSession: _clinicSessionId
  });

  try {
    await appointment.save();
    const savedAppointmentId = appointment._id;
   
    
    //retrieving related 'ClinicSession' (to add 'appointment reference')
    const clinicSession= await ClinicSession.findById(appointment.clinicSession);
  

       //adding 'appointment' reference to cliniSession
       clinicSession.appointments.push(savedAppointmentId);
       await clinicSession.save();
  

    res.status(201).send(appointment);
  } catch (error) {
    console.log(error);

    res.status(400).send(error);
  }

}




module.exports = addAppointment;