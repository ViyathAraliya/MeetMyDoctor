const express=require('express');
const { addDoctor } = require('./controllers/DoctorController');
const { addRoom } = require('./controllers/RoomController');
const { addClinicSession } = require('./controllers/ClinicSessionController');

const router=express.Router();

router.post('/doctors', addDoctor);


router.post('/rooms',addRoom);
router.post('/clinicSessions', addClinicSession);
router.get('clinicSessions/ : roomDd', addClinicSession);



module.exports=router;