// 1- conectar a mongodb y crear la dependecias
const mongoose = require('mongoose')
const usersRouter = require('../controllers/users');


// 2- definir el schema
const userSchema = new mongoose.Schema({
    //aqui defino mi modelo que quiero guardar
    // name:{
       // type:String,
       // require:true
   // }, //aqui hay dos formas de hacerlo
   name:String,
   email:{
       type: String,
       required:true,
       unique: true
   },
   password:{
    type: String,
    required:true
},
   rol:{
       type:String,
       enum: ['admin', 'user'],
       default: 'user'
   },
   varified:{
       type:Boolean,
       default:false
   
   }
    //si yo quiero entrar a una dta por defecto
    // porque si un usuario le llega un correo para verifique, tengo que usar esto:
    //esta en false hatsa que el usuario confirme la verificacion y se convierta en true

}) 

// 3- configuar la respuesta del usuario en el schema
userSchema.set('toJSON',{
    //mongodb guarda los id de forma automatica, y de forma piso _id
    //podemos hacer:
    //document en el schema
    //returObject es lo que estoy solicitando
    transform: (document,returnObject)=>{
        //aqui estamos creando una nueva propiedad que se llame id
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v; //version
        delete returnObject.password; //porque no quiero que me la guarde encriptada
    }
})

//4 dar nombre, registrar el modelo de datos
const User = mongoose.model('User', userSchema);

module.exports = User;