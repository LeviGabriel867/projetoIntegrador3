
import express from 'express';
import cors from 'cors';
import { setupFactories } from './infrastructure/http/factories.js'; 
import userRoutes from './infrastructure/http/routes/userRoutes.js'; 

const app = express();


app.use(cors());
app.use(express.json());

const { orderRoutes } = setupFactories();


app.use('/api', userRoutes); 
app.use('/api', orderRoutes); 

app.get('/', (req, res) => {
  res.send('API do Restaurante ChefControl no ar!');
});
export default app;