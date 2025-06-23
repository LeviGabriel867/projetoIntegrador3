import express from 'express';
import userRoutes from './interface/routes/userRoutes.js';

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

export default app;
