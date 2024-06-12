class DoctorDto {
    constructor(name, contactNumber,whatsapp,email, 
        specialization,educationAbbrivation,generalSlotDuration) { 
            this.name=name;
            this.contactNumber=contactNumber;
            this.whatsapp=whatsapp;
            this.email=email;
            this.specialization=specialization;
            this.educationAbbrivation=educationAbbrivation;
            this.generalSlotDuration=generalSlotDuration;
        }
}

module.exports=DoctorDto;