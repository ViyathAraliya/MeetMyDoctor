const mongoose = require('mongoose')

const DoctorSchema = new mongoose.Schema({
    name: String,
    contactNumber: { // uniquly identified by contactNumber
        type: String,
        required: true,
        unique: true,
        index: true

    },
    whatsapp: String, //whastappNumber
    email: String,
    specialization: String,
    educationAbbrivation: String,
    generalSlotDuration: Number  //general time per patient

})

module.exports = mongoose.model('Doctor', DoctorSchema);