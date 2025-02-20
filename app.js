require('dotenv').config()

const express = require('express')
const faceapi = require('face-api.js');
const app = express()
const mongoose = require('mongoose')
const { Canvas, Image } = require('canvas');
const fileUpload = require('express-fileupload');
const path = require('path')

faceapi.env.monkeyPatch({ Canvas, Image });

app.use(fileUpload({ useTempFiles: true }));

//Router van aqui por ejemplo:
//const userRouter = require('./controllers/usuario')
//const tareaRouter = require('./controllers/actividad')
const userRouter = require('./controllers/users')

//dependencias
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')


//Conexion a la BD (El mongoose se puede poner aqui pero lo puse arriba)
try{
    mongoose.connect(process.env.MONGO_URL)
    console.log('Conexion a BD correcta PROYECTO FINAL')
} catch(error) {
    console.log(error)
}


//crear rutas de front end localhost //

app.use('/',express.static(path.resolve('views','1_home')))
app.use('/registro',express.static(path.resolve('views','2_login_registro')))
app.use('/sesion',express.static(path.resolve('views','3_login_iniciar_sesion')))
app.use('/admin',express.static(path.resolve('views','4_sesion_Admin')))
app.use('/sesion_RRHH',express.static(path.resolve('views','5_sesion_RRHH')))
app.use('/sesion_security',express.static(path.resolve('views','6_sesion_security')))
app.use('/vistaUsuarioEmpleado',express.static(path.resolve('views','7_vistaUsuarioEmpleado')))
app.use('/components',express.static(path.resolve('views','components'))) 
app.use('/css',express.static(path.resolve('views','css')))
app.use('/fonts',express.static(path.resolve('views','fonts')))
app.use('/img',express.static(path.resolve('views','img')))
//OJO aqui es muy importante/ esto es obligatorio para todo ya que el backend solo lee json
app.use(express.json())

app.use(cors());
app.use(cookieParser())
app.use(morgan('tiny')) //tiene que tener el tiny porque viene predefinida
//lo primero que debo hacer antes de enviar a la bd es validar



//crear rutas de back end ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/api/users',userRouter)


module.exports = app;