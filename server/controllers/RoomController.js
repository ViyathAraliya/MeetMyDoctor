const Room = require("../models/Room");

const addRoom = async (req, res) => {
    const reqRoomNumber = req.params.roomNumber;
    console.log(22);

    try {
        const room = new Room();
        room.roomNumber = reqRoomNumber;
        await room.save();
        return res.status(201).send(room);
    } catch (error) {
        return res.status(400).send(error);
    }

}

module.exports={addRoom};