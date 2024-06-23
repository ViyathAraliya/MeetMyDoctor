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
const addClinicSession = async (req, res) => {console.log("here")

  //step 1: creating the 'ClinicSession' object
  const { id, doctorId, startsAt, endsAt, roomId } = req.body;
  const clinicSessionDto = new ClinicSessionDto(id, doctorId, startsAt, endsAt, roomId);

  //step 2: validating times

  if(new Date(startsAt)<=new Date()){
    return res.status(409).send("the time you entered as the startng time has already passed");
  }
  if(startsAt>=endsAt){
    return res.status(409).send("The clinic's ending time must be after its starting time.");
  }
  const clinicSession = new ClinicSession(clinicSessionDto);

  try {
    const doctorID = clinicSession.doctorId;
    const doctor = await Doctor.findById(doctorID);
   
    // step 3: validating that the 'Doctor' document is found
    if(doctor==null){
      return res.status(404).send("doctor not found");
    }
    
    // step 4: retriving all 'ClinicSession' documents which belong to this doctor
      const clinicSessions = await ClinicSession.find({doctorId:doctorID});

    // case 1: If doctor is not registered with any clinic session , saving 'ClinicSession' without validating time slots
     if(clinicSessions.length==0){
      await clinicSession.save();
      return res.status(201).send(clinicSession);
     }
      

     // case 2: doctor already has clinic sessions
     // case 2 2 step 1: Time slot overlapping prevention
      for (let i = 0; i < clinicSessions.length; i++) {
        const retreivedClinicSession = clinicSessions[i];
        const retrivedDoctor = clinicSessions[i].doctorId;

     
        if (retrivedDoctor.equals(doctorID)) {  // if this clinic session belongs to this doctor
          const retreivedStartsAt = retreivedClinicSession.startsAt;// starting tiime of already registered clinic session
          const retreivedEndsAt = retreivedClinicSession.endsAt;// ending time of   ,,   ,, 
          const startsAt = clinicSession.startsAt; //,,    ,,    new    ,, 
          const endsAt = clinicSession.endsAt;// ,,     ,,    new     ,, 

          //ensuring timeSlots dont overlap
          if (!((startsAt <=retreivedStartsAt  &&  endsAt <= retreivedStartsAt) ||
            (startsAt >= retreivedEndsAt && endsAt >= retreivedEndsAt))) {
          return  res.status(409).send(" time slots of the doctor overlaps");
          }
        }
      }

  

    //

    // case 2 step 2: saving the 'CliniSession'
    await clinicSession.save();

    //case 2 step 3: retrivingthe 'Room' document affiliated with this 'ClinicSession'
    const room = await Room.findById(clinicSession.roomId);

    //case 2 step 4: pushing reference of this 'ClinicSession'  to 'clinicSessions' array in 'Room' document and saving
    room.clinicSessions.push(clinicSession._id);
    await room.save();



    return res.status(201).send(clinicSession);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

}

const getClinicSessions=async(req,res)=>{
  const clinicSessions=await ClinicSession.find();
  try{
    return res.status(200).send(clinicSessions);
  }catch(error){
    return res.status(500).send(error);
  }
  
}


module.exports = {
  addClinicSession,getClinicSessions
}