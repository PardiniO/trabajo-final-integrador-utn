const Usuario = require('../models/Usuario');

async function registrar(req, res) {
    const { nombre, email, password } = req.body;
    const usuario = await Usuario.create({ nombre, email, password });
    res.status(201).json({ id: usuario.id, nombre: usuario.nombre, email: usuario.email });
}

module.exports = { registrar };