import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { pool } from "../config/db";

export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    password: string;
    fecha_registro: string | Date;
    ultimo_acceso: string | Date;
}

export type UsuarioInput = Omit<Usuario, 'id'>;

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
            'INSERT INTO usuario (nombre, email, password, fecha_registro, ultimo_acceso) VALUES (?, ?, ?, ?, ?)',
            [data.nombre, data.email, data.password, data.fecha_registro, data.ultimo_acceso]
        );
        return { id: result.insertId, ...data };
    },

    async update(id: number, data: UsuarioInput): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE usuario SET nombre = ?, email = ?, password = ?, ultimo_acceso = ? WHERE id = ?',
            [data.nombre, data.email, data.password, data.ultimo_acceso, id]
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