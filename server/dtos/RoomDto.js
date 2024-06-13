class RoomDto{
    /**
     * Represents a DTO (Data Transfer Object) for model 'Room'.
     * Defines the structure of JSON objects expected in requests.
     * @param {Number} roomNumber 
     */
    constructor(roomNumber){
            this.roomNumber=roomNumber;
    }
}

module.exports=RoomDto;