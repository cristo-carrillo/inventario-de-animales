const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');
const methodOverride = require('method-override');
const moment = require('moment');
const flash = require('connect-flash');
const session = require('express-session');
const passport= require('passport');
const multer= require('multer');
const { v4: uuidv4 } = require('uuid');
//inicializaciones
const app = express();
require('./config/passport');

//Configuraciones
app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname , 'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layautsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname: '.hbs',
    handlebars : allowInsecurePrototypeAccess(Handlebars)
}));

app.set('view engine', '.hbs');
//middlewares

app.use(express.urlencoded({extends: false}));
app.use(express.json())
app.use(methodOverride('_method'));
const storage=multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename:(req,file,cb,filename)=>{
        cb(null,uuidv4()+path.extname(file.originalname));
    }
});
app.use(multer({
    storage:storage
}).single('image'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.usuario = req.user || null;
    next();
});

//rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/animales.routes'));
app.use(require('./routes/usuarios.routes'));
app.use(require('./routes/gastos.routes'));
app.use(require('./routes/ventas.routes'));
//archivos estaticos
app.use(express.static(path.join(__dirname,'public')));


module.exports = app;