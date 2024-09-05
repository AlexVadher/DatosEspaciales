-- Crear la base de datos
CREATE DATABASE Prueba01;

-- Usar la base de datos creada
USE Prueba01;

-- Crear la tabla Tipo_Persona
CREATE TABLE Tipos_Personas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL
);

-- Crear la tabla Personas
CREATE TABLE Personas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    age INT,
    tipo_persona_id INT,
    FOREIGN KEY (tipo_persona_id) REFERENCES Tipos_Personas(id)
);

-- Insertar ejemplos en la tabla Tipo_Persona
INSERT INTO Tipos_Personas (tipo) VALUES ('Administrativo');
INSERT INTO Tipos_Personas (tipo) VALUES ('Estudiante');
INSERT INTO Tipos_Personas (tipo) VALUES ('Docente');

-- Insertar ejemplos en la tabla Personas
INSERT INTO Personas (name, lastname, age, tipo_persona_id) 
VALUES ('Juan', 'Pérez', 30, 1);
INSERT INTO Personas (name, lastname, age, tipo_persona_id) 
VALUES ('María', 'López', 22, 2);
INSERT INTO Personas (name, lastname, age, tipo_persona_id) 
VALUES ('Carlos', 'Gómez', 40, 3);

-- Consultar todas las personas mostrando también el tipo de persona
SELECT p.id, p.name, p.lastname, p.age, tp.tipo AS tipo_persona
FROM Personas p
JOIN Tipos_Personas tp ON p.tipo_persona_id = tp.id;