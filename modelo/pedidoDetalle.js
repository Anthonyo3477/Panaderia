const db = require('../db/Conexion');

class PedidoDetalle {
  static getAll(callback) {
    db.query('SELECT * FROM pedido_detalle', callback);
  }

  static getByPedidoId(pedidoId, callback) {
    db.query('SELECT * FROM pedido_detalle WHERE pedido_id = ?', [pedidoId], callback);
  }

  static create(data, callback) {
    db.query('INSERT INTO pedido_detalle SET ?', [data], callback);
  }

  static deleteByPedidoId(pedidoId, callback) {
    db.query('DELETE FROM pedido_detalle WHERE pedido_id = ?', [pedidoId], callback);
  }
}

module.exports = PedidoDetalle;
