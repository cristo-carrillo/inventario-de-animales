const gastosCtr = {};
const moment = require('moment');

const Gasto = require('../models/Gastos');

gastosCtr.renderGastoForm = (req, res) => {
    const id = req.params.id;
    res.render('gastos/new-gasto',{id})
};

gastosCtr.createNewGasto =async (req, res) => {
    const { especie,cantidad,valor,fecha,descripcion}=req.body;
    const newGasto= new Gasto({especie,cantidad,valor,fecha,descripcion});
    await newGasto.save();
    req.flash("success_msg", "Gasto agregado satisfactoriamente");
    res.redirect('/animales')
};

gastosCtr.renderGastos = async (req, res) => {
    const gastos = await Gasto.find({especie: req.params.id});
    let gasto = [];
    gastos.forEach(animation => {
        let c ={"_id":animation._id,
        "especie":animation.especie,
        "cantidad":animation.cantidad,
        "valor":animation.valor,
        "fecha":moment(animation.fecha).utc().format('MM/DD/YYYY'),
        "descripcion":animation.descripcion};
        gasto.push(c)
    });
    res.render('gastos/all-gastos',{gasto});
};

gastosCtr.renderEditForm =async (req, res) => {
    const gasto= await Gasto.findById(req.params.id);
    res.render('gastos/edit-gasto',{gasto,});
};

gastosCtr.updateGasto =async (req, res) => {
    const{cantidad,valor}=req.body;
    await Gasto.findByIdAndUpdate(req.params.id,{cantidad,valor});
    req.flash("success_msg", "Gasto actualizado satisfactoriamente");
    res.redirect('/gastos/'+req.body.especie);
};

gastosCtr.deleteGasto=async (req, res) => {
    await Gasto.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Gasto eliminado satisfactoriamente");
    res.redirect('/gastos/'+req.body.especie);
};

module.exports = gastosCtr;


