const db = require('../Conexion'); // Asegúrate de que la ruta sea correcta desde este archivo

module.exports = {
    /**
     * Obtiene todos los productos con paginación
     * @param {number} page - Página actual
     * @param {number} limit - Productos por página
     * @returns {Promise<Array>} Lista de productos
     */
    getAllProductos: async (page = 1, limit = 10) => {
        try {
            const offset = (page - 1) * limit;
            const [rows] = await db.execute(
                'SELECT * FROM producto ORDER BY nombre LIMIT ? OFFSET ?',
                [limit, offset]
            );
            return rows;
        } catch (error) {
            console.error('Error en getAllProductos:', error);
            throw new Error('Error al obtener los productos');
        }
    },

    /**
     * Obtiene un producto por su ID
     * @param {number} id - ID del producto
     * @returns {Promise<Array>} Datos del producto
     */
    getProductoById: async (id) => {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM producto WHERE id = ?',
                [id]
            );
            return rows;
        } catch (error) {
            console.error('Error en getProductoById:', error);
            throw new Error('Error al obtener el producto');
        }
    },

    /**
     * Inserta un nuevo producto
     * @param {Object} producto - Datos del producto
     * @param {string} producto.nombre - Nombre del producto
     * @param {string} producto.clasificacion - Clasificación del producto
     * @param {string} producto.descripcion - Descripción del producto
     * @returns {Promise<Object>} Resultado de la inserción
     */
    insertProducto: async (producto) => {
        try {
            const { nombre, clasificacion, descripcion } = producto;

            if (!nombre || !clasificacion || !descripcion) {
                throw new Error('Faltan campos obligatorios');
            }

            // La desestructuración [result] ahora es segura debido a la corrección en Conexion.js
            const [result] = await db.execute(
                'INSERT INTO producto (nombre, clasificacion, descripcion) VALUES (?, ?, ?)',
                [nombre.trim(), clasificacion.trim(), descripcion.trim()]
            );

            return {
                id: result.insertId,
                ...producto
            };
        } catch (error) {
            console.error('Error en insertProducto:', error);
            throw new Error('Error al crear el producto');
        }
    },

    /**
     * Actualiza un producto existente
     * @param {number} id - ID del producto a actualizar
     * @param {Object} producto - Nuevos datos del producto
     * @returns {Promise<Object>} Resultado de la actualización
     */
    updateProducto: async (id, producto) => {
        try {
            const { nombre, clasificacion, descripcion } = producto;

            if (!nombre || !clasificacion || !descripcion) {
                throw new Error('Faltan campos obligatorios');
            }

            const [result] = await db.execute(
                'UPDATE producto SET nombre = ?, clasificacion = ?, descripcion = ? WHERE id = ?',
                [nombre.trim(), clasificacion.trim(), descripcion.trim(), id]
            );

            if (result.affectedRows === 0) {
                throw new Error('Producto no encontrado');
            }

            return {
                id,
                ...producto
            };
        } catch (error) {
            console.error('Error en updateProducto:', error);
            throw new Error('Error al actualizar el producto');
        }
    },

    /**
     * Elimina un producto
     * @param {number} id - ID del producto a eliminar
     * @returns {Promise<Object>} Resultado de la eliminación
     */
    deleteProducto: async (id) => {
        try {
            const [result] = await db.execute(
                'DELETE FROM producto WHERE id = ?',
                [id]
            );

            if (result.affectedRows === 0) {
                throw new Error('Producto no encontrado');
            }

            return {
                id,
                message: 'Producto eliminado correctamente'
            };
        } catch (error) {
            console.error('Error en deleteProducto:', error);
            throw new Error('Error al eliminar el producto');
        }
    },

    /**
     * Obtiene productos por clasificación
     * @param {string} clasificacion - Tipo de producto
     * @returns {Promise<Array>} Lista de productos filtrados
     */
    getProductosPorClasificacion: async (clasificacion) => {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM producto WHERE clasificacion = ? ORDER BY nombre',
                [clasificacion]
            );
            return rows;
        } catch (error) {
            console.error('Error en getProductosPorClasificacion:', error);
            throw new Error('Error al filtrar productos');
        }
    }
};