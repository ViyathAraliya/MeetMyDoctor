import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../utils/AuthContext';

function Users() {

    const [users, setUsers] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    async function getUsers() {
        try {
            const res = await axios.get("http://localhost:8080/users");
            setUsers(res.data);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        finally{
            setUsername(null)
        }
    }

    async function createUser(event) {
        event.preventDefault();
        console.log('saved');
        try {
            const data = {
                "username": username,
                "email": email,
                "password": password
            }
            const res= await axios.post("http://localhost:8080/users",data);
            console.log(res);
            
        }
        catch (error) { 
            console.log(error);
        }finally{
            setUsername(null);
            setPassword(null);
            setEmail(null);
        }
    }


    return (<div className="users">
        <div className="createUser_users">
            <form onSubmit={createUser}>
                <label htmlFor="username">Username</label>
                <input id="username" onChange={(e) => { setUsername(e.target.value); }} />
                <br></br>
                <label htmlFor="email">Email</label>
                <input id="email" onChange={(e) => { setEmail(e.target.value) }} />
                <br></br>
                <label htmlFor="password">password</label>
                <input id="password" onChange={(e) => { setPassword(e.target.value) }} />
                <button type="submit">save</button>
            </form>
        </div>
        <div className="updateUser_users">
            <table>
                <thead>
                    <tr>
                        <th>username</th>
                        <th>email</th>
                        
                    </tr>
                </thead>
                <tbody>{users &&
                 users.map(user=>(<tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                 </tr>))
                    
                    }</tbody>
            </table>
        </div>
    </div>)
}

export default Users;