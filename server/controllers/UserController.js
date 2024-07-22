const { json } = require('express');
const User=require('../models/User');
const {hashPassword}=require('../security/security');

const createUser=async(req,res)=>{
  
    const{name,admin, email, password, isAdmin}=req.body;
    
    try{
       if(!isAdmin){
           return res.status(403).json({message: "Only admin can save new users"});
        }
        const user=new User();
        user.name=name;
        user.admin=admin;
        user.email=email;
        user.password=hashPassword(password.toString());

        await user.save();
        res.status(201).send(user);

    }catch(error){
        console.log(error);
        res.status(400).send(error);
    }
    
};

const deleteUser=async(req, res)=>{
   const userId=req.params.userId;
   const isAdmin=req.query.isAdmin;

    try{
        if(!isAdmin){
            return res.status(403).json({message: "Only admin delete users"});
        }
        const deletedUser=await User.findByIdAndDelete(userId);
        if(deletedUser==null){
            return res.status(400).json({message:"couldnt delete user"})
        }

        return res.status(204).json({message:"User deletion succesful!"})
    }catch(error){
        return res.status(500).json({message:error});
    }
}

const getUsers=async(req,res)=>{
  try{
    const users=await User.find({});
    res.status(200).send(users);
}catch(error){
    res.status(500).send(error);
}  
};

module.exports={
    createUser,
    getUsers,
    deleteUser
}