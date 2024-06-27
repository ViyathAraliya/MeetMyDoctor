const { default: mongoose, Mongoose } = require("mongoose");
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
  //1. check start time and end time
  //2. check for time slot overlapping for doctor
  //3. check for time slot overlapping for room
  //4. save 'ClinicSession' document in 'clinicSessions'
  //5. add ref of 'ClinicSesison' to 'clinicSessions' array in relevent 'Room' doc and save

  const { id, doctorId, startsAt, endsAt, roomId } = req.body;

  const clinicSessionDto = new ClinicSessionDto(id, doctorId, startsAt, endsAt, roomId);


  // 1. check start time and end time 
  if (new Date(startsAt) < new Date()) {
    return res.status(422).send("clinic starting time should be in the future");
  }
  if (startsAt >= endsAt) {
    return res.status(422).send("clinic ening time should come after the startining time")
  }
  try {
    const doctorIdStr = clinicSessionDto.doctorId;
    const startsAt = new Date(clinicSessionDto.startsAt);
    const endsAt = new Date(clinicSessionDto.endsAt);
    const roomIdStr = clinicSessionDto.roomId;

    // 2. check for time slot overlapping for doctor
    const doctorId = new mongoose.Types.ObjectId(doctorIdStr);

    const clinicSessions = await ClinicSession.find({ doctorId: doctorId });

    if (clinicSessions != null) {
      for (let i = 0; i < clinicSessions.length; i++) {
        const existingStartsAt = clinicSessions[i].startsAt;
        const existingEndsAt = clinicSessions[i].endsAt;


        if (!((startsAt <= new Date(existingStartsAt) && endsAt <= new Date(existingStartsAt)) ||
          (startsAt >= new Date(existingEndsAt) && endsAt >= new Date(existingEndsAt)))) {
          return res.status(409).send("Time slot overlaps for doctor");
        }
      }
    }
   
    // 3. check for time slot overlapping for room
    const roomId = new mongoose.Types.ObjectId(roomIdStr);
    const room = await Room.findById(roomId);
    const clinicSessionsInRoom = room.clinicSessions;

    if (clinicSessionsInRoom != null) {
      for (let i = 0; i < clinicSessionsInRoom.length; i++) {
        const clinicSession_ = await ClinicSession.findById(clinicSessionsInRoom[i]);
        const existingStartsAt = clinicSession_.startsAt;
        const existingEndsAt = clinicSession_.endsAt;

        if (!(((startsAt <= existingStartsAt && endsAt <= existingStartsAt)) ||
          (startsAt >= existingEndsAt && endsAt >= existingEndsAt))) {
          return res.status(409).send("Time slot overlaps for room");
        }
      }
    }

    //4. save 'ClinicSession' document in 'clinicsession' collection
    const clinicSession = new ClinicSession();
    clinicSession.doctorId = doctorId;
    clinicSession.startsAt = startsAt;
    clinicSession.endsAt = endsAt;
    clinicSession.roomId = roomId;

    const savedClinicSession = await clinicSession.save();

    //5. Add 'ClinicSession' document ref to 'clinicSessions' array in related 'Room' document  
    const clinicSessionId = savedClinicSession._id;
    clinicSessionsInRoom.push(clinicSessionId);
    await room.save();
    return res.status(201).send("added new clinic session succesfully");

  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
}

const getClinicSessions = async (req, res) => {

  try {
    const clinicSessions = await ClinicSession.find();
    return res.status(200).send(clinicSessions);
  } catch (error) {
    return res.status(500).send(error);
  }

}

const deleteClinicSession = async (req, res) => {
  const { id } = req.body;
  const deleteClinicSessionDto = new ClinicSessionDto(id);
  try {
    const idStr = deleteClinicSessionDto.id;
   console.log(idStr)
   const id = new mongoose.Types.ObjectId(idStr);
   console.log(id)
    const clinicSession =await ClinicSession.findById(id);
  
    const roomId = clinicSession.roomId;

  console.log(roomId);


    //step 1: delete 'ClinicSession' from 'clinicsessions'
    const deletedClinicSession = await ClinicSession.findByIdAndDelete(id);
    if (!deletedClinicSession) {
      return res.status(500).send("error occured while trying to delete clinic session");
    }

    //step 2: delete 'ClincSession' from 'Room'
    const room = await Room.findById(roomId); 
    const clinicSessions = room.clinicSessions;
    let updatedClinicSessions=[];
    for(let i=0;i<clinicSessions.length;i++){
      if(!(clinicSessions[i].equals(id))){
        updatedClinicSessions.push(clinicSessions[i]);
      }
    }

    room.clinicSessions = updatedClinicSessions;
    await room.save();
    return res.status(200).send("clinic session succesfully deteted");

  } catch (error) {
    console.log(error);
  }

}


module.exports = {
  addClinicSession, getClinicSessions, deleteClinicSession
}