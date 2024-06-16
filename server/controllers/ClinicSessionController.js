const { default: mongoose } = require("mongoose");
const ClinicSessionDto = require("../dtos/ClinicSessionDto");
const ClinicSession = require("../models/ClinicSession");
const Room = require("../models/Room");

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

    try{
        //creating clinic session
        await clinicSession.save();

        //retrieving 'Room' document by 'roomID'
      
       const room= await Room.findById(clinicSessionDto.roomId);
     console.log(room);
        //pushing clinicSession reference to 'clinicSessions' array and saving
        room.clinicSessions.push(room._id);
        await room.save();



      return  res.status(201).send(clinicSession);
    }catch(error){
      console.log(error);
      return  res.status(400).send(error);
    }

}


module.exports = {
    addClinicSession
}