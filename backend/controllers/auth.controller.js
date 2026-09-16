const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

async function registrar(req, res) {
    const { nombre, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ nombre, email, password: hash });
    res.status(201).json({ id: usuario.id, nombre: usuario.nombre, email: usuario.email });
}

async function login(req, res) {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email }});
    if (!usuario) return res.status(401).json({ error: 'Credenciales inválidas' });

    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign(
        { id: usuario.id, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    res.json({ token });
}

module.exports = { registrar, login };