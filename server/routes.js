const express=require('express');
const { getDoctors, addOrUpdateDoctor, deleteDoctor } = require('./controllers/DoctorController');
const { addRoom, getRooms, deleteRoom} = require('./controllers/RoomController');
const { addClinicSession, getClinicSessions, deleteClinicSession, deleteExpiredDocs } = require('./controllers/ClinicSessionController');
const {addAppointment,  getAppointments, deleteAppointment, confirmAppointment }= require('./controllers/AppointmentController');
const { cleanUpInvalidDependacies } = require('./controllers/CollectionController');
const { login } = require('./controllers/AuthController');
const { verifyJwtToken } = require('./security/security');

const router=express.Router();

//authRoutes
router.post('/auth/login',login);



router.post('/doctors', addOrUpdateDoctor);
router.get('/doctors',getDoctors);
router.delete('/doctor/delete/:id',deleteDoctor);


router.post('/rooms',addRoom);
router.delete('/room/delete/:id',deleteRoom);

router.post('/clinicSessions', addClinicSession);

router.post('/appointments', addAppointment);
router.post('/appointments/deleteAppointment', deleteAppointment);
router.post('/appointments/confirmAppointment', confirmAppointment);
router.get('/clinicSessions',getClinicSessions);
router.delete('/clinicSessionsd/deleteExpiredDocs',deleteExpiredDocs);



router.get('/rooms',getRooms);
router.post('/deleteClinicSession', deleteClinicSession);
router.get('/appointments',getAppointments);
router.delete('/cleanUpInvalidDependencies',cleanUpInvalidDependacies);

//middleware - applies to all routes below this line
router.use(verifyJwtToken);


module.exports=router;