
const ClinicSessionDto = require("../dtos/ClinicSessionDto");
const RoomDto = require("../dtos/RoomDto");
const ClinicSession = require("../models/ClinicSession");
const Room = require("../models/Room");
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Response} 
 */
//create Room
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

//add clinic session to Room
const addClinicSessionToRoom=async(req, res)=>{
    const {id}=req.body;
    const clinicSessionDto=new ClinicSessionDto(id, doctorId,startsAt,endsAt);
    const clinicSession=clinicSessionDto.id;


   
}

module.exports = { addRoom };