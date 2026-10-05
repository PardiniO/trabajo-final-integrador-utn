import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { pool } from "../config/db";

export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    fecha_registro: string | Date;
    ultimo_acceso: string | Date | null;
}

export type UsuarioInput = Pick<Usuario, 'nombre' | 'email'> & { password: string };

interface UsuarioRow extends RowDataPacket, Usuario {}

export const UsuarioModel = {
    async findAll(): Promise<Usuario[]> {
        const [rows] = await pool.query<UsuarioRow[]>(
            'SELECT id, nombre, email, fecha_registro, ultimo_acceso FROM usuario'
        );
        return rows;
    },

    async findById(id: number): Promise<Usuario | null> {
        const [rows] = await pool.query<UsuarioRow[]>(
            'SELECT id, nombre, email, fecha_registro, ultimo_acceso FROM usuario WHERE id = ?',
            [id]
        );
        return rows[0] ?? null;
    },

    async create(data: UsuarioInput): Promise<Usuario> {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO usuario (nombre, email, password) VALUES (?, ?, ?)',
            [data.nombre, data.email, data.password]
        );
        const [rows] = await pool.query<UsuarioRow[]>(
            'SELECT id, nombre, email, fecha_registro, ultimo_acceso FROM usuario WHERE id = ?',
            [result.insertId]
        );
        if (!rows[0]) throw new Error('No se pudo recuperar el usuario creado');
        return rows[0];
    },

    async update(id: number, data: UsuarioInput): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE usuario SET nombre = ?, email = ?, password = ? WHERE id = ?',
            [data.nombre, data.email, data.password, id]
        );
        return result.affectedRows > 0;
    },

    async remove(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            'DELETE FROM usuario WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    },
};