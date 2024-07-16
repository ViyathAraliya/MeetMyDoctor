const express=require('express');
const { getDoctors, addOrUpdateDoctor, deleteDoctor } = require('./controllers/DoctorController');
const { addRoom, getRooms, deleteRoom} = require('./controllers/RoomController');
const { addClinicSession, getClinicSessions, deleteClinicSession, deleteExpiredDocs } = require('./controllers/ClinicSessionController');
const {addAppointment,  getAppointments, deleteAppointment, confirmAppointment }= require('./controllers/AppointmentController');
const { cleanUpInvalidDependacies } = require('./controllers/CollectionController');
const { login } = require('./controllers/AuthController');
const { verifyJwtToken } = require('./security/security');
const { createUser, getUsers } = require('./controllers/UserController');

const router=express.Router();

//authRoutes
router.post('/auth/login',login);
router.get('/doctors',getDoctors);
router.get('/clinicSessions',getClinicSessions);
router.get('/rooms',getRooms);
router.get('/appointments',getAppointments);
router.delete('/cleanUpInvalidDependencies',cleanUpInvalidDependacies);


router.post('/users',createUser);
router.get('/users',getUsers)

//middleware - applies to all routes below this line
router.use(verifyJwtToken);

router.post('/doctors', addOrUpdateDoctor);
router.delete('/doctor/delete/:id',deleteDoctor);
router.delete('/room/delete/:id',deleteRoom);
router.post('/clinicSessions', addClinicSession);
router.post('/rooms',addRoom);
router.post('/deleteClinicSession', deleteClinicSession);
router.post('/appointments', addAppointment);
router.post('/appointments/deleteAppointment', deleteAppointment);
router.post('/appointments/confirmAppointment', confirmAppointment);
router.delete('/clinicSessionsd/deleteExpiredDocs',deleteExpiredDocs);


router.post('/users',createUser);
router.get('/users',getUsers)




module.exports=router;