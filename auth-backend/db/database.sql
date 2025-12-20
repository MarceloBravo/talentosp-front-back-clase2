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

INSERT INTO users (username, nombre, apellido, rol, email, password) VALUES ('pedro', 'Pedro', 'Perez', 'admin','pedro@ejmplo.cl','$2b$10$sGP1LnzggHxN26WeqX7rpeYzj3EYoIk8dHyveMIdqrr3kCc2mYBAO');
INSERT INTO users (username, nombre, apellido, rol, email, password) VALUES ('juana', 'Juana', 'Perez', 'supervisor','juana@ejemplo.cl','$2b$10$sGP1LnzggHxN26WeqX7rpeYzj3EYoIk8dHyveMIdqrr3kCc2mYBAO');
INSERT INTO users (username, nombre, apellido, rol, email, password) VALUES ('Marcelo', 'Marcelo', 'Bravo', 'invitado','marcelo@ejemplo.cl','$2b$10$eYnp1aIuAyzg1iOyb1lav.pV6uUXnWxxEVrTRq4PDjsLxfRCDehbC');

