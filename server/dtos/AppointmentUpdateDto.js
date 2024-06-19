const {ObjectId}=require('mongoose')

class AppointmentUpdateDto{
    /**
     * 
     * @param {ObjectId} appointmentId 
     * @param {String} status 
     */
    constructor(appointmentId,status){
        this.appointmentId=appointmentId,
        this.status=status
    }
}

module.exports=AppointmentUpdateDto;