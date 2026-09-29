const Archivo = require('../models/Archivo');
const verificarToken = require('../middlewares/verificarToken');


async function crearArchivo(req, res) {
    try {
        const { nombre, id_carpeta, cantidad_paginas, size } = req.body;

        if (!nombre || !id_carpeta) {
            return res.status(400).json({ error: '' })
        }

        const nuevoArchivo = await Archivo.create({
            nombre, id_carpeta, cantidad_paginas, size,
            ruta_archivo: req.file ? req.file.path : 'uploads/default.pdf'
        });

        res.status(201).json(nuevoArchivo);
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar el archivo' });
    }
}

async function obtenerPorNombre(req, res) {
    try {
        const { nombre } = req.body;
        const archivo = await Archivo.findOne(nombre);

        if (!archivo) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }

        res.json(archivo);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar el archivo' });
    }
}

async function listarPorCarpeta(req, res) {
    try {
        const { id_carpeta } = req.params;
        const archivos = await Archivo.findAll({ where: { id_carpeta } });
        res.json(archivos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los archivos de las carpetas' });
    }
}

async function eliminarArchivo(req, res) {
    try {
        const { id } = req.params;
        const archivo = await Archivo.findByPk(id);

        if (!archivo) return res.status(404).json({ error: 'Archivo no encontrado' });
        
        await archivo.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el archivo' });
    }
}

module.exports = {
    crearArchivo,
    obtenerPorNombre,
    eliminarArchivo,
    listarPorCarpeta
};