const mongoose=require('mongoose')

const ClinicSessionSchema=new mongoose.Schema({
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    clinicHours: Number,
    currentQueueSize: Number,
    maxQueueSize: Number

})

module.exports=mongoose.model('CliniSession',ClinicSessionSchema);
