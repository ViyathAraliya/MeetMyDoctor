const { default: mongoose } = require("mongoose");
const AppointmentDto = require("../dtos/AppointmentDto");
const Appointment = require("../models/Appointment");
const ClinicSession = require("../models/ClinicSession");
const Doctor = require("../models/Doctor");
const AppointmentUpdateDto = require("../dtos/AppointmentUpdateDto");

const addAppointment = async (req, res) => {
  

  const { patientName, contactNo, address, queueNumber, description, clinicSessionId } = req.body;

  const appointmentDto = new AppointmentDto(null, patientName, contactNo, address,
    queueNumber, description, clinicSessionId);

  // step 1: converting 'clinicSessionId' to ObjectId
  const _clinicSessionId = new mongoose.Types.ObjectId(clinicSessionId);

  //step 2: validating properties and creating 'Appointment'
  const appointment = new Appointment({
    patientName: appointmentDto.patientName, contactNo: appointmentDto.contactNo,
    address: appointmentDto.address, clinicSession: _clinicSessionId
  });

  try {

    //step 3: retrieving related 'ClinicSession' doc
    const clinicSession = await ClinicSession.findById(appointment.clinicSession);
    if(clinicSession==null){
      return res.status(404).send("clinic session not found");
    }

    //step 4 : calculating queue number
    let queueNumber;
    if (clinicSession.appointments != null) {
      queueNumber = clinicSession.appointments.length + 1;
    }
    else { queueNumber = 1; }

    appointment.queueNumber = queueNumber;

    //step 5: calculating maximum patients per clinic session by doctor
    const doctorId = clinicSession.doctorId;
    const doctor = await Doctor.findById(doctorId);
    const generalSlotDuration = doctor.generalSlotDuration;
    const diffMilSecs = clinicSession.endsAt - clinicSession.startsAt; //time duration of clinic Session in mili seconds
    const diffInMinutes = diffMilSecs / (1000 * 60);
    const maxPatients = diffInMinutes / generalSlotDuration;


    if (queueNumber > maxPatients) {

      return res.status(409).send("This clinic session has reached it's maximum number of patients ");
    }

    //step 7: saving the 'Appointment' doc in 'appointments' collection
    await appointment.save();
    const savedAppointmentId = appointment._id;

    //step 6: adding 'Appointment' doc reference  to 'appointments' array of the related 'ClinicSession'
    clinicSession.appointments.push(savedAppointmentId);

    // saving 8: saving the clinic session
    await clinicSession.save();


    res.status(201).send(appointment);
  } catch (error) {
    console.log(error);

    res.status(400).send(error);
  }

}


const updateAppointmentStatus = async (req, res) => {

  const { appointmentId, status } = req.body;
  const appointmentUpdateDto = new AppointmentUpdateDto(appointmentId, status);

  try {
    const appointmentId = appointmentUpdateDto.appointmentId;

    //case 1: delete if appointment status is "DISCARD"
    if (appointmentUpdateDto.status == "DISCARD") {
      const appointmentDeleted = await deleteAppointment(appointmentId);
      if (!appointmentDeleted) {
        return res.status(500).send("error in deleting appointment");
      }
      return res.status(200).send("appointment deleted succesfully!");
    }

    //case 2: update 'status' if it's "CONFIRM"
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: appointmentUpdateDto.status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).send('Appontment not found');
    }

    return res.status(200).send("Appintment updated succesfully");




  } catch (error) {
    return res.status(400).send(error);
  }

}



const deleteAppointment = async (appointmentId) => {

  try {
    //step 1: delete the appointment from a 'appointements'
    console.log(appointmentId);
    const appointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!appointment) {
      console.log("appointment not retrived")
      return false;
    }

    //step 2: remove the appointment reference from the 'appointments' list in the relevant 'ClinicSession'
    const clinicSession = await ClinicSession.findOneAndUpdate(
      { appointments: appointmentId },
      { $pull: { appointments: appointmentId } },
      { new: true }
    );

    if (!clinicSession) {
      console.log("clinic session not found");
      return false;
    }

    return true;

  } catch (error) {
    console.log(error);
    return error;
  }

}

const getAppointments=async(req,res)=>{
  try{
    const appointements=await Appointment.find();
    return res.status(200).send(appointements);
  }catch(error){
    return res.status(500).send(error);
  }
}


//To confirm the appointment or discard



module.exports = { addAppointment, updateAppointmentStatus, getAppointments };