const ClinicSessionDetail = require("../models/ClinicSessionDetail");
const Doctor = require("../models/Doctor");

const addClinicSessionDetail = async (req, res) => {
    const requestedClinicSessionDetail = req.body;
    try {
        const doctorId=requestedClinicSessionDetail.doctorId;
        const doctor=await Doctor.findById(doctorId);
        if(!doctor){
            return res.status(404).send("doctor not found");
        }
        const clinicSessionDetail=new ClinicSessionDetail(requestedClinicSessionDetail);
        await clinicSessionDetail.save();
        res.status(201).send(clinicSessionDetail);
    } catch (error) {
        res.status(400).send(error);
     }
}

module.exports={
    addClinicSessionDetail
}