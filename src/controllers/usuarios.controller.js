const usuariosCtrl = {};

const passport = require('passport');
const Usuario = require('../models/usuario');



usuariosCtrl.renderSignUpForm = (req, res) => {
    res.render('usuarios/signup');
};

usuariosCtrl.signup = async (req, res) => {
    const errors = [];
    const { nombre, correo, telefono, contrasena, confirm_contrasena } = req.body;
    if (contrasena != confirm_contrasena) {
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

        const correoUsuario = await Usuario.findOne({ correo: correo });
        if (correoUsuario) {
            req.flash('error_msg', 'El correo ya existe');
            res.redirect('/usuarios/signup');
        } else {
            const newUsuario = new Usuario({ nombre, correo, contrasena, telefono });
            newUsuario.contrasena = await newUsuario.encrypContrasena(contrasena);
            await newUsuario.save();
            req.flash('success_msg', 'Te has registrado');
            res.redirect('/usuarios/signin');
        }
    }
};

usuariosCtrl.renderSigninForm = (req, res) => {
    res.render('usuarios/signin');
}

usuariosCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/usuarios/signin',
    successRedirect: '/animales',
    failureFlash: true
});

usuariosCtrl.logout = (req, res) => {
    req.logout();
    req.flash("success_msg", "Has cerrado sesion");
    res.redirect("/usuarios/signin");
}

usuariosCtrl.perfil = (req, res) => {
    res.render("usuarios/perfil");
};




usuariosCtrl.updateUsuario = async (req, res) => {
    const { nombre, correo, telefono } = req.body;
    await Usuario.findByIdAndUpdate(req.params.id, { nombre, correo, telefono });
    req.flash("success_msg", "Usuario actualizado satisfactoriamente");
    res.redirect('/usuarios/perfil');
};

usuariosCtrl.use = async (req, res) => {
    console.log(req.file);
    const image = '/img/uploads/' + req.file.filename;
    await Usuario.findByIdAndUpdate(req.params.id, { image: image });
    req.flash("success_msg", "Usuario actualizado satisfactoriamente");
    res.redirect('/usuarios/perfil');
};
usuariosCtrl.renderCorreo = async (req, res) => {
    res.render('usuarios/confirmarCorreo');
};

usuariosCtrl.cambiar_password = async (req, res) => {
    const { correo } = req.body;
    const usuario = await Usuario.find({ correo: correo }, { _id: 1 });
    if (usuario.length > 0) {
        res.render('usuarios/cambiarPassword', usuario[0]);
    } else {
        req.flash('error_msg', 'El correo no existe');
        res.redirect('/usuarios/signup');
    }

};

usuariosCtrl.cambiarPassword = async (req, res) => {
    const { _id, contrasena, confirm_contrasena } = req.body;
    if (contrasena == confirm_contrasena) {
        const newUsuario = new Usuario({ contrasena });
        const contra = await newUsuario.encrypContrasena(contrasena);
        await Usuario.findByIdAndUpdate(_id, { contrasena:contra });
        req.flash("success_msg", "Has Cambiado tu contraseña");
        res.redirect('/usuarios/signin');
    } else {
        let usuario = []
        let c = {
            '_id': _id
        };
        usuario.push(c);
        req.flash('error_msg', 'la contraseña no coincide');
        res.render('usuarios/cambiarPassword', usuario[0])
    }
};
module.exports = usuariosCtrl;