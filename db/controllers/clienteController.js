const con = require('../Conexion.js');
const TABLA = "cliente";

// Insertar un nuevo cliente
function insert(data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${TABLA} SET ?`;
        con.query(query, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

// Obtener todos los clientes
function getAll() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${TABLA}`;
        con.query(query, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

// Obtener cliente por ID
function getById(id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${TABLA} WHERE id = ?`;
        con.query(query, [id], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
        });
    });
}

// Actualizar cliente
function update(id, data) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE ${TABLA} SET ? WHERE id = ?`;
        con.query(query, [data, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

// Eliminar cliente
function remove(id) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM ${TABLA} WHERE id = ?`;
        con.query(query, [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    insert,
    getAll,
    getById,
    update,
    remove
};
