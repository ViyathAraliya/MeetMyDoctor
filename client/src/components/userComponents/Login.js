import { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login(){
    const[username, setUsername]=useState('');
    const[password,setPassword]=useState('');

    const {login,logout}=useAuth();
 

    const handleLogin=(e)=>{
        e.preventDefault();
    

    const data={
        email:username,
        password:password
    }

    axios.post("http://localhost:8080/auth/login",data)
    .then((response)=>{
        login(response.data.token);
        console.log("at login : ",response.data.token)

        toast.success("Login Succesful");
        console.log(response);
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
        <div className="container">
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">email</label>
                    <input type="text" className="form-controll" onChange={(e)=>setUsername(e.target.value)}/>
                </div>

                <div className="form=group">
                    <label htmlFor="password">Password</label>
                    <input type="passowrd" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <button onClick={handleLogout}>logout</button>

            <Link to="/">Home</Link>
        </div>
    );

}

export default Login;