const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{ type:String , required:true, default:"lastname" },
    lastname:{ type:String , required:true, default:"lastname" },
    username:{ type:String , required:true, unique:true, },
    email: { type:String , required:true, unique:true },
    password: { type:String , required:true },
    IsAdmin: {type:Boolean , default:false }

},
{ timestamps:true }
);


module.exports = mongoose.model('User', UserSchema );
