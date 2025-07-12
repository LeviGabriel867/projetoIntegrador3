import express from 'express';
import cors from 'cors'; 
import userRoutes from '../src/infrastructure/http/routes/userRoutes.js'; // 
import orderRoutes from '../src/infrastructure/http/routes/orderRoutes.js'; // Importa as rotas de pedidos
const app = express();

app.use(cors()); 
app.use(express.json()); 


app.use('/api', userRoutes); 
app.use('/api', orderRoutes); 

app.get('/', (req, res) => {
  res.send('API do Restaurante no ar!');
});

export default app;