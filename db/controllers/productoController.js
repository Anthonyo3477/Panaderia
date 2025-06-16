const db = require('../Conexion');

// Función para obtener todos los productos con paginación
async function getAllProductos(page = 1, limit = 10) {
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
}

// Función para obtener un producto por ID
async function getProductoById(id) {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM producto WHERE id = ?',
            [id]
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Error en getProductoById:', error);
        throw new Error('Error al obtener el producto');
    }
}

// Función para insertar un nuevo producto
async function insertProducto(producto) {
    try {
        const { nombre, clasificación, descripcion } = producto;
        if (!nombre || !clasificación || !descripcion) {
            throw new Error('Faltan campos obligatorios');
        }

        const [result] = await db.execute(
            'INSERT INTO producto (nombre, clasificación, descripcion) VALUES (?, ?, ?)',
            [nombre.trim(), clasificación.trim(), descripcion.trim()]
        );

        return {
            id: result.insertId,
            ...producto
        };
    } catch (error) {
        console.error('Error en insertProducto:', error);
        throw new Error('Error al crear el producto');
    }
}

// Función para actualizar un producto
async function updateProducto(id, producto) {
    try {
        const { nombre, clasificación, descripcion } = producto;
        if (!nombre || !clasificación || !descripcion) {
            throw new Error('Faltan campos obligatorios');
        }

        const [result] = await db.execute(
            'UPDATE producto SET nombre = ?, clasificación = ?, descripcion = ? WHERE id = ?',
            [nombre.trim(), clasificación.trim(), descripcion.trim(), id]
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
}

// Función para eliminar un producto
async function deleteProducto(id) {
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
}

// Función para obtener productos por clasificación
async function getProductosPorClasificacion(clasificacion) {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM producto WHERE clasificación = ? ORDER BY nombre',
            [clasificacion]
        );
        return rows;
    } catch (error) {
        console.error('Error en getProductosPorClasificacion:', error);
        throw new Error('Error al filtrar productos');
    }
}

// Exportamos todas las funciones al final
module.exports = {
    getAllProductos,
    getProductoById,
    insertProducto,
    updateProducto,
    deleteProducto,
    getProductosPorClasificacion
};
