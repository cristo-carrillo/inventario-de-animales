const { Router } = require('express');
const router = Router();

const { renderSignUpForm, renderSigninForm, signup, signin, logout,perfil,updateUsuario,use,renderCorreo,cambiar_password,cambiarPassword } = require('../controllers/usuarios.controller')

const {isAuthenticated} = require('../helpers/auth');

router.get('/usuarios/signup', renderSignUpForm);

router.post("/usuarios/signup", signup);

router.get("/usuarios/signin", renderSigninForm);

router.post("/usuarios/signin", signin);

router.get("/usuarios/logout", logout);

router.get("/usuarios/perfil",isAuthenticated,perfil);


router.put('/usuarios/editPerfil/:id',isAuthenticated,updateUsuario);

router.put('/usuarios/upload/:id',isAuthenticated,use);

router.get('/usuarios/confirmar',renderCorreo);
router.post('/usuarios/cambiarPassword',cambiar_password);
router.put('/usuarios/cambiarPassword',cambiarPassword );


module.exports = router;