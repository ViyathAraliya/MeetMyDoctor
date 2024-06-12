const Doctor = require('../models/Doctor');
//const mongoose = require('mongoose');

const addDoctor = async (req, res) => {
    
   const requestedDoctor = req.body;
   

    try {
        const doctor=new Doctor(requestedDoctor);
       

        await doctor.save();
        res.status(201).send(doctor);

    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }

}

module.exports={
    addDoctor
}