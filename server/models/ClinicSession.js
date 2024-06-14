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


module.exports=mongoose.model('ClinicSession',ClinicSessionSchema);
