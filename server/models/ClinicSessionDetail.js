const mongoose=require('mongoose')

const ClinicSessionDetailSchema=new mongoose.Schema({
    doctorId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        unique: true
    },
    clinicSlotDuration: Number,
    maxPatients: Number,

})

module.exports=mongoose.model('ClinicSessionDetail', ClinicSessionDetailSchema);