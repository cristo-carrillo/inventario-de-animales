const {Schema, model} = require('mongoose');

const AnimalSchema = new Schema({ 
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
    }
});

module.exports = model('Animal',AnimalSchema);