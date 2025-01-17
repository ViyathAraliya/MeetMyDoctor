
class DoctorDto {
    /**
     * Represents a DTO (Data Transfer Object) for model 'Doctor'.
     * Defines the structure of JSON objects expected in requests.
     * 
     * @param {String} id
     * @param {String} name 
     * @param {String} contactNumber 
     * @param {String} whatsapp 
     * @param {String} email 
     * @param {String} specialization 
     * @param {String} educationAbbrivation 
     * @param {String} generalSlotDuration 
     */
    constructor(id=null,name=null, contactNumber=null, whatsapp=null, email=null, specialization=null,
         educationAbbrivation=null, generalSlotDuration=null) {
        this.name = name;
        this.contactNumber = contactNumber;
        this.whatsapp = whatsapp;
        this.email = email;
        this.specialization = specialization;
        this.educationAbbrivation = educationAbbrivation;
        this.generalSlotDuration = generalSlotDuration;
    }
}

module.exports = DoctorDto;