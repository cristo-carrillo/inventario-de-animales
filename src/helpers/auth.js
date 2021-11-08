const helpers = {};

helpers.isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    
    req.flash('error_msg','Debes iniciar sesion')
    res.redirect('/usuarios/signin');
}

module.exports = helpers;