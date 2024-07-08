import axios from "axios";

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
    return(<>
        <button onClick={cleanUpInvalidDependencies}>clean up invalid dependencies</button>
    </>)
}
export default StorageMM;