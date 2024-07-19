import axios from "axios";
import { Link } from "react-router-dom";

function StorageMM(){

    async function cleanUpInvalidDependencies(){
        try{
      const res=   await axios.delete("http://localhost:8080/cleanUpInvalidDependencies")
         console.log(res);
        }
        catch(error){
            console.log(error);
        }
    }

    async function clearExpiredDocs(){
        try{
            const res= await axios.delete("http://localhost:8080/clinicSessionsd/deleteExpiredDocs");
            console.log(res);

        }catch(error){
            
            console.log(error);
        }
}
    return(<>
        <button onClick={cleanUpInvalidDependencies}>clean up invalid dependencies</button>
        <br></br>
        <button onClick={clearExpiredDocs}>clear expired documents</button>
        <li><Link to="/">home</Link></li>
    </>)
}
export default StorageMM;