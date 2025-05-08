const db = require('../db/Conexion');

class Pan {
    static getAll(callback) {
        db.query('SELECT * FROM pan', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM pan WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        db.query('INSERT INTO pan SET ?', [data], callback);
    }

    static update(id, data, callback) {
        db.query('UPDATE pan SET ? WHERE id = ?', [data, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM pan WHERE id = ?', [id], callback);
    }
}

module.exports = Pan;
