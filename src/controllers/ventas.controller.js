const ventasCtr = {};
const moment = require('moment');

const Venta = require('../models/Ventas');
const Animal = require('../models/Animales')
ventasCtr.renderVentaForm = (req, res) => {
    const parametros = {
        "id": req.params.id,
        "cantidad": req.params.cantidad
    }
    res.render('ventas/new-venta', { parametros })
};

ventasCtr.createNewVenta = async (req, res) => {
    const { especie, cantidad, kilos, valor, fecha } = req.body;
    const animal = await Animal.find({ _id: especie }, { cantidad: 1, _id: 0 });
    const venta = await Venta.find({ especie: especie }, { cantidad: 1, _id: 0 });
    let can = parseInt(cantidad) + calcular(venta);
    if (cantidad > 0 && can <= animal[0].cantidad) {
        const newVenta = new Venta({ especie, cantidad, kilos, valor, fecha });
        await newVenta.save();
        req.flash("success_msg", "Venta agregada satisfactoriamente");
    } else {
        req.flash("error_msg", "La cantidad de animales vendidos excede los limites");
    }
    res.redirect('/animales')

};
function calcular(especie) {
    let canti = 0;
    if (especie.length > 0) {
        especie.forEach(animation => {
            canti += animation.cantidad;
        });
    }
    return canti;
}

ventasCtr.renderVentas = async (req, res) => {
    const ventas = await Venta.find({ especie: req.params.id });
    const animal = await Animal.find({ _id: req.params.id}, { especie: 1, _id: 0 });
    let venta = [];
    ventas.forEach(animation => {
        let c = {
            "_id": animation._id,
            "especie":animation.especie,
            "nombre": animal[0].especie,
            "cantidad": animation.cantidad,
            "kilos":animation.kilos,
            "valor":animation.valor,
            "total": new Intl.NumberFormat('es-ES', {style: 'currency',currency: 'COP', minimumFractionDigits: 0}).format(animation.valor*animation.kilos),
            "fecha": moment(animation.fecha).utc().format('MM/DD/YYYY')
        };
        venta.push(c)
    });
    res.render('ventas/all-ventas', { venta,animal:animal[0] });
};

module.exports = ventasCtr;
