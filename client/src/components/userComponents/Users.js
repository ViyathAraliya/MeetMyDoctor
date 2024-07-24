import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../utils/AuthContext';

function Users() {

    const [users, setUsers] = useState(null);
    const [username, setUsername] = useState(null);
    const [adminStatus, setAdminStatus] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [editUserDetails, setEditUserDetails] = useState(false);

    //for update
    const [updatedUsername, setUpdatedUsername] = useState(null);
    const [updatedEmail, setUpdatedEmail] = useState(null);
    const [currentPassword, setCurrentPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [newPasswordConfirm, setNewPasswordConfirm] = useState(null);



    useEffect(() => {
        getUsers();

    }, [])

    const { isAuthenticated, loginDetails } = useAuth();




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
        if (loginDetails == null) {
            return console.log("please login first");
        }
        const login_Details = loginDetails.loginDetails;
        const jwtToken = login_Details.jwtToken;
        const isAdmin = login_Details.admin;

        const config = {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        };
        try {
            const data = {
                "name": username,
                "admin": adminStatus,
                "email": email,
                "password": password,
                "isAdmin": isAdmin
            }
            const res = await axios.post("http://localhost:8080/users", data, config

            );
            console.log(res);

        }
        catch (error) {
            console.log(error.response.data.message);
        } finally {
            setUsername(null);
            setPassword(null);
            setEmail(null);
        }
    }

    async function deleteUser(userId) {

        if (loginDetails == null || loginDetails.loginDetails == null) {
            return console.log("please login first");
        }

        const login_details = loginDetails.loginDetails;
        const isAdmin = login_details.isAdmin;
        const jwtToken = login_details.jwtToken;
        const data = { "userId": userId, "isAdmin": isAdmin };

        const config = {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        };
        const url = `http://localhost:8080/users/${userId}?isAdmin=${isAdmin}`
        try {
            const res = await axios.delete(url, config);
            console.log(res);
        } catch (error) {
            console.log(error.response.data.message);
        }


    }

    function editUserDetailsToggle() {
        if (loginDetails == null
             || loginDetails.loginDetails==null
        ) {
            return console.log("please login first");
        }
        setEditUserDetails(!editUserDetails);
    }

    async function updateUserDetails() {
        if (loginDetails == null || loginDetails.loginDetails==null) {
            return console.log("please login first");
        }
        let editedUsername=loginDetails.loginDetails.username;
        let editedEmail=loginDetails.loginDetails.email;
        
        if(updatedUsername && updatedUsername.trim() !== ''){
            editedUsername=updatedUsername;
        }
        if(updatedEmail && updatedEmail.trim()!==''){
            editedEmail=updatedEmail;
        }
        if (editedUsername== null || editedEmail == null || currentPassword == null || newPassword == null ||
            newPasswordConfirm == null
        ) {
            console.log(
                "1. ",editedUsername,"2. ",editedEmail,"3. ",currentPassword,
                "4 .",newPassword,"5. ",newPasswordConfirm
            )
            return console.log("please fill all the fields")
        }
        if (newPassword != newPasswordConfirm) {

            return console.log("new password and confirm new password don't match ");
        }

        const data = {
            "_id": loginDetails.loginDetails._id,
            "updatedUsername": updatedUsername,
            "updateEmail": updatedEmail,
            "currentPassword": currentPassword,
            "newPassword": newPassword,
            "newPasswordConfirm": newPasswordConfirm
        }

        const jwtToken = loginDetails.loginDetails.jwtToken;

        const config = {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        };
        try {
            const res = await axios.put("http://localhost:8080/users", data, config);
            console.log(res);
        } catch (error) {
            console.log(error);
        }



    }


    return (<div className="users">
        <div className="editUserDetails_users">
            <button onClick={editUserDetailsToggle}>Edit User details</button>{
                editUserDetails && (<>
                    <label htmlFor="username_edit">username</label>
                    <input id="username_edit" placeholder={loginDetails.loginDetails.username }
                        onChange={(event) => { setUpdatedUsername(event.target.value) }} />
                    <label htmlFor="email_edit">Email</label>
                    <input id="email_edit" placeholder={loginDetails.loginDetails.email}
                        onChange={(event) => { setUpdatedEmail(event.target.value) } } />
                    <br></br>
                    <label htmlFor="oldPassword_edit">password</label>
                    <input id="currentPassword_edit"
                        onChange={(event) => { setCurrentPassword(event.target.value) }} />
                    <br></br>
                    <label htmlFor="newPassword_edit"
                        >new password</label>
                    <input id="newPassword_edit" onChange={(event) => { setNewPassword(event.target.value) }}/>
                    <br></br>
                    <label htmlFor="newPasswordConfirm_edit"
                      >confirm new password</label>
                    <input id="newPasswordConfirm_edit"   onChange={(event) => { setNewPasswordConfirm(event.target.value) }} />

                    <button onClick={updateUserDetails}>update</button></>)
            }
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
                        <td><button onClick={() => deleteUser(user._id)}>delete</button></td>
                    </tr>))

                }</tbody>
            </table>
        </div>
    </div>)
}

export default Users;