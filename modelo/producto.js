const db = require('../db/Conexion');

class Producto {
    static getAll(callback) {
        db.query('SELECT * FROM producto', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM producto WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        db.query('INSERT INTO producto SET ?', [data], callback);
    }

    static update(id, data, callback) {
        db.query('UPDATE producto SET ? WHERE id = ?', [data, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM producto WHERE id = ?', [id], callback);
    }
}

module.exports = Producto;
