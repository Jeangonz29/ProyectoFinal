
const User = require('../models/user');

const userRouter = require('express').Router();
 
userRouter.post('/', (request, response) => {
    const {name,email,password,password2} = request.body; 
    console.log(name,email,password,password2);

    if(!name || !email || !password || !password2 ){
        console.log('si') 
        return response.status(400).json({
            error:'Todos los campos son obligatorios'})
        
    }else{
        let usuario = new User(); 
        usuario.nombre = name;
        usuario.email =email;
        usuario.password = password;

        async function guardarUsuario(){
            await usuario.save();
            const usuarios = await User.find() 
            console.log(usuarios)
        }
        guardarUsuario().catch(console.error)

        return response.status(200).json({
            msg: 'Se ha creado el nuevo usuario'})
    }

}) 
userRouter.get('/consultar-user',async(req,res)=>{
    
})

userRouter.get('/lista-users',async(req,res)=>{
    try {
        const listado= await User.find() 
        return res.status(200).json({textOk:true,data:listado})

 
    } catch (error) {
        return res.status(400).json({error:'Error en la consulta total'})
    }
})


userRouter.post('edit-user',async(req,res)=>{
    try {
        const {name,email,password,password2, id} = req.body; 

        
        if(!name && !email && !password && !password2){
            return res.status(400).json({error: "Todos los campos son obligatorios"})
        }else{
            const updateUser = await User.findByIdAndUpdate({_id:id},
                {name:name, email:email, password:password})

                await updateUser.save() 
                

                return res.status(200).json({msg:'Se ha actualizado los datos correctamente'})
        }


    } catch (error) {
        return res.status(400).json({error:"error"})
    }

})

userRouter.post('/eliminar-user',async(req,res)=>{
    const {id} = req.body; 
    try{
        const usuario = await User.deleteOne({_id:id})
        return res.status(200).json({msg:'se ha elimindado el usuario de forma correcta'})
    }catch(error){
        return res.status(400).json({error:'Error'})
    }
})

userRouter.get('/validar-confiEmail', async (req,res)=>{

    try {
      
      const {email} = res.param; 
       console.log(email)

      const usuario = await User.findOne({email:email}) 
      if(!usuario){
        res.send('Error: El usuario no esta registrado')

      }else if(usuario.verified){
        res.send('Error: El usuario ya esta verificado') 

      }else{

        const actualizarUsuario = await User.findOneAndUpdate({email:email},{verified:true}) //
        await actualizarUsuario.save();
      }

    } catch (error) {
      console.log(error);
    }
})


module.exports = userRouter; //para exportar en otros 