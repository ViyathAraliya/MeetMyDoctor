const AppointmentDto = require("../dtos/AppointmentDto");
const Appointment = require("../models/Appointment");

const addAppointment=async(req, res)=>{
  const  {patientName, contactNo, address, doctorId, queueNumber, description, clinicSession}=req.body;

  const appointmentDto= new AppointmentDto(patientName, contactNo, address, doctorId, queueNumber, description, clinicSession);
  
  //validating properties and creating 'Appointment'
  const appointment=new Appointment({patientName: appointmentDto.patientName, contactNo: appointmentDto.contactNo,
    address: appointmentDto.address, doctorId:appointmentDto
  });
  try{
    await appointment.save();
    res.status(201).send(appointment);
  }catch(error){
    res.status(400).send(error);
  }
  

}

module.exports=addAppointment;