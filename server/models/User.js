const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name: String,
    admin: Boolean,
    email:{type: String, unique:true},
    password:String,
    createdAt:{type:Date,default:Date.now}
});

module.exports=mongoose.model('User',UserSchema);