class RoomDto{
    /**
     * Represents a DTO (Data Transfer Object) for model 'Room'.
     * Defines the structure of JSON objects expected in requests.
     * @param {String} _id
     * @param {Number} roomNumber 
     */
    constructor(_id=null,roomNumber=null){
            this.roomNumber=roomNumber;
    }
}

module.exports=RoomDto;