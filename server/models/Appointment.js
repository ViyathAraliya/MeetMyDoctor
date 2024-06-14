const { default: mongoose } = require("mongoose");


const AppointmentScehema = new mongoose.Schema({
    patientName: String,
    contactNo: String,
    address: String,
    doctorId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor',
        required: true
    },
    queueNumber: Number,
    description: String,
    clinicSession: {
        type: mongoose.Schema.ObjectId,
        ref: 'ClinicSession'

    }
});

module.exports=mongoose.model('Appointment', AppointmentScehema);

