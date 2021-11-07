const animalesCtr = {};


animalesCtr.renderAnimalForm = (req, res) => {
    res.render('animales/new-animal')
};

animalesCtr.createNewAnimal = (req, res) => {
    console.log(req.body);
    res.send('animal add')
};

animalesCtr.renderanimales = (req, res) => {
    res.send('render animales')
};

animalesCtr.renderEditForm = (req, res) => {
    res.send('render edit form')
};

animalesCtr.updateAnimal = (req, res) => {
    res.send('update animal')
};

animalesCtr.deleteAnimal= (req, res) => {
    res.send('delete animal')
}

module.exports = animalesCtr;