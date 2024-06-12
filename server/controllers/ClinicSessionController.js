const ClinicSession = require("../models/ClinicSession");

const addClinicSession=async(req,res)=>{
    const reqClinicSession=req.body;
    try{
        const clinicSession=new ClinicSession(reqClinicSession);
        await clinicSession.save(clinicSession)
        return res.status(201).send()
    }catch(error){
        return res.status(400).send(error);
    }
}

module.exports={
    addClinicSession
}