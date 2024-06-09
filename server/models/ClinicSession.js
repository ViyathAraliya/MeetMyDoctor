const mongoose=require('mongoose')

const ClinicSessionSchema=new mongoose.Schema({
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    roomNumber: Number,
    clinicHours: Number,
    currentQueueSize: Number,
    maxQueueSize: Number

})

module.exports=mongoose.model('CliniSession',ClinicSessionSchema);