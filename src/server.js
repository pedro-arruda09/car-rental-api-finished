const express = require('express');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');
const pdfRoutes = require('./routes/pdfRoutes')

const routes = [authRoutes, carRoutes, userRoutes, pdfRoutes]

require('./database')

const app = express();

app.use(express.json())
app.use(routes);

app.listen(3333);