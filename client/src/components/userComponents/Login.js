import { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/login.css"

function Login(){
    const[username, setUsername]=useState('');
    const[password,setPassword]=useState('');

    const {login,logout}=useAuth();
    const navigate = useNavigate();
 

    const handleLogin=(e)=>{
        e.preventDefault();
    

    const data={
        email:username,
        password:password
    }

    axios.post("http://localhost:8080/auth/login",data)
    .then((response)=>{
        login(response.data);
        console.log("response at login ",response.data)
        
      
        toast.success("Login Succesful");
        setTimeout(() => {
            navigate("/");
        }, 1000); 

    }).catch((error)=>{
        toast.error("invalid credentials");
        console.log(error);

    });
}

const handleLogout=()=>{
 logout();
 console.log("succesfully logged out")
}

    return(
        <div className="login-container">
            <h1>Login </h1>
            <form className="login-form"onSubmit={handleLogin}>
                <div className="login-from-email">
                    <label htmlFor="email">email</label>
                    <input type="text" className="form-controll" onChange={(e)=>setUsername(e.target.value)}/>
                </div>

                <div className="login-form-password">
                    <label htmlFor="password">Password</label>
                    <input type="passoword" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <button onClick={handleLogout} className="btn btn-primary">logout</button>
            </form>
         

            <Link to="/" style={{ color: 'blue', textDecoration: 'none' }}>Home</Link>
        </div>
    );

}

export default Login;