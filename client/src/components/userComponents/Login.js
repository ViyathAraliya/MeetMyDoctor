import { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login(){
    const[username, setUsername]=useState('');
    const[password,setPassword]=useState('');

    const {login}=useAuth();
    const navigate=useNavigate();

    const handleLogin=(e)=>{
        e.preventDefault();
    

    const data={
        username:username,
        password:password
    }

    axios.post("http://localhost:8080/auth/login",data)
    .then((response)=>{
        login(response.data);

        toast.success("Login Succesful");
        console.log(error);
    });
}

    return(
        <div className="container">
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label for="username">Username</label>
                    <input type="text" className="form-controll" onChange={(e)=>setUsername(e.target.value)}/>
                </div>

                <div className="form=group">
                    <label for="password">Password</label>
                    <input type="passowrd" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );

}

export default Login;