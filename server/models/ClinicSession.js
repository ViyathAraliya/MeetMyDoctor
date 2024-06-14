const mongoose=require('mongoose')

const ClinicSessionSchema=new mongoose.Schema({
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    
    startsAt: Date,
    endsAt: Date,
   
    appointments:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Appointment'
    }]
  

});

//compuound index 
ClinicSessionSchema.index({startsAt: 1, endsAt: 1},
    {unique: true}
);

module.exports=mongoose.model('ClinicSession',ClinicSessionSchema);
