const {Schema,model}= require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    correo:{
        type:String,
        required: true,
        unique: true
    },
    contrasena:{
        type:String,
        required: true
    },
    telefono:{
        type:String,
        required: true
    },
    image:{
        type:String
    }
},{
    timestamps:true
});

UsuarioSchema.methods.encrypContrasena = async contrasena =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(contrasena,salt);
}

UsuarioSchema.methods.matchContrasena =async function(contrasena){
    return await bcrypt.compare(contrasena,this.contrasena);
}

module.exports = model('Usuario',UsuarioSchema);