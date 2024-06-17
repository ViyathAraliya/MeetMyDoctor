
const mongoose = require('mongoose')

const DoctorSchema = new mongoose.Schema({
    name: String,
    // uniquly identified by contactNumber
    contactNumber: { 
        type: String,
        required: true,
        unique: true,
        index: true

    },

    //whastappNumber
    whatsapp: String, 
    email: String,
    specialization: String,
    educationAbbrivation: String,

    //general time per patient in mins
    generalSlotDuration: Number  

})

module.exports = mongoose.model('Doctor', DoctorSchema);
