const RoomDto = require("../dtos/RoomDto");
const Room = require("../models/Room");


const addRoom = async (req, res) => {
    const { roomNumber } = req.body;
    const roomDto = new RoomDto(roomNumber);
    const room = new Room({ roomNumber: roomDto.roomNumber, clinicSessions:[]});
    try {
        await room.save();
        return res.status(201).send(room);

    } catch (error) {
        return res.status(400).send(error);
    }

}

const addClinicSessionToRoom=async(req, res)=>{
   
}

module.exports = { addRoom };