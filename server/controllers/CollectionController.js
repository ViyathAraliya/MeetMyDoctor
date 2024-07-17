const Appointment = require("../models/Appointment");
const ClinicSession = require("../models/ClinicSession");
const Room = require("../models/Room");


const cleanUpInvalidDependacies = async (req, res) => {
    try {
        let haveErrors=false;
        let log = "";
        const rooms = await Room.find();
        const clinicSessions = await ClinicSession.find();

        //step 1:{ Required :Room, Dependent: ClinicSession } ,
        for (let i = 0; i < clinicSessions.length; i++) {
            const clinicSession = clinicSessions[i];
            const roomIdInClinicSession = clinicSession.roomId;

            let roomExists = await Room.exists({ _id: roomIdInClinicSession });

            if (!roomExists) {
                const clinicSessionId = clinicSession._id;
                const deletedClinicSession = await ClinicSession.findByIdAndDelete({ _id: clinicSessionId });
                if (deletedClinicSession) {
                    haveErrors=true;
                    log = log + "\nCouldnt delete clinic Session : " + clinicSessionId
                }
            }

        }

        //step 2: {Required: ClinicSession, Dependent: Room.clinicSessions}
        for (let i = 0; i < rooms.length; i++) { 
            const room = rooms[i];
            let clinicSessionsInRoom = room.clinicSessions;
            for (let j = 0; j < clinicSessionsInRoom.length; j++) {
                const clinicSessionIdInRoom = clinicSessionsInRoom[j]._id;
                
                let clinicSessionExists = await ClinicSession.exists({ _id: clinicSessionIdInRoom });
                console.log("deleteing clini: ",clinicSessionExists)
                if (!clinicSessionExists) {
                    clinicSessionsInRoom = clinicSessionsInRoom
                        .filter(clinicSession => clinicSession != clinicSessionIdInRoom);
                }

            }
            room.clinicSessions = clinicSessionsInRoom;
            const savedRoom = await room.save();
            if (savedRoom == null) {
                haveErrors=true;
                log = log + "\nAn error occured while saving changes in Room : " + room._id;
            }
        }

        //step 3: {Required: ClinicSesssion, dependent: Appointment }
        const appointements = await Appointment.find();
        for (let i = 0; i < appointements.length; i++) {
            const appointement = appointements[i];
            const clinicSessionId = appointements[i].clinicSession;
            const clinicSessionExists = await ClinicSession.exists({ _id: clinicSessionId });
            if (!clinicSessionExists) {
                const deletedAppointment = await appointement.deleteOne();
                if (deletedAppointment == null) {
                    haveErrors=true;
                    log = log + "\nAn error occured while deleting  Appointment  : " + appointement._id;
                }
            }
        }
        if(haveErrors){
            return res.status(200).send(log);
        }
        return res.status(200).send("sucessfulyy cleared expired data");
    } catch (error) {
        console.log(error)
        return res.status(500).send("internal server error");
    }


}

module.exports = { cleanUpInvalidDependacies }