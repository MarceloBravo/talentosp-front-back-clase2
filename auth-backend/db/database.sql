USE auth_db;

DROP TABLE IF EXISTS users;

-- CREATE DATABASE IF NOT EXISTS auth_db;

CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    refresh_token text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE(username)
);

INSERT INTO users (username, nombre, apellido, rol, email, password) VALUES ('pedro', 'Pedro', 'Perez', 'admin','pedro@ejmplo.cl','$2b$10$STEOmj1xT6IXiLgxSQNMgud0f4Z2UouCd2AD8TSLprNoIzm3kqUKO');  -- pwd: 321321
INSERT INTO users (username, nombre, apellido, rol, email, password) VALUES ('juana', 'Juana', 'Perez', 'supervisor','juana@ejemplo.cl','$2b$10$UabzEAgiIVL3PlvOMRLZAexkWQgzDXYcbZf2K.g8H1X9kMtc.lRZ2');  -- pwd: 123123
INSERT INTO users (username, nombre, apellido, rol, email, password) VALUES ('Diego123', 'Diego', 'Bravo', 'invitado','diego@ejemplo.cl','$2b$10$I3JJGREoL0SOtxZBRdmxWuYSlsQftIY4N6NYJ8Mkd7ds\bbYfsNky');  -- pwd: 123456

