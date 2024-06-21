import { Link } from "react-router-dom";

function Home(){

    return(<>
    <label>Hello</label>
   <li><Link to="/appointments_customer">Make an Appointment</Link></li> 

    </>)
}
export default Home;