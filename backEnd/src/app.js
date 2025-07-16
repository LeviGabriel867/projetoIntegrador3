// src/app.js (VERSÃO ATUALIZADA)

import express from 'express';
import cors from 'cors';
import { setupFactories } from './infrastructure/http/factories.js'; // A peça chave que monta nosso sistema
import userRoutes from './infrastructure/http/routes/userRoutes.js'; 

// Cria a instância da aplicação Express
const app = express();

// --- Configuração de Middlewares ---
// Habilita o CORS para permitir requisições do seu frontend
app.use(cors());
// Habilita o parsing de JSON no corpo das requisições
app.use(express.json());

// --- Montagem das Rotas ---

// 1. A Factory é chamada. Ela cria o Repository, os Use Cases, o Controller
//    e nos devolve o roteador de pedidos (`orderRoutes`) pronto para usar.
const { orderRoutes } = setupFactories();

// 2. Montamos as rotas na aplicação Express.
//    Todas as rotas importadas serão prefixadas com '/api'.
app.use('/api', userRoutes); 
app.use('/api', orderRoutes); // Agora o orderRoutes já vem com tudo que precisa.

// Rota de "saúde" da API para verificar se está no ar
app.get('/', (req, res) => {
  res.send('API do Restaurante ChefControl no ar!');
});

// 3. Exporta a instância 'app' configurada para ser usada pelo server.js
export default app;