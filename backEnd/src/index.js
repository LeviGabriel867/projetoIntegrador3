// src/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Carrega variáveis de ambiente do .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173', 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('Olá do Backend com Node.js e JavaScript (ES Modules)!');
});


// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} - http://localhost:${port}`);
});