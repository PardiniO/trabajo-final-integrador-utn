CREATE DATABASE lector_pdf;
USE lector_pdf;

CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    email VARCHAR(254) NOT NULL UNIQUE,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso DATETIME NULL
);

CREATE TABLE IF NOT EXISTS biblioteca (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_biblioteca_usuario
        FOREIGN KEY (id_usuario) REFERENCES usuario(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS carpeta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_biblioteca INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    fecha_creacion  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_carpeta_biblioteca
        FOREIGN KEY (id_biblioteca) REFERENCES biblioteca(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS archivo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_carpeta INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    tipo_archivo VARCHAR(10) NOT NULL CHECK (tipo_archivo = 'pdf'),
    tamano BIGINT NOT NULL CHECK (tamano > 0),
    cantidad_paginas INT NOT NULL CHECK (cantidad_paginas > 0),
    ruta_archivo VARCHAR(255) NOT NULL UNIQUE,
    portada VARCHAR(255) NULL,
    fecha_incorporacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_archivo_usuario
        FOREIGN KEY (id_usuario) REFERENCES usuario(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_archivo_carpeta
        FOREIGN KEY (id_carpeta) REFERENCES carpeta(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS progreso_lectura (
    id_usuario INT NOT NULL,
    id_archivo INT NOT NULL,
    pagina_actual INT NOT NULL DEFAULT 0,
    porcentaje_leido DECIMAL(5,2) NOT NULL DEFAULT 0.00 CHECK (porcentaje_leido BETWEEN 0 AND 100),
    fecha_ultima_lectura DATETIME NULL,
    fecha_finalizacion DATETIME NULL,
    PRIMARY KEY (id_usuario, id_archivo),
    CONSTRAINT fk_progreso_usuario
        FOREIGN KEY (id_usuario) REFERENCES usuario(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_progreso_archivo
        FOREIGN KEY (id_archivo) REFERENCES archivo(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS resaltado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_archivo INT NOT NULL,
    color VARCHAR(15) NOT NULL,
    pagina INT NOT NULL CHECK (pagina > 0),
    texto_resaltado TEXT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    coordenadas TEXT NULL,
    CONSTRAINT fk_resaltado_usuario
        FOREIGN KEY (id_usuario) REFERENCES usuario(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_resaltado_archivo
        FOREIGN KEY (id_archivo) REFERENCES archivo(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS nota (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_archivo INT NOT NULL,
    contenido TEXT NOT NULL,
    pagina INT NOT NULL CHECK (pagina > 0),
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME NULL,
    coordenadas TEXT NULL,
    CONSTRAINT fk_nota_usuario
        FOREIGN KEY (id_usuario) REFERENCES usuario(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_nota_archivo
        FOREIGN KEY (id_archivo) REFERENCES archivo(id)
        ON DELETE CASCADE
);