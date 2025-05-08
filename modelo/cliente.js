const db = require('../db/Conexion');

class Cliente {
    static getAll(callback) {
        db.query('SELECT * FROM cliente', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM cliente WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        db.query('INSERT INTO cliente SET ?', [data], callback);
    }

    static update(id, data, callback) {
        db.query('UPDATE cliente SET ? WHERE id = ?', [data, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM cliente WHERE id = ?', [id], callback);
    }
}

module.exports = Cliente;
