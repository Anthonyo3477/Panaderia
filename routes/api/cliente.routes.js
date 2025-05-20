const { Router } = require('express');
const controller = require('../../db/controllers/clienteController.js');
const ruta = Router();

// Obtener todos los clientes
ruta.get("/", async (req, res) => {
    try {
        const clientes = await controller.getAll();
        res.status(200).json(clientes);
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        res.status(500).send("Error del servidor");
    }
});

// Obtener cliente por ID
ruta.get("/:id", async (req, res) => {
    try {
        const cliente = await controller.getById(req.params.id);
        if (!cliente) return res.status(404).send("Cliente no encontrado");
        res.status(200).json(cliente);
    } catch (error) {
        console.error("Error al obtener el cliente:", error);
        res.status(500).send("Error del servidor");
    }
});

// Insertar un nuevo cliente
ruta.post("/insert", async (req, res) => {
    try {
        const { nombre, correo, contraseña, telefono, direccion } = req.body;
        if (!nombre || !correo || !contraseña) {
            return res.status(400).send("Los campos nombre, correo y contraseña son obligatorios");
        }

        const nuevoCliente = { nombre, correo, contraseña, telefono, direccion };
        const result = await controller.insert(nuevoCliente);
        res.status(201).json({ mensaje: "Cliente registrado correctamente", resultado: result });
    } catch (error) {
        console.error("Error al insertar el cliente:", error);
        res.status(500).send("Error del servidor");
    }
});

// Actualizar un cliente
ruta.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await controller.update(id, req.body);
        res.status(200).json({ mensaje: "Cliente actualizado correctamente", resultado: result });
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        res.status(500).send("Error del servidor");
    }
});

// Eliminar un cliente
ruta.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await controller.remove(id);
        res.status(200).json({ mensaje: "Cliente eliminado correctamente", resultado: result });
    } catch (error) {
        console.error("Error al eliminar el cliente:", error);
        res.status(500).send("Error del servidor");
    }
});

module.exports = ruta;
