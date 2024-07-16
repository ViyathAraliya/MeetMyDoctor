const User=require('../models/User');
const {hashPassword}=require('../security/security');

const createUser=async(req,res)=>{
  
    const{name, email, password}=req.body;

    try{
        const user=new User();
        user.name=name;
        user.email=email;
        user.password=hashPassword(password.toString());

        await user.save();
        res.status(201).send(user);

    }catch(error){
        console.log(error);
        res.status(400).send(error);
    }
    
};

const getUsers=async(res,req)=>{
  try{
    const users=await User.find({});
    res.status(200).send(users);
}catch(error){
    res.status(500).send(error);
}  
};

module.exports={
    createUser,
    getUsers
}