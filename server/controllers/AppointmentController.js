const { default: mongoose } = require("mongoose");
const AppointmentDto = require("../dtos/AppointmentDto");
const Appointment = require("../models/Appointment");
const ClinicSession = require("../models/ClinicSession");
const Doctor = require("../models/Doctor");

const addAppointment = async (req, res) => {

  const { patientName, contactNo, address, queueNumber, description, clinicSessionId } = req.body;

  const appointmentDto = new AppointmentDto(null, patientName, contactNo, address,
    queueNumber, description, clinicSessionId);

  // converting 'clinicSessionId' to ObjectId
  const _clinicSessionId = new mongoose.Types.ObjectId(clinicSessionId);

  //validating properties and creating 'Appointment'
  const appointment = new Appointment({
    patientName: appointmentDto.patientName, contactNo: appointmentDto.contactNo,
    address: appointmentDto.address, clinicSession: _clinicSessionId
  });

  try {
    
    //retrieving related 'ClinicSession' (to add 'appointment reference')
    const clinicSession = await ClinicSession.findById(appointment.clinicSession);

    //calculating queue number
    let queueNumber;
    if(clinicSession!=null){
   queueNumber=clinicSession.appointments.length+1;}
    else{queueNumber=1;}

    appointment.queueNumber=queueNumber;

    //calculating maximum patients per clinic session by doctor
    const doctorId=clinicSession.doctorId;
    const doctor=await Doctor.findById(doctorId);
    const generalSlotDuration=doctor.generalSlotDuration;
    const diffMilSecs=clinicSession.endsAt-clinicSession.startsAt; //time duration of clinic Session in mili seconds
    const diffInMinutes=diffMilSecs/(1000*60);
    const maxPatients=diffInMinutes/generalSlotDuration;

    
    if(queueNumber>maxPatients){ 
      
      return res.status(409).send("This clinic session has reached it's maximum number of patients ");
    }


    await appointment.save();
    const savedAppointmentId = appointment._id;




    //adding 'appointment' reference  to 'appointments' array
    clinicSession.appointments.push(savedAppointmentId);
    await clinicSession.save();


    res.status(201).send(appointment);
  } catch (error) {
    console.log(error);

    res.status(400).send(error);
  }

}




module.exports = addAppointment;