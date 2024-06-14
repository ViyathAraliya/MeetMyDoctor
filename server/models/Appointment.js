const { default: mongoose } = require("mongoose");


const AppointmentScehema = new mongoose.Schema({
    patientName: String,
    contactNo:{ type: String,
        type: String,
        required: true,
        unique: true,
        index: true
    },
    address: String,
    
    queueNumber: Number,
    description: String,
    clinicSession: {
        type: mongoose.Schema.ObjectId,
        ref: 'ClinicSession'

    }
});

module.exports=mongoose.model('Appointment', AppointmentScehema);

