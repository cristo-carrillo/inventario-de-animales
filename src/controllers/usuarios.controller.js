const usuariosCtrl = {};

const passport= require('passport');
const Usuario = require('../models/usuario');



usuariosCtrl.renderSignUpForm = (req, res) => {
    res.render('usuarios/signup');
};

usuariosCtrl.signup =async (req, res) => {
    const errors = [];
    const {nombre, correo, contrasena, confirm_contrasena } = req.body;
    if(contrasena != confirm_contrasena) {
        errors.push({ text: "La contraseña no coincide." });
    }
    if (contrasena.length < 4) {
        errors.push({ text: "Ingrese almenos 4 caracteres" });
    }
    if (errors.length > 0) {
        res.render("usuarios/signup", {
        errors,
        nombre,
        correo
        });
    } else {
        
        const correoUsuario = await Usuario.findOne({correo: correo});
        if(correoUsuario){
            req.flash('error_msg','El correo ya existe');
            res.redirect('/usuarios/signup');
        }else{
            const newUsuario=new Usuario({nombre,correo,contrasena});
            newUsuario.contrasena=await newUsuario.encrypContrasena(contrasena);
            await newUsuario.save();
            req.flash('success_msg', 'Te has registrado');
            res.redirect('/usuarios/signin');
        }
    }
};

usuariosCtrl.renderSigninForm = (req, res) => {
    res.render('usuarios/signin');
}

usuariosCtrl.signin = passport.authenticate('local',{
    failureRedirect: '/usuarios/signin',
    successRedirect: '/animales',
    failureFlash: true
});

usuariosCtrl.logout = (req, res) => {
    req.logout();
    req.flash("success_msg", "Has cerrado sesion");
    res.redirect("/usuarios/signin");
}


module.exports = usuariosCtrl;