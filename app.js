import dotenv from 'dotenv';
import cors from 'cors';

import './src/database/index.js';

import express from 'express';
import adminRoutes from './src/routes/adminRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import capitalRoutes from './src/routes/capitalRoutes.js';
import carPhotoRoutes from './src/routes/carPhotoRoutes.js';
import carRoutes from './src/routes/carRoutes.js';
import pdfRoutes from './src/routes/pdfRoutes.js';
import recoveryRoutes from './src/routes/recoveryRoutes.js';
import userAccessLogsRoutes from './src/routes/userAccessLogsRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import userRentRoutes from './src/routes/userRentRoutes.js';
import xlsRoutes from './src/routes/xlsRoutes.js';

class App {
  constructor() {
    dotenv.config();
    this.app = express();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use('/admin', adminRoutes);
    this.app.use('/auth/login', authRoutes);
    this.app.use('/capitals', capitalRoutes);
    this.app.use('/car-photos', carPhotoRoutes);
    this.app.use('/cars', carRoutes);
    this.app.use('/pdf', pdfRoutes);
    this.app.use('/', recoveryRoutes);
    this.app.use('/access_logs', userAccessLogsRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/user_rent', userRentRoutes);
    this.app.use('/xls', xlsRoutes);
  }

  setup() {
    this.middlewares();
    this.routes();
    this.app.listen(3333);
  }
}

export default new App();