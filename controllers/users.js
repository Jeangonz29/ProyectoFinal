// 1- hacer el router

const User = require('../models/user');

//router: registrar post, get, delete
const userRouter = require('express').Router();
 



//registrar la informacion que el usuario envia a traves del formulario ////////////////////////////////////////////////////////////////////////////////////////
userRouter.post('/', (request, response) => {
    const {name,email,password,password2} = request.body; //extraemos el destructury
    console.log(name,email,password,password2);

    //ahora debemos validar, para que no hayan juego para la bd

    if(!name || !email || !password || !password2 ){
        console.log('si') 
        return response.status(400).json({
            error:'Todos los campos son obligatorios'})
        //de esta fomra arroja un error que se llama post 400 bad request
        //nop podran iniciar sesion si falta una elemento y quitan el disabel
        //este msj lo veo en el console del navegador 
        //fidbad al usuario (notificacion)
        
    }else{
        //tener en cuenta que hay que tener la validacion de si el usuario existe en la bd
        //si existe se manda un return, y se manda una notificacion
        //sino existe, se manda

        //GUARDAR EN LA BD //////////////
        let usuario = new User(); //este user es del modelo
        usuario.nombre = name;
        usuario.email =email;
        usuario.password = password;
        usuario.rol = 'user'

        //funcion para enviar eso
        async function guardarUsuario(){
            await usuario.save();
            const usuarios = await User.find() //cosnulta la bd y traete todo el listado
            console.log(usuarios)
        }
        guardarUsuario().catch(console.error)

        return response.status(200).json({
            msg: 'Se ha creado el nuevo usuario'})
    }

}) 

//consultar uno en especifico///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
userRouter.get('/consultar-user',async(req,res)=>{
//tener la lista de todos los usuarios,  hay uno en especifico que tambien seria con un get
//en este caso es uno en especifico, el de abajo el listado
    

})

//consultar la lista de los usuarios///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
userRouter.get('/lista-users',async(req,res)=>{
    try {
        //Como hago esta consulta, entonces:
        const listado= await User.find() //con esto como esta en el mongoose nos traeremos todo el listado
        //para mostrarla hay que retornar
        return res.status(200).json({textOk:true,data:listado})

 
    } catch (error) {
        return res.status(400).json({error:'Error en la consulta total'})
    }
})


//editar usuarios///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
userRouter.post('edit-user',async(req,res)=>{
    try {
        const {name,email,password,password2, id} = req.body; 

        //hacer primero una validacion
        if(!name && !email && !password && !password2){
            return res.status(400).json({error: "Todos los campos son obligatorios"})
        }else{
            const updateUser = await User.findByIdAndUpdate({_id:id},
                {name:name, email:email, password:password})

                await updateUser.save() //Para que se ejecute
                

                return res.status(200).json({msg:'Se ha actualizado los datos correctamente'})
        }


    } catch (error) {
        return res.status(400).json({error:"error"})
    }

})

//eliminar usuario///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
userRouter.post('/eliminar-user',async(req,res)=>{
    const {id} = req.body; //extraer el id
    try{
        //antes de return, hay que eliminarlo de la bd
        const usuario = await User.deleteOne({_id:id}) //luego de tener esto, se hace un return
        return res.status(200).json({msg:'se ha elimindado el usuario de forma correcta'})
    }catch(error){
        return res.status(400).json({error:'Error'})
    }
})
//HACER MAS TARDE OJO EL DEL SERVIDOR


//VERIFICAR EL RESGIRTO ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
userRouter.get('/validar-confiEmail', async (req,res)=>{

    try {
      
      //obtener los parametros de request o sea, de la solicitud que me hicieron
      const {email} = res.param; //desde el fornt, cuando el usuuario se registra, envia una verificacion de correo, y se envia esto
      console.log(email)

      //verificar si el usuario existe aqui
      const usuario = await User.findOne({email:email}) //aqui consulto solo una, por eso el One y el email email, campo del objeto, y que se busca

      if(!usuario){
        res.send('Error: El usuario no esta registrado')

      }else if(usuario.verified){
        res.send('Error: El usuario ya esta verificado') 

      }else{

        //actualizar verificacion
        const actualizarUsuario = await User.findOneAndUpdate({email:email},{verified:true}) //
        await actualizarUsuario.save();

        //redireccionar
        //return res.redirect()
        //FALTA CREAR FRONT DE CONFIRMAR
                //verificar la contraseña
                const  isMatch = await bcrypt.compare(password, usuario.password);

                if (!isMatch) {
                return res.status(400).json({ error: 'Contraseña incorrecta' });
                }

                const newUser = new User({
                id: usuario.id,
                name: usuario.name,
                email: usuario.email,
                rol: usuario.rol,
                });
            }
        }catch(error) {
        res.status(400).json({error:'Error'})
        }
            
})

module.exports = userRouter; //para exportar en otros 