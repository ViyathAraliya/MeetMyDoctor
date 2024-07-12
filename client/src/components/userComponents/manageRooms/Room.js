import axios from "axios";
import { useEffect, useState } from "react";

function Room() {

    const [roomNumber, setRoomNumber] = useState(null);
    const [rooms, setRooms] = useState(null);

    useEffect(() => {
        getRooms();
    }, []);

    async function addRoom() {
        const data = { "roomNumber": roomNumber };
        try {
            const res = await axios.post("http://localhost:8080/rooms", data);
            console.log(res);

        } catch (error) {
            console.log(error.message);
        }
    }

    async function getRooms() {
        try {
            const res = await axios.get("http://localhost:8080/rooms");
            setRooms(res.data);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteRoom(id) {
        try {console.log(id)
            const res = await axios.delete(`http://localhost:8080/room/delete/${id}`);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }


    return (<>
        <label htmlFor="roomNumber" >Room Number</label>
        <input id="roomNumber" onChange={(event) => setRoomNumber(event.target.value)} />
        <button onClick={addRoom}>add room</button>

        <table className="table table-grid">
            <thead>
                <tr>
                <th>Room Number</th>
                </tr>
            </thead>
            <tbody>{rooms && rooms.map(room => (
                <tr key={room._id}>
                    <td>{room.roomNumber}</td>
                    <td><button onClick={()=>deleteRoom(room._id)}>delete</button></td>
                </tr>
            ))
            }</tbody>
        </table>
    </>)


}
export default Room;