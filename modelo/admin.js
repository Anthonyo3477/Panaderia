const db = require('../db/Conexion');

class Admin {
    static getAll(callback) {
        db.query('SELECT * FROM admin', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM admin WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        db.query('INSERT INTO admin SET ?', [data], callback);
    }

    static update(id, data, callback) {
        db.query('UPDATE admin SET ? WHERE id = ?', [data, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM admin WHERE id = ?', [id], callback);
    }
}

module.exports = Admin;
