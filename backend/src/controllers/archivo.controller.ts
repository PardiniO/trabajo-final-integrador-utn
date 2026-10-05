import type { Request, Response } from "express";
import { ArchivoModel, type ArchivoInput } from "../models/archivo.model";

type IdParams = { id: string };
type FolderParams = { id_carpeta: string };
type NameParams = { nombre: string };

function parseId(value: string): number | null {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

function isRecord(body: unknown): body is Record<string, unknown> {
    return typeof body === "object" && body !== null && !Array.isArray(body);
}

function isArchivoInput(body: unknown): body is ArchivoInput {
    if (!isRecord(body)) return false;

    return (
        Number.isInteger(body.id_usuario) && Number(body.id_usuario) > 0 &&
        Number.isInteger(body.id_carpeta) && Number(body.id_carpeta) > 0 &&
        typeof body.nombre === 'string' && body.nombre.trim() !== '' &&
        body.tipo_archivo === 'pdf' &&
        Number.isInteger(body.size) && Number(body.size) > 0 &&
        Number.isInteger(body.cantidad_paginas) && Number(body.cantidad_paginas) > 0 &&
        typeof body.ruta_archivo === 'string' && body.ruta_archivo.trim() !== '' &&
        (body.portada === null || typeof body.portada === 'string') &&
        typeof body.fecha_agregado === 'string' && body.fecha_agregado.trim() !== ''
    );
}

const editableFields = [
    'id_usuario',
    'id_carpeta',
    'nombre',
    'tipo_archivo',
    'size',
    'cantidad_paginas',
    'ruta_archivo',
    'portada',
] as const;

function isArchivoUpdate(body: unknown): body is Partial<ArchivoInput> {
    if (!isRecord(body)) return false;

    const fields = Object.keys(body);
    if (fields.length === 0 || !fields.every((field) => editableFields.includes(field as typeof editableFields[number]))) {
        return false;
    }

    return fields.every((field) => {
        const value = body[field];
        switch (field) {
            case 'id_usuario':
            case 'id_carpeta':
                return Number.isInteger(value) && Number(value) > 0;
            case 'nombre':
            case 'ruta_archivo':
                return typeof value === 'string' && value.trim() !== '';
            case 'tipo_archivo':
                return value === 'pdf';
            case 'size':
            case 'cantidad_paginas':
                return Number.isInteger(value) && Number(value) > 0;
            case 'portada':
                return value === null || typeof value === 'string';
            default:
                return false;
        }
    });
}

export const getAll = async (_req: Request, res: Response) => {
    res.json(await ArchivoModel.findAll());
};

export const getById = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) { res.status(400).json({ error: 'ID inválido' }); return; }

    const archivo = await ArchivoModel.findById(id);
    if (!archivo) { res.status(404).json({ error: 'Archivo no encontrado' }); return; }

    res.json(archivo);
};

export const getByName = async (req: Request<NameParams>, res: Response) => {
    const archivo = await ArchivoModel.findByName(req.params.nombre);
    if (!archivo) { res.status(404).json({ error: 'Archivo no encontrado' }); return; }

    res.json(archivo);
};

export const listByFolder = async (req: Request<FolderParams>, res: Response) => {
    const idCarpeta = parseId(req.params.id_carpeta);
    if (!idCarpeta) { res.status(400).json({ error: 'ID de carpeta inválido' }); return; }

    res.json(await ArchivoModel.findByFolder(idCarpeta));
};

export const create = async (req: Request, res: Response) => {
    if (!isArchivoInput(req.body)) {
        res.status(400).json({ error: 'Datos inválidos para crear el archivo' });
        return;
    }

    res.status(201).json(await ArchivoModel.create(req.body));
};

export const update = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) { res.status(400).json({ error: 'ID inválido' }); return; }
    if (!isArchivoUpdate(req.body)) {
        res.status(400).json({ error: 'Datos inválidos para actualizar el archivo' });
        return;
    }

    const updated = await ArchivoModel.update(id, req.body);
    if (!updated) {
        const unchanged = await ArchivoModel.findById(id);
        if (!unchanged) { res.status(404).json({ error: 'Archivo no encontrado' }); return; }
        res.json(unchanged);
        return;
    }

    const archivo = await ArchivoModel.findById(id);
    if (!archivo) { res.status(404).json({ error: 'Archivo no encontrado' }); return; }
    res.json(archivo);
};

export const remove = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) { res.status(400).json({ error: 'ID inválido' }); return; }

    const removed = await ArchivoModel.remove(id);
    if (!removed) { res.status(404).json({ error: 'Archivo no encontrado' }); return; }

    res.status(204).send();
};
