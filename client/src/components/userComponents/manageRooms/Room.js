import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "../../../styles/room.css"

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

            toast.success("Room succesfully added");
            console.log(res);
            getRooms();

        } catch (error) {
            toast.error("An error occured while trying to save the room. Check console for ore details");
            console.log(error.message);
        }
    }

    async function getRooms() {
        try {
            const res = await axios.get("http://localhost:8080/rooms");
            setRooms(res.data);
            console.log(res);
        } catch (error) {
            toast.error("An error occured while fetching tooms. Check console for more details");
            console.log(error);
        }
    }

    async function deleteRoom(id) {
        try {
            const res = await axios.delete(`http://localhost:8080/room/delete/${id}`);
           toast.success("Room succesfully deleted");
            console.log(res);
            getRooms();
        } catch (error) {
            toast.error("An error occured while trying to delete the room. Check console for more details");
            console.log(error);
        }
    }


    return (<>
    <div className="room_container">
    <div className="room">
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

        <div><ToastContainer /></div>
        </div></div>
    </>)


}
export default Room;