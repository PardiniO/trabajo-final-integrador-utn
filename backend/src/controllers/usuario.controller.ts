import { Request, Response } from "express";
import { UsuarioModel, type UsuarioInput } from "../models/usuario.model";

type IdParams = { id: string };

function parseId(value: string) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

function isUsuarioInput(body: any): body is UsuarioInput {
    return (
        typeof body?.nombre === 'string' && body.nombre.trim() !== '' &&
        typeof body?.email === 'string' && body.email.trim() !== '' &&
        typeof body?.password === 'string' && body.password.trim() !== '' &&
        typeof body?.fecha_registro === 'string' && body.fecha_registro.trim() !== '' &&
        typeof body?.ultimo_acceso === 'string' && body.ultimo_acceso.trim() !== ''
    );
}

export const getAll = async (_req: Request, res: Response) => {
    res.json(await UsuarioModel.findAll());
};

export const getById = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) { res.status(400).json({ error: 'ID inválido' }); return; }

    const usuario = await UsuarioModel.findById(id);
    if (!usuario) { res.status(404).json({ error: ' Usuario no encontrado' }); return; }

    res.json(usuario);
};

export const create = async (req: Request, res: Response) => {
    if (!isUsuarioInput(req.body)) {
        res.status(400).json({
            error: 'Datos inválidos: nombre, email y contraseña son obligatorios',
        });
        return;
    }
    const nuevo = await UsuarioModel.create(req.body);
    res.status(201).json(nuevo);
};

export const update = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) { res.status(400).json({ error: 'ID inválido' }); return; }
    if (!isUsuarioInput(req.body)) {
        res.status(400).json({ error: 'Datos inválidos' }); return;
    }

    const ok = await UsuarioModel.update(id, req.body);
    if (!ok) { res.status(404).json({ error: 'Usuario no encontrado' }); return; }

    res.json({ id, ...req.body });
};

export const remove = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) { res.status(400).json({ error: 'ID inválido' }); return; }

    const ok = await UsuarioModel.remove(id);
    if (!ok) { res.status(404).json({ error: 'Usuario no encontrado' }); return; }

    res.status(204).send();
};