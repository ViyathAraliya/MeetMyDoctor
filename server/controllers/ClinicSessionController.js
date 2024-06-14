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
        res.status(201).send(clinicSession);
    }catch(error){
        res.status(400).send(error);
    }

}

module.exports = {
    addClinicSession
}