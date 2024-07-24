const User=require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJwtToken}=require('../security/security');

const login=async(req,res)=>{
    const{email,password}=req.body;
   
    try{
        const user=await User.findOne({
            email:email
        });

        if(!user){
            return res.status(404).send('User not found');
        }
console.log()
        const isMatch =await bcrypt.compare(password, user.password);
        if(isMatch){
            console.log("compare okay")
            const tokenPayload={
                email: user.email,
                id:user._id
            }
         
            const token=generateJwtToken(tokenPayload);
            const loginDetails={
                "_id":user._id,
                "username":user.name,
                "email":user.email,
                "id":user._id,
                "admin":user.admin,
                "jwtToken":token
            }

            res.status(200).send({loginDetails});
        }else{
            res.status(401).send('Unauthorized');
        }
    }catch(error){
        res.status(400).send(error);
    }
}


module.exports={
    login
};