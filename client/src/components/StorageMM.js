import axios from "axios";
import { Link } from "react-router-dom";
import '../styles/storageMM.css'


function StorageMM() {

    async function cleanUpInvalidDependencies() {
        try {
            const res = await axios.delete("http://localhost:8080/cleanUpInvalidDependencies")
            console.log(res);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function clearExpiredDocs() {
        try {
            const res = await axios.delete("http://localhost:8080/clinicSessionsd/deleteExpiredDocs");
            console.log(res);

        } catch (error) {

            console.log(error);
        }
    }
    return (<>
    <div className="storageMM">
        <button onClick={cleanUpInvalidDependencies}>clean up invalid dependencies</button>
        <br></br>
        <button onClick={clearExpiredDocs}>clear expired documents</button>
        <li><Link to="/">home</Link></li>
        </div>
    </>)
}
export default StorageMM;