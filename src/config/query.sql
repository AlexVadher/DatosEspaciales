CREATE DATABASE DatosEspaciales;
USE datosespaciales;
CREATE TABLE clientes (
    Cedula INT PRIMARY KEY,
    Nombres VARCHAR(255),
    Apellidos VARCHAR(255),
    Direccion TEXT,
    Ubicacion TEXT
);
