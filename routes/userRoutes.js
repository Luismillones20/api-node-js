const express = require('express');
const router = express.Router();
const User = require('../models/user');

// CRUD BÁSICO para Usuarios
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    user ? res.json(user) : res.status(404).json({ error: 'No encontrado' });
});

router.put('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.update(req.body);
        res.json(user);
    } else res.status(404).json({ error: 'No encontrado' });
});

router.delete('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.destroy();
        res.json({ mensaje: 'Eliminado' });
    } else res.status(404).json({ error: 'No encontrado' });
});

module.exports = router;
