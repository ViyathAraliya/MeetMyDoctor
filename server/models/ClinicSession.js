const mongoose=require('mongoose')

const ClinicSessionSchema=new mongoose.Schema({
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    
    startsAt: Date,
    endsAt: Date,
    roomId:{
        type: mongoose.Schema.ObjectId,
        ref: 'Room'
    },
   
    appointments:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Appointment'
       
    }]
  

});

//compuound index 


module.exports=mongoose.model('ClinicSession',ClinicSessionSchema);
