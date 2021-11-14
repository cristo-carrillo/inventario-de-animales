const animalesCtr = {};
const moment = require('moment');

const Animal = require('../models/Animales');

animalesCtr.renderAnimalForm = (req, res) => {
    
    res.render('animales/new-animal')
};

animalesCtr.createNewAnimal =async (req, res) => {
    const { especie,cantidad,valor,fecha}=req.body;
    const newAnimal = new Animal({especie,cantidad,valor,fecha});
    newAnimal.usuario=req.user.id;
    await newAnimal.save();
    req.flash("success_msg", "Animal agregado satisfactoriamente");
    res.redirect('/animales')
};

animalesCtr.renderanimales = async (req, res) => {
    const animales = await Animal.find({usuario: req.user.id});
    let animal = [];
    animales.forEach(animation => {
        let c ={"_id":animation._id,
        "especie":animation.especie,
        "cantidad":animation.cantidad,
        "valor":animation.valor,
        "fecha":moment(animation.fecha).format("DD/MM/YYYY"),
        "usuario":animation.usuario};
        animal.push(c)
    });
    res.render('animales/all-animales',{animal});
};

animalesCtr.renderEditForm =async (req, res) => {
    const animal= await Animal.findById(req.params.id);
    if (animal.usuario != req.user.id) {
        req.flash("error_msg", "No autorizado.");
        return res.redirect("/animales");
    }
    res.render('animales/edit-animal',{animal,});
};

animalesCtr.updateAnimal =async (req, res) => {
    const{cantidad,valor}=req.body;
    await Animal.findByIdAndUpdate(req.params.id,{cantidad,valor});
    req.flash("success_msg", "Animal actualizado satisfactoriamente");
    res.redirect('/animales');
};

animalesCtr.deleteAnimal=async (req, res) => {
    await Animal.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Animal eliminado satisfactoriamente");
    res.redirect('/animales')
}

module.exports = animalesCtr;


