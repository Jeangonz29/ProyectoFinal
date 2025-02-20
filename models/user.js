
const mongoose = require('mongoose')
const usersRouter = require('../controllers/users');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,  
    password:String,

    verified:{
        type:Boolean,
        default:false
    } 

}) 

userSchema.set('toJSON',{

    transform: (document,returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v; 
        delete returnObject.password; 
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;