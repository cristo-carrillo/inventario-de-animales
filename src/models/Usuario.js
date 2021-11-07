const {Schema,model}= require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    correo:{
        type:String,
        required: true
    },
    contrasena:{
        type:String,
        required: true
    }
},{
    timestamps:true
});

UsuarioSchema.methods.encrypContrasena = async contrasena =>{
    const salt = await bcrypt.genSalt(10);
    return await bycrypt.hash(contrasena,salt);
}

UsuarioSchema.methods.matchContrasena =function(contrasena){
    return await bcrypt.compare(contrasena,this.contrasena);
}

module.exports = model('Usuario',UsuarioSchema);