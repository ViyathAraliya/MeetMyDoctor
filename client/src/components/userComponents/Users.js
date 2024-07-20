import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../utils/AuthContext';

function Users() {

    const [users, setUsers] = useState(null);
    const [username, setUsername] = useState(null);
    const [adminStatus, setAdminStatus] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [user, setUser] = useState(null);



    useEffect(() => {
        getUsers();
        getCurrentUser();
    }, [])

    const { isAuthenticated, jwtToken } = useAuth();


    async function getCurrentUser() {
        if (!isAuthenticated) {
            return console.log("not authenticated");
        }

        const config={
            headers:{
                Authorization:`Bearer ${jwtToken}`
            }
        };

        try {
            const res = await axios.get("http://localhost:8080/getUser",config);
            const user = res.data;
            setUser(user);
        } catch (error) {
            console.log(error);
        }

    }

    async function getUsers() {
        try {
            const res = await axios.get("http://localhost:8080/users");
            setUsers(res.data);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        finally {
            setUsername(null)
        }
    }

    async function createUser(event) {
        event.preventDefault();
        console.log('susername', username);
        try {
            const data = {
                "name": username,
                "admin": adminStatus,
                "email": email,
                "password": password
            }
            const res = await axios.post("http://localhost:8080/users", data);
            console.log(res);

        }
        catch (error) {
            console.log(error);
        } finally {
            setUsername(null);
            setPassword(null);
            setEmail(null);
        }
    }


    return (<div className="users">
        <div className="currentUser_users">
            <label htmlFor="curentUser">current user</label>
            <input id="currentUser" value={(user!=null)?user.username:""}readOnly/>

            <label htmlFor="email">email</label>
            <input id="email" value={(user!=null)?user.email:""} readOnly/>
        </div>
        <div className="createUser_users">
            <form onSubmit={createUser}>
                <label htmlFor="username">Username</label>
                <input id="username" onChange={(e) => { setUsername(e.target.value); }} />
                <br></br>
                <label htmlFor="adminStatus">Admin Status</label>
                <select id="adminStatus" onChange={(e) => setAdminStatus((e.target.value) === "true")}>4
                    <option value="false">user</option>
                    <option value="true">admin</option>

                </select>
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
            <h2>Users</h2>
            <table className='table table-grid'>
                <thead>
                    <tr>
                        <th>username</th>
                        <th>admin status</th>
                        <th>email</th>

                    </tr>
                </thead>
                <tbody>{users &&
                    users.map(user => (<tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.admin ? "admin" : "user"}</td>

                        <td>{user.email}</td>
                    </tr>))

                }</tbody>
            </table>
        </div>
    </div>)
}

export default Users;