const { default: mongoose } = require("mongoose");
const AppointmentDto = require("../dtos/AppointmentDto");
const Appointment = require("../models/Appointment");
const ClinicSession = require("../models/ClinicSession");
const Doctor = require("../models/Doctor");
const AppointmentUpdateDto = require("../dtos/AppointmentUpdateDto");

const addAppointment = async (req, res) => {
  const session = await mongoose.startSession();
  let response = null;
  let succes = false;

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
    session.startTransaction();
    const contactNumberExists = await Appointment.exists({ contactNo: contactNo });
    if (contactNumberExists) {
      return res.status(409).send("a customer is already registered with the provided contact number");
    }

    //step 3: retrieving related 'ClinicSession' doc
    const clinicSession = await ClinicSession.findById(appointment.clinicSession);
    if (clinicSession == null) {
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

    await appointment.save({ session });

    const savedAppointmentId = appointment._id;

    //step 6: adding 'Appointment' doc reference  to 'appointments' array of the related 'ClinicSession'
    clinicSession.appointments.push(savedAppointmentId);

    // saving 8: saving the clinic session

    await clinicSession.save({ session });
    response = appointment;
    succes = true;

  } catch (error) {
    return res.status(500).send(error);
  }
  finally {
    if (succes) {
      await session.commitTransaction();
      return res.status(201).send(response);
    }
   
    await session.abortTransaction();
    await session.endSession();


  }

}

const deleteAppointment = async (req, res) => {
  const session = await mongoose.startSession();
  const { appointmentId, status } = req.body;
  const appointmentUpdateDto = new AppointmentUpdateDto(appointmentId, status);

  let success = false;
  let reachedEndFail=false;

  try {
    session.startTransaction();
    const appointmentId = appointmentUpdateDto.appointmentId;
   

    //step 1: delete appointment from appointments collection
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId, { session: session });

    if (!deletedAppointment) {
      return res.status(500).send("An error occured while deleting the appointment");
    }

    //step 2 : delete appointment from related clinicSession
    const clinicSession = await ClinicSession.findOneAndUpdate(
      { appointments: appointmentId },
      { $pull: { appointments: appointmentId } },
      { new: true, session: session }
    );


    if (!clinicSession) {
      return res.status(500).send("An error occured while deleting appointment from clinicSession ");
    }

    success = true;
    if(success==false){
      reachedEndFail=true;
    }


  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  } finally {
    if (success) {
      await session.commitTransaction();
      return res.status(204).send("succusfully deleted");
    } else {
      
      await session.abortTransaction();
    }
if(reachedEndFail){
  return res.status(500).send("checking roll back")
}
    session.endSession();
  }

}

const confirmAppointment=async(req,res)=>{
 
  const{appointmentId,status}=req.body;
  const appointementUpdateDto=new AppointmentUpdateDto(appointmentId,status);

  try{
    
    const status=appointementUpdateDto.status;

    const appointment=await Appointment.findById(appointementUpdateDto.appointmentId);
    appointment.status=status;
    const appointementSaved=await appointment.save();
    if(appointementSaved.status!=status){
      return res.status(500).send("couln't save appointment");
    }
    return res.status(204).send("Appointment status updated succesfully!")

  }catch(error){
    return res.status(500).send("internal server errior");
  }


}


const getAppointments = async (req, res) => {
  try {
    const appointements = await Appointment.find();
    return res.status(200).send(appointements);
  } catch (error) {
    return res.status(500).send(error);
  }
}


//To confirm the appointment or discard



module.exports = { addAppointment, deleteAppointment, getAppointments ,confirmAppointment}