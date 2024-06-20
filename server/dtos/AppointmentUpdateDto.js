const { ObjectId } = require('mongoose')

class AppointmentUpdateDto {
    /**
     * 
     * @param {ObjectId} appointmentId 
     * @param {String} status 
     */
    constructor(appointmentId, status) {

        if (!['CONFIRMED', 'NOT_CONFIRMED_YET', 'DISCARD'].includes(status)) {
            throw new Error(`${status} is not valid a valid status`);
        }
        this.appointmentId = appointmentId,
            this.status = status
    }
}

module.exports = AppointmentUpdateDto;