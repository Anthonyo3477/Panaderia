const db = require('../db/Conexion');

class Pasteleria {
    static getAll(callback) {
        db.query('SELECT * FROM pasteleria', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM pasteleria WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        db.query('INSERT INTO pasteleria SET ?', [data], callback);
    }

    static update(id, data, callback) {
        db.query('UPDATE pasteleria SET ? WHERE id = ?', [data, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM pasteleria WHERE id = ?', [id], callback);
    }
}

module.exports = Pasteleria;
