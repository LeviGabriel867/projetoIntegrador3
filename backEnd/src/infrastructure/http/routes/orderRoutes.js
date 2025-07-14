// infrastructure/http/routes/orderRoutes.js (exemplo de caminho de arquivo)

import express from 'express';

// 1. Importações (garanta que os caminhos estejam corretos)
import MongooseOrderRepository from '../../database/repositories/MongooseOrderRepository.js';
import CreateOrderUseCase from '../../../domain/use-cases/createOrder/CreateOrderUseCase.js';
import GetActiveOrdersUseCase from '../../../domain/use-cases/createOrder/GetActiveOrdersUseCase.js'; // <- IMPORTADO
import OrderController from '../controllers/OrderController.js';

const router = express.Router();

// --- Montando as Dependências ---

// 2. Instanciando o Repositório (com nome claro)
const orderRepository = new MongooseOrderRepository();

// 3. Instanciando AMBOS os Casos de Uso, injetando o repositório
const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const getActiveOrdersUseCase = new GetActiveOrdersUseCase(orderRepository); // <- INSTANCIADO

// 4. Instanciando o Controller com TODAS as suas dependências
const orderController = new OrderController(
  createOrderUseCase,
  getActiveOrdersUseCase // <- INJETADO NO CONTROLLER
);

// --- Definindo as Rotas ---

// Rota para criar um pedido (continua igual e correta)
router.post('/orders', (req, res) => orderController.create(req, res));

// 5. Rota GET para buscar pedidos ativos
//    - Aponta para um endpoint mais descritivo
//    - Chama o método correto no controller
router.get('/orders/active', (req, res) => orderController.getActiveOrders(req, res));


export default router;