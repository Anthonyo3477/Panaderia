exports.mostrarCarro = (req, res) => {
    const carro = [];
    res.render('Carro', { carro });
};
