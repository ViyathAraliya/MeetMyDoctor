const { default: mongoose } = require("mongoose");
const ClinicSessionDto = require("../dtos/ClinicSessionDto");
const ClinicSession = require("../models/ClinicSession");
const Room = require("../models/Room");
const Doctor = require("../models/Doctor");

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const addClinicSession = async (req, res) => {

  //deserializing the request body
  const { id, doctorId, startsAt, endsAt, roomId } = req.body;

  const clinicSessionDto = new ClinicSessionDto(id, doctorId, startsAt, endsAt, roomId);

  const clinicSession = new ClinicSession(clinicSessionDto);


  try {
    //checking if time slots overlaps
    const doctorID = clinicSession.doctorId;
   
    const doctor = await Doctor.findById(doctorID);
   
   l1: if (doctor != null) {
      const clinicSessions = await ClinicSession.find({doctorId:doctorID});
      console.log(clinicSessions);
      if(clinicSession==null){break l1;

      }
      for (let i = 0; i < clinicSessions.length; i++) {
        const retreivedClinicSession = clinicSessions[i];
        const retrivedDoctor = clinicSessions[i].doctorId;
        if (retrivedDoctor.equals(doctorID)) {  //checking if doctor already has a session registered
          const retreivedStartsAt = retreivedClinicSession.startsAt;
          const retreivedEndsAt = retreivedClinicSession.endsAt;
          const startsAt = clinicSession.startsAt;
          const endsAt = clinicSession.endsAt;

          //ensuring timeSlots dont overlap
          if (!((retreivedStartsAt > startsAt && retreivedEndsAt > endsAt) ||
            (retreivedEndsAt < startsAt && retreivedEndsAt < endsAt))) {
          return  res.status(409).send(" time slots of the doctor overlaps");
          }
        }
      }

    }

    //

    //creating clinic session
    await clinicSession.save();

    //retrieving 'Room' document by 'roomID'
    const room = await Room.findById(clinicSession.roomId);

    //pushing clinicSession reference to 'clinicSessions' array and saving
    room.clinicSessions.push(clinicSession._id);
    await room.save();



    return res.status(201).send(clinicSession);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

}


module.exports = {
  addClinicSession
}