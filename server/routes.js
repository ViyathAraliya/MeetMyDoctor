const express=require('express');
const { addDoctor } = require('./controllers/DoctorController');
const { addRoom, addClinicSessionToRoom } = require('./controllers/RoomController');
const { addClinicSession } = require('./controllers/ClinicSessionController');
const addAppointment = require('./controllers/AppointmentController');

const router=express.Router();

router.post('/doctors', addDoctor);


router.post('/rooms',addRoom);
router.post('/clinicSessions', addClinicSession);

router.post('/appointments', addAppointment);



module.exports=router;