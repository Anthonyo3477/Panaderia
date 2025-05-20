// db/controllers/productoController.js
const con = require('../Conexion.js');
const TABLA = "producto";



// Insertar nuevo producto
function insertProducto(data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${TABLA} SET ?`;
        con.query(query, data, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}

// Obtener todos los productos
function getAllProductos() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${TABLA}`;
        con.query(query, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

// Obtener producto por ID
function getProductoById(id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${TABLA} WHERE id = ?`;
        con.query(query, [id], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result[0]);
        });
    });
}

// Actualizar producto
function updateProducto(id, data) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE ${TABLA} SET ? WHERE id = ?`;
        con.query(query, [data, id], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

// Eliminar producto
function deleteProducto(id) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM ${TABLA} WHERE id = ?`;
        con.query(query, [id], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

module.exports = {
    insertProducto,
    getAllProductos,
    getProductoById,
    updateProducto,
    deleteProducto
};