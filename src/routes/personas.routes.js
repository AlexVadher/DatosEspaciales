import {Router} from 'express';
import pool from '../database.js';

const router = Router();

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
        res.render('personas/list', {clientes: result});
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
