const con = require('./db/Conexion.js');
const TABLA = "producto";    // este es el nombre de la tabla en la base de datos

// Funcion parta insertar un nuevo registro en la tabla 'producto'
function insertProducto(data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${TABLA} SET ?`
        console.log(query , data)
        con.query(query, data, (err, result) => {
            if (err) {
                return reject(result);
            }
            resolve(result);
        });
    });
}

// Funcion para obtener todos los productos
function getAllProductos(data) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${TABLA}`;
        con.query(query, data, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

// Funcion para obtener un producto por su id
function getProductoById(id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${TABLA} WHERE id = ?`;
        con.query(query, [id], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}
// Funcion para actualizar un producto
function updateProducto(id, nombre, clasidficacion, descripcion, imagen) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE ${TABLA} SET id = ?, nombre = ?, clasidficacion = ?, descripcion = ?, imagen = ?  WHERE id = ?`;
        conssole.log (query);
        con.query(query, [id, nombre, clasidficacion, descripcion, imagen], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}
// Funcion para eliminar un producto

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

module.exports = { insertProducto, getAllProductos, getProductoById, updateProducto, deleteProducto };