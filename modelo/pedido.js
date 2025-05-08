const db = require('../db/Conexion');

class Pedido {
    static getAll(callback) {
        db.query('SELECT * FROM pedido', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM pedido WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        db.query('INSERT INTO pedido SET ?', [data], callback);
    }

    static update(id, data, callback) {
        db.query('UPDATE pedido SET ? WHERE id = ?', [data, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM pedido WHERE id = ?', [id], callback);
    }
}

module.exports = Pedido;
