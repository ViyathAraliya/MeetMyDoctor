class ClinicSessionDto {
    /**
    * Represents a DTO (Data Transfer Object) for model 'ClinicSession'.
    * Defines the structure of JSON objects expected in requests.
    *
    *
    * @param {ObjectId} id 
    * @param {ObjectId} doctorId 
    * @param {Date} startsAt 
    * @param {Date} endsAt 
    */
    constructor(id = null, doctorId = null, startsAt = null, endsAt = null ) {
        this.id = id,
            this.doctorId = doctorId,
            this.startsAt = startsAt,
            this.endsAt = endsAt
    };
}

module.exports = ClinicSessionDto;