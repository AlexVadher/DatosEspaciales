import {Router} from 'express';
import pool from '../database.js';
import {Client} from '@googlemaps/google-maps-services-js';

const router = Router(); // Inicializar el enrutador de Express para manejar las rutas
const client = new Client({}); // Inicializar el cliente de Google Maps Services

// Ruta para mostrar el formulario de creación de un nuevo cliente
router.get('/add', async (req, res) => {
    try {
        res.render('personas/add');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Insertar los datos en la base de datos de clientes, tabla clientes
router.post('/add', async (req, res) => {
    try {
        const {Cedula, Nombres, Apellidos, Direccion, Ubicacion} = req.body;
        const newCliente = {
            Cedula,
            Nombres,
            Apellidos,
            Direccion,
            Ubicacion,
        };
        await pool.query('INSERT INTO clientes SET ?', [newCliente]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Obtener los datos de los clientes y mostrarlos en la vista de list
router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM clientes');

        // Punto de referencia (puedes cambiar estas coordenadas)
        const puntoReferencia = {
            lat: 4.573907125527651,
            lng: -74.24376995418791,
        };

        // Crear una lista de destinos (coordenadas de los clientes)
        const destinos = result.map((cliente) => cliente.Ubicacion);

        // Llamar a la API de Google Maps para calcular las distancias
        const response = await client.distancematrix({
            params: {
                origins: [`${puntoReferencia.lat},${puntoReferencia.lng}`],
                destinations: destinos,
                key: process.env.API_KEY_GOOGLE_MAPS,
            },
        });

        // Añadir la distancia a cada cliente en la lista de clientes (result) y convertir la distancia a km
        const clientesConDistancia = result.map((cliente, index) => {
            const distancia =
                response.data.rows[0].elements[index].distance.value / 1000; // Convertir a km (la distancia viene en metros)
            return {...cliente, distancia};
        });

        // Ordenar los clientes por distancia (de menor a mayor) y mostrarlos en la vista de list
        clientesConDistancia.sort((a, b) => a.distancia - b.distancia);

        res.render('personas/list', {clientes: clientesConDistancia});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Obtener los datos del cliente por la cédula y mostrarlos en la vista de edit
router.get('/edit/:Cedula', async (req, res) => {
    try {
        const {Cedula} = req.params;
        const [cliente] = await pool.query(
            'SELECT * FROM clientes WHERE Cedula = ?',
            [Cedula],
        );

        if (cliente.length === 0) {
            return res.status(404).json({
                message: 'Algo salió mal, el cliente no existe. status: 404',
            });
        }
        const clienteEdit = cliente[0];
        res.render('personas/edit', {
            cliente: clienteEdit,
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Editar los datos del cliente por la cédula y los datos del formulario
router.post('/edit/:Cedula', async (req, res) => {
    try {
        const {Nombres, Apellidos, Direccion, Ubicacion} = req.body;
        const {Cedula} = req.params;
        const editCliente = {
            Nombres,
            Apellidos,
            Direccion,
            Ubicacion,
        };
        await pool.query('UPDATE clientes SET ? WHERE Cedula = ?', [
            editCliente,
            Cedula,
        ]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Eliminar los datos del cliente por la cédula
router.get('/delete/:Cedula', async (req, res) => {
    try {
        const {Cedula} = req.params;
        await pool.query('DELETE FROM clientes WHERE Cedula = ?', [Cedula]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});
export default router;
