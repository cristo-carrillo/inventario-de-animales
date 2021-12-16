const {Schema, model} = require('mongoose');

const GastoSchema = new Schema({ 
    especie:{
        type:String,
        required:true
    },
    cantidad:{
        type: Number,
        required:true
    },
    valor:{
        type: Number,
        required:true
    },
    fecha:{
        type:Date,
        required:true
    },
    descripcion: {
        type: String,
        required: true
    }
});

module.exports = model('Gasto',GastoSchema);