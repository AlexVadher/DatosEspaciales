# Sistema de Información de Estudiantes - Datos Espaciales

## Descripción

Este proyecto es un Sistema de Información multicapa que permite registrar y gestionar la información de estudiantes, incluyendo su datos espaciales utilizando la API de Google Maps. El objetivo principal es comparar la ubicación de los estudiantes con respecto a la universidad y realizar un CRUD de los datos de los estudiantes.

El proyecto está desarrollado con Node.js, Express, Handlebars para el frontend y sigue los patrones de diseño DAO, DTO, y Singleton. Los datos son almacenados en una base de datos MySQL.


## Funcionalidades

- CRUD de Estudiantes: Registrar, visualizar, editar y eliminar estudiantes.
- Datos espaciales: Utilizar Google Maps para seleccionar la ubicación (latitud y longitud) de los estudiantes.
- Ordenar por Distancia: Visualizar una lista de estudiantes organizados por distancia a partir de un punto de referencia (por ejemplo, la universidad).

## Estructura del Proyecto

```
src/
│
├── config/
│   ├── database.js          # Configuración de la conexión a la base de datos
│   └── query.sql            # Consultas SQL utilizadas en el sistema
│
├── controllers/
│   └── cliente.controller.js # Controlador que maneja la lógica de negocio de los estudiantes
│
├── dao/
│   └── cliente.dao.js       # Acceso a los datos, comunicación con la base de datos
│
├── dto/
│   └── cliente.dto.js       # Transferencia de datos, definición de los objetos cliente
│
├── public/
│   ├── css/                 # Archivos CSS para el diseño
│   └── img/                 # Imágenes del proyecto (logotipos, etc.)
│
├── routes/
│   └── clientes.routes.js   # Definición de rutas para las operaciones de estudiantes
│
├── views/
│   ├── layouts/
│   │   └── main.hbs         # Layout principal para las vistas de Handlebars
│   ├── partials/
│   │   └── navigation.hbs   # Parcial de navegación
│   └── personas/
│       ├── add.hbs          # Vista para añadir un nuevo estudiante
│       ├── edit.hbs         # Vista para editar un estudiante
│       └── list.hbs         # Vista para listar los estudiantes
│   └── index.hbs            # Página principal del proyecto
│
└── index.js                 # Punto de entrada del servidor
```

## Requisitos Previos
- Node.js v14 o superior
- MySQL v8 o superior
- Google Maps API Key (para la funcionalidad de geolocalización)

## Instalación
1. Clona el repositorio:
```bash
git clone https://github.com/AlexVadher/DatosEspaciales.git
cd DatosEspaciales
```
2. Instala las dependencias:
```bash
npm install
```
3. Configura la base de datos en src/config/database.js:
```javascript
const pool = mysql.createPool({
    host: 'localhost',
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'tu_base_de_datos'
});
```
4. Añade tu API Key de Google Maps en las vistas correspondientes (views/personas/add.hbs y views/personas/edit.hbs).

5. Ejecuta el servidor:
```bash
npm start
```
6. Accede a la aplicación en http://localhost:3000.

## Uso

### Añadir un Estudiante
- Navega a http://localhost:3000/clientes/add.
- Introduce los datos del estudiante (cédula, nombre, apellidos, dirección).
- Utiliza la interfaz de Google Maps para marcar la ubicación del estudiante.
- Guarda el estudiante.

### Visualizar y Editar Estudiantes
- Ve a http://localhost:3000/clientes.
- Verás una lista de los estudiantes registrados.
- Haz clic en Editar para modificar la información de un estudiante o en Eliminar para eliminarlo.

### Ordenar Estudiantes por Distancia
- Introduce un punto de referencia (latitud y longitud) para ordenar la lista de estudiantes por distancia.

## Tecnologías Utilizadas
- Node.js: Plataforma de desarrollo.
- Express: Framework para construir aplicaciones web.
- Handlebars: Motor de plantillas para la interfaz de usuario.
- MySQL: Base de datos relacional para el almacenamiento de datos.
- Google Maps API: Para geolocalización y mapas interactivos.
- Patrones de Diseño: DAO, DTO.