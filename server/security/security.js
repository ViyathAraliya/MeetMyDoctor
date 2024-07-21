const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const secretKey='secretesOfMe';

//generating a JWT token
const generateJwtToken=(payload)=>{
    return jwt.sign(payload,secretKey,{expiresIn:'12h'
});
} 

//middleware to validate JWT Token and process the request
const verifyJwtToken=(req,res,next)=>{

  
    let token=req.headers['authorization'];
    console.log("authorization : ",token)

    if(!token){  
        return res.status(401).send('Unauthorized');
    }

    token=token.replace('Bearer ','');
    console.log("token : ",token)

    jwt.verify(token, secretKey,(err,user)=>{
        if(err){
            console.log(err)
            return res.status(401).send('Unauthorized');
        }

        req.user=user;
        next();
    });
}

const hashPassword=(password)=>{
    return bcrypt.hashSync(password,10);
}

const comparePassword=(password,hash)=>{
    return bcrypt.compare(password, hash);
}

module.exports={
    generateJwtToken,
    verifyJwtToken,
    hashPassword,
    comparePassword
}