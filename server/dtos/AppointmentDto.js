const {ObjectId}=require('mongoose')

class AppointmentDto{/**
 * @param {ObjectId} id, 
 * @param {String} patientName 
 * @param {*Stringg} contactNo 
 * @param {String} address 

 * @param {Number} queueNumber 
 * @param {String} description 
 * @param {ObjectId} clinicSession 
 */
    constructor(id=null, patientName=null , contactNo=null , address=null, 
        queueNumber=null, description=null, clinicSessionId=null){
            this.patientName=patientName,
            this.contactNo=contactNo,
            this.address=address,
       
            this.queueNumber=null,
            this.description=description,
            this.clinicSession=clinicSessionId
    }
}

module.exports=AppointmentDto;