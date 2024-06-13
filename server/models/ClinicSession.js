const mongoose=require('mongoose')

const ClinicSessionSchema=new mongoose.Schema({
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    
    startsAt: Date,
    endsAt: Date,
    currentQueueSize: Number,
    maxQueueSize: Number

});

//compuound index 
ClinicSessionSchema.index({startsAt: 1, endsAt: 1},
    {unique: true}
);

module.exports=mongoose.model('ClinicSession',ClinicSessionSchema);
