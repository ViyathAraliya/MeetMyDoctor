const express=require('express');
const { addDoctor, getDoctors } = require('./controllers/DoctorController');
const { addRoom, getRooms} = require('./controllers/RoomController');
const { addClinicSession, getClinicSessions, deleteClinicSession, deleteExpiredDocs } = require('./controllers/ClinicSessionController');
const {addAppointment,  getAppointments, deleteAppointment, confirmAppointment }= require('./controllers/AppointmentController');

const router=express.Router();

router.post('/doctors', addDoctor);


router.post('/rooms',addRoom);
router.post('/clinicSessions', addClinicSession);

router.post('/appointments', addAppointment);
router.post('/appointments/deleteAppointment', deleteAppointment);
router.post('/appointments/confirmAppointment', confirmAppointment);
router.get('/clinicSessions',getClinicSessions);
router.delete('/clinicSessionsd/deleteExpiredDocs',deleteExpiredDocs);
router.get('/doctors',getDoctors);
router.get('/rooms',getRooms);
router.post('/deleteClinicSession', deleteClinicSession);
router.get('/appointments',getAppointments);


module.exports=router;