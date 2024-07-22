const User=require('../models/User');
const {comparePassword, generateJwtToken}=require('../security/security');

const login=async(req,res)=>{
    const{email,password}=req.body;
    console.log(email, password)

    try{
        const user=await User.findOne({
            email:email
        });

        if(!user){
            return res.status(404).send('User not found');
        }

        if(comparePassword(password.toString(),user.password)){
            const tokenPayload={
                email: user.email,
                id:user._id
            }
         
            const token=generateJwtToken(tokenPayload);
            const loginDetails={
                
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