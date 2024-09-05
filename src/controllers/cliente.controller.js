import ClienteDAO from '../dao/cliente.dao.js';
import ClienteDTO from '../dto/cliente.dto.js';

// Resto del código del controlador
import {Client} from '@googlemaps/google-maps-services-js';

const client = new Client({});

class ClienteController {
    static async showForm(req, res) {
        try {
            res.render('personas/add');
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async addCliente(req, res) {
        try {
            const clienteDTO = new ClienteDTO(req.body);
            await ClienteDAO.create(clienteDTO);
            res.redirect('/list');
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async listClientes(req, res) {
        try {
            // Obtener los datos de los clientes desde metodo getAll de ClienteDAO
            const result = await ClienteDAO.getAll();

            // Verificar si no se encontraron datos
            if (result.length === 0) {
                return res.render('index'); // Mostrar la vista index.hbs para crear un nuevo cliente
            }

            // Punto de referencia (puedes cambiar estas coordenadas)
            const puntoReferencia = {
                lat: 4.632613958669109,
                lng: -74.08081778845128,
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

            res.render('personas/list', {clientes: clientesConDistancia});
        } catch (err) {
            console.error('Error en el controlador list:', err);
            res.status(500).json({
                message: 'Error en el servidor, por favor intente más tarde.',
            });
        }
    }
    static async showEditForm(req, res) {
        try {
            const {Cedula} = req.params;
            const cliente = await ClienteDAO.getByCedula(Cedula);

            if (!cliente) {
                return res
                    .status(404)
                    .json({message: 'Cliente no encontrado.'});
            }

            res.render('personas/edit', {cliente});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async editCliente(req, res) {
        try {
            const {Cedula} = req.params;
            const clienteDTO = new ClienteDTO(req.body);
            await ClienteDAO.update(Cedula, clienteDTO);
            res.redirect('/list');
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async deleteCliente(req, res) {
        try {
            const {Cedula} = req.params;
            await ClienteDAO.delete(Cedula);
            res.redirect('/list');
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

export default ClienteController;
