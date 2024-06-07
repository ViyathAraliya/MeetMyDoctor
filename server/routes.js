const express=require('express');
const { addDoctor } = require('./controllers/DoctorController');
const router=express.Router();

router.post('/doctors', addDoctor);



module.exports=router;