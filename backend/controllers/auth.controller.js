const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

async function registrar(req, res) {
    const { nombre, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ nombre, email, password: hash });
    res.status(201).json({ id: usuario.id, nombre: usuario.nombre, email: usuario.email });
}

module.exports = { registrar };