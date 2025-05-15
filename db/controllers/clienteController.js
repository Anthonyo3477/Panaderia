const conn = require('../db/Conexion');
const TABLA = 'cliente';

function createCliente(cliente) {
    const { nombre, correo, contraseña, telefono, direccion } = cliente;
    return new Promise((resolve, reject) => {
        conn.query(
            `INSERT INTO ${TABLA} (nombre, correo, contraseña, telefono, direccion) VALUES (?, ?, ?, ?, ?)`,
            [nombre, correo, contraseña, telefono, direccion],
            (error, result) => {
                return error ? reject(error) : resolve(result);
            }
        );
    });
}

function getAllClientes() {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT id, nombre, correo, telefono, direccion FROM ${TABLA}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function getClienteById(id) {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT id, nombre, correo, telefono, direccion FROM ${TABLA} WHERE id = ?`, [id], (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        });
    });
}

function getClienteByEmail(correo) {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM ${TABLA} WHERE correo = ?`, [correo], (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        });
    });
}

function updateCliente(id, cliente) {
    const { nombre, correo, telefono, direccion } = cliente;
    return new Promise((resolve, reject) => {
        conn.query(
            `UPDATE ${TABLA} SET nombre = ?, correo = ?, telefono = ?, direccion = ? WHERE id = ?`,
            [nombre, correo, telefono, direccion, id],
            (error, result) => {
                return error ? reject(error) : resolve(result);
            }
        );
    });
}

function updateClientePassword(id, contraseña) {
    return new Promise((resolve, reject) => {
        conn.query(
            `UPDATE ${TABLA} SET contraseña = ? WHERE id = ?`,
            [contraseña, id],
            (error, result) => {
                return error ? reject(error) : resolve(result);
            }
        );
    });
}

function deleteCliente(id) {
    return new Promise((resolve, reject) => {
        conn.query(`DELETE FROM ${TABLA} WHERE id = ?`, [id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

module.exports = {
    createCliente,
    getAllClientes,
    getClienteById,
    getClienteByEmail,
    updateCliente,
    updateClientePassword,
    deleteCliente
};