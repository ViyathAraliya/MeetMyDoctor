
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

    //Initializing RoomDto type object and assigning roomNumber
    const roomDto = new RoomDto();
    roomDto.roomNumber = roomNumber;

    const room = new Room({ roomNumber: roomDto.roomNumber, clinicSessions: [] });
    try {
        await room.save();
        return res.status(201).send(room);

    } catch (error) {
        return res.status(400).send(error);
    }

}

//add clinic session to Room
const addClinicSessionToRoom = async (req, res) => {

    //ObjectId  of 'Room' document, in String format
    const _Id = req.params;

    //Deserializing request the request body
    const { id, doctorId, startsAt, endsAt } = req.body;

    // Inizialiting ClinicSession Object
    const clinicSession = new ClinicSession();

    //Setting properties obtained from the dto
    clinicSession.id = id;
    clinicSession.doctorId = doctorId;
    clinicSession.startsAt = startsAt;
    clinicSession.endsAt = endsAt;

    //retrieving 'Room' 
    let room = Room.findById(_Id);

    //extracting 'clinicSessions' array from 'room' object
    const clinicSessions = room.clinicSessions;

    //checking for duplicates
    for (let i = 0; i < clinicSessions; i++) {
        if (clinicSessions[i] == clinicSession) {
            return res.status(409).send("this clinic session already exists in this room");
        }
    }

    room.clinicSessions.push(clinicSession); //adding clinicSesson to room







}

module.exports = { addRoom, addClinicSessionToRoom };