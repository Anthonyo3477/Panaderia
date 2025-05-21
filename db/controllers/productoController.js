const db = require('../Conexion'); // Asegúrate de que tu archivo de conexión esté correctamente exportado

module.exports = {
    // Obtener todos los productos
    getAllProductos: async () => {
        const [rows] = await db.execute('SELECT * FROM productos');
        return rows;
    },

    // Obtener un producto por ID
    getProductoById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM productos WHERE id = ?', [id]);
        return rows;
    },

    // Insertar producto
    insertProducto: async (producto) => {
        const { nombre, clasificacion, descripcion, imagen } = producto;
        const [result] = await db.execute(
            'INSERT INTO productos (nombre, clasificacion, descripcion, imagen) VALUES (?, ?, ?, ?)',
            [nombre, clasificacion, descripcion, imagen]
        );
        return result;
    },

    // Actualizar producto
    updateProducto: async (id, nombre, clasificacion, descripcion, imagen) => {
        let query = 'UPDATE productos SET nombre = ?, clasificacion = ?, descripcion = ?';
        const params = [nombre, clasificacion, descripcion];

        if (imagen) {
            query += ', imagen = ?';
            params.push(imagen);
        }

        query += ' WHERE id = ?';
        params.push(id);

        const [result] = await db.execute(query, params);
        return result;
    },

    // Eliminar producto
    deleteProducto: async (id) => {
        const [result] = await db.execute('DELETE FROM productos WHERE id = ?', [id]);
        return result;
    }
};
