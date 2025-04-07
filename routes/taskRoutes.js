const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const User = require('../models/user');

// Crear una tarea asociada a un usuario
router.post('/', async (req, res) => {
    try {
        const user = await User.findByPk(req.body.userId);
        if (!user) return res.status(404).json({ error: 'Usuario no existe' });

        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar todas las tareas
router.get('/', async (req, res) => {
    const tasks = await Task.findAll({ include: User });
    res.json(tasks);
});

// Obtener tarea por ID
router.get('/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    task ? res.json(task) : res.status(404).json({ error: 'No encontrado' });
});

// Actualizar tarea
router.put('/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (task) {
        await task.update(req.body);
        res.json(task);
    } else res.status(404).json({ error: 'No encontrado' });
});

// Eliminar tarea
router.delete('/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (task) {
        await task.destroy();
        res.json({ mensaje: 'Tarea eliminada' });
    } else res.status(404).json({ error: 'No encontrado' });
});

module.exports = router;
