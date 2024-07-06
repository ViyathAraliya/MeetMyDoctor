const { default: mongoose, Mongoose } = require("mongoose");
const ClinicSessionDto = require("../dtos/ClinicSessionDto");
const ClinicSession = require("../models/ClinicSession");
const Room = require("../models/Room");

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const addClinicSession = async (req, res) => {
  const session = await mongoose.startSession();
  let response = null;
  let succes = false;

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
    await session.startTransaction();
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
    response = await room.save();
    succes = true



  } catch (error) {
    return res.status(500).send(error);
  }
  finally {
    if (succes) {
      await session.commitTransaction();
      await session.endSession();
      return res.status(201).send(response);
    }
    await session.abortTransaction();
    await session.endSession();

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
  const session = await mongoose.startSession();
  let response = {
    "clinicSession": null,
    "room": null
  };
  let succes = false;

  const { id } = req.body;
  const deleteClinicSessionDto = new ClinicSessionDto(id);
  try {
    await session.startTransaction();
    const idStr = deleteClinicSessionDto.id;

    const id = new mongoose.Types.ObjectId(idStr);

    const clinicSession = await ClinicSession.findById(id);

    const appointments = clinicSession.appointments;
    if (appointments != null && appointments.length > 0) {
      return res.status(409).send("unable to  delete because there appointments"
        + "registered with this clinic Session. If no appointment is confirmed yet discard them and try again");
    }

    const roomId = clinicSession.roomId;


    //step 1: delete 'ClinicSession' from 'clinicsessions'
    response.clinicSession = await ClinicSession.findByIdAndDelete(id,{session:session});
    if (!(response.clinicSession)) {
      return res.status(500).send("error occured while trying to delete clinic session");
    }

    //step 2: delete 'ClincSession' from 'Room'
    const room = await Room.findById(roomId);
    const clinicSessions = room.clinicSessions;
    let updatedClinicSessions = [];
    for (let i = 0; i < clinicSessions.length; i++) {
      if (!(clinicSessions[i].equals(id))) {
        updatedClinicSessions.push(clinicSessions[i]);
      }
    }

    room.clinicSessions = updatedClinicSessions;
    response.room = await room.save({session:session});
    succes = true;


  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
  finally{
    if(succes){
      await session.commitTransaction();
      await session.endSession();
      return res.status(201).send(response);
    }
    await session.abortTransaction();
    await session.endSession();
  }

}


module.exports = {
  addClinicSession, getClinicSessions, deleteClinicSession
}