
const User = require('../models/User');
const { hashPassword } = require('../security/security');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {

    const { name, admin, email, password, isAdmin } = req.body;

    try {
       if (!isAdmin) {
            return res.status(403).json({ message: "Only admin can save new users" });
        }
        const user = new User();
        user.name = name;
        user.admin = admin;
        user.email = email;
        user.password = hashPassword(password.toString());

        await user.save();
        res.status(201).send(user);

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

};

const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    const isAdmin = req.query.isAdmin;
    if (!isAdmin) {
        return res.status(403).json({ message: "Only admin delete users" });
    }

    try {
        
        const deletedUser = await User.findByIdAndDelete(userId);
        if (deletedUser == null) {
            return res.status(400).json({ message: "couldnt delete user" })
        }

        return res.status(204).json({ message: "User deletion succesful!" })
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateUser = async (req, res) => {
    const { _id, updatedUsername, updateEmail, currentPassword,
        newPassword, newPasswordConfirm } = req.body;
    if (newPassword != newPasswordConfirm) {
        return res.status(401).json({ message: "password confirmation mistmatch" })
    }
    try {

        const user = await User.findById({ _id });
        if(user==null){
            return res.status(404).json({message:"user not found"});
        }
        const hashedPassword = user.password;
        const passwordToBeValidated = currentPassword;

        const isMatch =await bcrypt.compare(passwordToBeValidated, hashedPassword);

        if (isMatch) {
            user.name = updatedUsername;
            user.email = updateEmail;
            user.password =  hashPassword(newPassword.toString());
        }
        else {
            console.error("current password is incorrect");
            return res.status(401).json({ message: "current password is incorrect" })
        }


        await user.save();
        return res.status(200).json({ message: "user details update succesfully" });
    }
    catch (error) {
        console.log(error);Console.log("");
        return res.status(500).json({ message: error });
    }
}
module.exports = {
    createUser,
    getUsers,
    deleteUser,
    updateUser
}