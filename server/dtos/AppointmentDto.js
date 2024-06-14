class AppointmentDto{/**
 * @param {ObjectId} id, 
 * @param {String} patientName 
 * @param {*Stringg} contactNo 
 * @param {*} address 
 * @param {*} doctorId 
 * @param {*} queueNumber 
 * @param {*} description 
 * @param {*} clinicSession 
 */
    constructor(id=null, patientName=null , contactNo=null , address=null, doctorId=null , 
        queueNumber=null, description=null, clinicSession=null){
            this.patientName=String,
            this.contactNo=String,
            this.address=String,
            this.doctorId=String,
            this.queueNumber=String,
            this.description=String,
            this.clinicSession=String
    }
}