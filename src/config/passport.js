const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuario = require('../models/usuario');

passport.use(new LocalStrategy({
    usernameField: "correo",
    passwordField: 'contrasena'
}, async (correo, contrasena, done) => {
    // coincidir con usuario de correo electrónico
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
        return done(null, false, { message: "El usuario no existe" });
    } else {
        //Coincidir con el usuario de la contraseña
        const match = await usuario.matchContrasena(contrasena);
        if (match) {
            return done(null, usuario);
        } else {
            return done(null, false, { message: "Contraseña incorrecta." });
        }
    }
}));

//guardar en el servidor al usuario si se ha iniciado sesion
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//consulta en la bd si el usuario esta registrado y revisa si tiene permisos para navegar en la pagina
passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, user) => {
        done(err, user);
    })
});