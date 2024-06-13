class ClinicSessionDto {
    constructor(doctorId, startsAt, endsAt
    ) { 
        this.doctorId=doctorId,
        this.startsAt=startsAt,
        this.endsAt=endsAt
    };
}

module.exports=ClinicSessionDto;