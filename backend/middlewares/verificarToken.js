const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const cabecera = req.headers['authorization'];
    if (!cabecera || !cabecera.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Falta el token' });
    }

    const token = cabecera.slice(7);
    try {
        req.usuario = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return  res.status(401).json({ error: 'Token inválido o vencido' });
    }
}

module.exports = verificarToken;