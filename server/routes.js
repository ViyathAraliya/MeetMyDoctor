const express=require('express');
const { addDoctor } = require('./controllers/DoctorController');
const { addClinicSessionDetail } = require('./controllers/ClinicSessionDetailController');
const { addRoom } = require('./controllers/RoomController');
const ClinicSession = require('./models/ClinicSession');
const { addClinicSession } = require('./controllers/ClinicSessionController');
const router=express.Router();

router.post('/doctors', addDoctor);
router.post('/clinicSessionDetails', addClinicSessionDetail);

router.post('/rooms',addRoom);
router.post('/clinicSessions',addClinicSession);


module.exports=router;