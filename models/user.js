const mongoose = require('mongoose');
const Schema = mongoose.Schema


const UserSchema = new Schema({
    name:{ type: String, required: true },
    age:Number,
    password:String,
    email:String,
    history:Number,
    experience:Boolean
});



module.exports = mongoose.model('User',UserSchema);