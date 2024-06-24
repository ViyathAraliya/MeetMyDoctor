const {ObjectId}=require('mongoose')

class AppointmentDto{/**
 * @param {ObjectId} id, 
 * @param {String} patientName 
 * @param {String} contactNo 
 * @param {String} address 

 * @param {Number} queueNumber 
 * @param {String} description 
 * @param {ObjectId} clinicSessionId
 */
    constructor(id=null, patientName=null , contactNo=null , address=null, 
        queueNumber=null, description=null, clinicSessionId=null){
            this.patientName=patientName,
            this.contactNo=contactNo,
            this.address=address,
            
            this.queueNumber=null,
            this.description=description,
            this.clinicSessionId=clinicSessionId
    }
}

module.exports=AppointmentDto;