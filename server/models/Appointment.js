const { default: mongoose } = require("mongoose");

const allowedStatuses=['CONFIRMED','NOT_CONFIRMED_YET','DISCARD']

const AppointmentSchema = new mongoose.Schema({
    patientName: String,
    contactNo:{ type: String,
      
        required: true,
        unique: true,
        index: true
    },
    address: String,
    
    queueNumber: Number,
    status: {
        type: String,
        default: 'NOT_CONFIRMED_YET',
        validate:{
        validator: function(value){
            return allowedStatuses.includes(value);},
            message: props=>`${props.value} is not a valid status`}}
       ,
    description: String,
    clinicSession: {
        type: mongoose.Schema.ObjectId,
        ref: 'ClinicSession'

    }
});

module.exports=mongoose.model('Appointment', AppointmentSchema);

