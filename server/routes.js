const express=require('express');
const { addDoctor } = require('./controllers/DoctorController');
const { addClinicSessionDetail } = require('./controllers/ClinicSessionDetailController');
const router=express.Router();

router.post('/doctors', addDoctor);
router.post('/clinicSessionDetails', addClinicSessionDetail);



module.exports=router;