import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { pool } from "../config/db";

export interface Archivo {
    id: number;
    id_usuario: number;
    id_carpeta: number;
    nombre: string;
    tipo_archivo: string;
    size: number;
    cantidad_paginas: number;
    ruta_archivo: string;
    portada: string | null;
    fecha_agregado: string | Date;
}

export type ArchivoInput = Omit<Archivo, 'id'>;

type ArchivoRow = RowDataPacket & Archivo;

export const ArchivoModel = {
    async findAll(): Promise<Archivo[]> {
        const [rows] = await pool.query<ArchivoRow[]>(
            'SELECT id, id_usuario, id_carpeta, nombre, tipo_archivo, size, cantidad_paginas, ruta_archivo, portada, fecha_agregado FROM archivo'
        );
        return rows as Archivo[];
    },

    async findById(id: number): Promise<Archivo | null> {
        const [rows] = await pool.query<ArchivoRow[]>(
            'SELECT id, id_usuario, id_carpeta, nombre, tipo_archivo, size, cantidad_paginas, ruta_archivo, portada, fecha_agregado FROM archivo WHERE id = ?',
            [id]
        );
        return (rows as Archivo[])[0] ?? null;
    },

    async findByName(nombre: string): Promise<Archivo | null> {
        const [rows] = await pool.query<ArchivoRow[]>(
            'SELECT id, id_usuario, id_carpeta, nombre, tipo_archivo, size, cantidad_paginas, ruta_archivo, portada, fecha_agregado FROM archivo WHERE nombre = ?',
            [nombre]
        );
        return (rows as Archivo[])[0] ?? null;
    },

    async findByFolder(idCarpeta: number): Promise<Archivo[]> {
        const [rows] = await pool.query<ArchivoRow[]>(
            'SELECT id, id_usuario, id_carpeta, nombre, tipo_archivo, size, cantidad_paginas, ruta_archivo, portada, fecha_agregado FROM archivo WHERE id_carpeta = ?',
            [idCarpeta]
        );
        return rows as Archivo[];
    },

    async create(data: ArchivoInput): Promise<Archivo> {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO archivo (id_usuario, id_carpeta, nombre, tipo_archivo, size, cantidad_paginas, ruta_archivo, portada) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [data.id_usuario, data.id_carpeta, data.nombre, data.tipo_archivo, data.size, data.cantidad_paginas, data.ruta_archivo, data.portada]
        );
        return { id: result.insertId, ...data } as Archivo;
    },

    async update(id: number, data: Partial<ArchivoInput>): Promise<boolean> {
        const fields: string[] = [];
        const values: Array<number | string | null> = [];

        if (data.id_usuario !== undefined) { fields.push('id_usuario = ?'); values.push(data.id_usuario); }
        if (data.id_carpeta !== undefined) { fields.push('id_carpeta = ?'); values.push(data.id_carpeta); }
        if (data.nombre !== undefined) { fields.push('nombre = ?'); values.push(data.nombre); }
        if (data.tipo_archivo !== undefined) { fields.push('tipo_archivo = ?'); values.push(data.tipo_archivo); }
        if (data.size !== undefined) { fields.push('size = ?'); values.push(data.size); }
        if (data.cantidad_paginas !== undefined) { fields.push('cantidad_paginas = ?'); values.push(data.cantidad_paginas); }
        if (data.ruta_archivo !== undefined) { fields.push('ruta_archivo = ?'); values.push(data.ruta_archivo); }
        if (data.portada !== undefined) { fields.push('portada = ?'); values.push(data.portada); }

        if (fields.length === 0) return false;

        const sql = `UPDATE archivo SET ${fields.join(', ')} WHERE id = ?`;
        values.push(id);

        const [result] = await pool.query<ResultSetHeader>(sql, values);
        return result.affectedRows > 0;
    },

    async remove(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            'DELETE FROM archivo WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    },
};