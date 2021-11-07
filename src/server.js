const express = require('express');
const exphbs = require('express-handlebars');
const handlebars = require('express-handlebars');
const path = require('path');
//inicializaciones
const app = express();


//Configuraciones
app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname , 'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layautsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
//middlewares
app.use(express.urlencoded({extends: false}));


//variables globales


//rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/animales.routes'));


//archivos estaticos
app.use(express.static(path.join(__dirname,'public')));


module.exports = app;