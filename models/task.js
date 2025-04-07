const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const Task = sequelize.define('Task', {
    title: { type: DataTypes.STRING, allowNull: false },
    done: { type: DataTypes.BOOLEAN, defaultValue: false }
});

// Relación: Un usuario tiene muchas tareas
User.hasMany(Task, { onDelete: 'CASCADE' });
Task.belongsTo(User);

module.exports = Task;
