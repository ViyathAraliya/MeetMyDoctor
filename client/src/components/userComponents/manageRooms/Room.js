import axios from "axios";
import { useState } from "react";

function Room(){

    const[roomNumber,setRoomNumber]=useState(null);

    async function addRoom(){
        const data={"roomNumber":roomNumber};
        try{
            const res=await axios.post("http://localhost:8080/rooms",data);
            console.log(res);

        }catch(error){
            console.log(error.message);
        }
    }

    

    return(<>
    <label htmlFor="roomNumber" >Room Number</label>
    <input id="roomNumber" onChange={(event)=>setRoomNumber(event.target.value)}/>
    <button onClick={addRoom}>add room</button>
    </>)


}
export default Room;