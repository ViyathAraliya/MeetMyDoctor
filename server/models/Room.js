const mongoose=require('mongoose');

const RoomSchema=new mongoose.Schema({
    roomNumber:Number
})
module.exports=mongoose.model('Room',RoomSchema);