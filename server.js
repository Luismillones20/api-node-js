const express = require('express');
const sequelize = require('./database');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('./models/task'); // Importa relaciones

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

sequelize.sync().then(() => {
    app.listen(8001, () => {
        console.log('API compleja corriendo en http://localhost:8001');
    });
});
