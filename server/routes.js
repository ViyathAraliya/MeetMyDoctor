const express=require('express');
const { addDoctor } = require('./controllers/DoctorController');
const { addRoom } = require('./controllers/RoomController');

const router=express.Router();

router.post('/doctors', addDoctor);


router.post('/rooms',addRoom);



module.exports=router;