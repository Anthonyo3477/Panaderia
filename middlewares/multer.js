const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Definimos la ruta absoluta para la carpeta uploads dentro de /public
const uploadPath = path.join(__dirname, '..', 'public', 'uploads');

// Verificamos que la carpeta exista, si no, la creamos
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Usamos timestamp + extensión original para evitar colisiones
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, uniqueSuffix);
    }
});

// Filtro para aceptar solo imágenes (opcional pero recomendado)
function fileFilter(req, file, cb) {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos de imagen (jpeg, png, gif, webp).'), false);
    }
}

// Exportamos el middleware multer configurado
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limite de tamaño 5MB
    }
});

module.exports = upload;
