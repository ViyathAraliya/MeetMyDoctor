const express=require('express');
const { addDoctor, getDoctors } = require('./controllers/DoctorController');
const { addRoom, getRooms} = require('./controllers/RoomController');
const { addClinicSession, getClinicSessions, deleteClinicSession } = require('./controllers/ClinicSessionController');
const {addAppointment, updateAppointmentStatus, getAppointments }= require('./controllers/AppointmentController');

const router=express.Router();

router.post('/doctors', addDoctor);


router.post('/rooms',addRoom);
router.post('/clinicSessions', addClinicSession);

router.post('/appointments', addAppointment);
router.post('/appointments/updateStatus', updateAppointmentStatus);
router.get('/clinicSessions',getClinicSessions);
router.get('/doctors',getDoctors);
router.get('/rooms',getRooms);
router.post('/deleteClinicSession', deleteClinicSession);
router.get('/appointments',getAppointments);


module.exports=router;