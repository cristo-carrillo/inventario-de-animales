const mongoose = require('mongoose');

const { NAME_HOST,NAME_DATABASE }=process.env;
const URL_CONECTION = `mongodb://${NAME_HOST}/${NAME_DATABASE}`;
mongoose.connect(URL_CONECTION,{
    useUnifiedTopology: true,
    useNewUrlParser:true
}).then(db => console.log('Conectado a la base de datos'))
.catch(err => console.log(err));