import pool from '../config/database.js';

class ClienteDAO {
    static async create(cliente) {
        await pool.query('INSERT INTO clientes SET ?', [cliente]);
    }

    static async getByCedula(Cedula) {
        const [result] = await pool.query(
            'SELECT * FROM clientes WHERE Cedula = ?',
            [Cedula],
        );
        return result.length ? result[0] : null;
    }

    static async getAll() {
        const [result] = await pool.query('SELECT * FROM clientes');
        return result;
    }

    // Método para buscar un cliente por su cédula (Cedula)
    static async update(Cedula, cliente) {
        await pool.query('UPDATE clientes SET ? WHERE Cedula = ?', [
            cliente,
            Cedula,
        ]);
    }

    static async delete(Cedula) {
        await pool.query('DELETE FROM clientes WHERE Cedula = ?', [Cedula]);
    }
}

export default ClienteDAO;
