const mongoose=require('mongoose');
const ClinicSession = require('./ClinicSession');


const RoomSchema=new mongoose.Schema({
    roomNumber:{
        type: Number,
        required:true,
        unique:true,
       index:true
        
    },
    clinicSessions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CliniSession',
        //unique:true,
        index:true,
        sparse:true
       
    }]
});

module.exports=mongoose.model('Room',RoomSchema);