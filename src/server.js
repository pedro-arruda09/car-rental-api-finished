const express = require('express');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const carPhotoRoutes = require('./routes/carPhotoRoutes');
const capitalRoutes = require('./routes/capitalRoutes');
const userRoutes = require('./routes/userRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const xlsRoutes = require('./routes/xlsRoutes')

const routes = [adminRoutes, authRoutes, carRoutes, carPhotoRoutes, capitalRoutes, userRoutes, pdfRoutes, xlsRoutes];

require('./database');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);