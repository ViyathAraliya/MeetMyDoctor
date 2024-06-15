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
  
    const { id, doctorId, startsAt, endsAt } = req.body;
    
    const clinicSessionDto = new ClinicSessionDto(id, doctorId, startsAt, endsAt); 

    const clinicSession = new ClinicSession(clinicSessionDto);

    try{
        await clinicSession.save();
      return  res.status(201).send(clinicSession);
    }catch(error){
      return  res.status(400).send(error);
    }

}

const getClinicSession=(appointment)=async (req, res)=>{
    const {clinicSessionId}=req.body;

    //converting Id String to ObjectId
    const _clinicSessionId=new mongoose.Types.ObjectId(clinicSessionId); 
    
    const clinicSession=ClinicSession.findById(_clinicSessionId);

    //adding appointment to clinicSession
    clinicSession.appointments.push(clinicSession);


}

module.exports = {
    addClinicSession
}