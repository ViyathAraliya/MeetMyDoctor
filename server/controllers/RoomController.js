
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


    const roomDto = new RoomDto();
    roomDto.roomNumber = roomNumber;

    const room = new Room({ roomNumber: roomDto.roomNumber, clinicSessions: [] });
    try {
        await room.save();
        return res.status(201).send(room);

    } catch (error) {
        console.log(error)
        return res.status(400).send(error);
    }

}

//add clinic session to Room
const addClinicSessionToRoom = async (req, res) => {

    // step 1 : ObjectId  of 'Room' document, in String format
    const _Id = req.params;

    //step 2 : Deserializing  the request body
    const { id, doctorId, startsAt, endsAt } = req.body;

    //step 3 :  Inizialiting ClinicSession Object
    const clinicSession = new ClinicSession();

    //step 4 : Setting properties obtained from the dto
    clinicSession.id = id;
    clinicSession.doctorId = doctorId;
    clinicSession.startsAt = startsAt;
    clinicSession.endsAt = endsAt;

    //step 5 : retrieving 'Room'  by objectId (in step 1)
    let room = await Room.findById(_Id);

    // step 6 : extracting 'clinicSessions' array from 'room' object
    const clinicSessions = room.clinicSessions;

    // step 7 : checking for duplicates
    for (let i = 0; i < clinicSessions; i++) {
        if (clinicSessions[i] == clinicSession) {
            return res.status(409).send("this clinic session already exists in this room");
        }
    }

    // step 8 : adding clinicSesson to room
    room.clinicSessions.push(clinicSession);
}

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        return res.status(200).send(rooms);
    } catch (error) {
        return res.status(500).send(error)
    }
}

const deleteRoom = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try { console.log(1)
        //step 1: retrive room 
        const room = await Room.findById(id);
        console.log(1)
        //step 2: check if room is retrived
        if (room == null) {
            return res.status(404).json({ message: 'Room not found' });
        }
console.log(2)
        //step 3: check for clinicSessions in room
        const clinicSessions = room.clinicSessions;
        if (clinicSessions != null && clinicSessions.length > 0) {
            return res.status(409).json({
                message: "Can't delete this room because there are clinic sessions" +
                    +" registered with this room"
            })
        }

        //step 4: delete room if all validations and dependencies are checked
         await room.deleteOne();
      
            return res.status(204).json({ message: "succesfully deleted room" });
       
        // using id instead of directly calling room.deleted()  to validate

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "an internal server error" });
        
    }
}

module.exports = { addRoom, addClinicSessionToRoom, getRooms, deleteRoom };