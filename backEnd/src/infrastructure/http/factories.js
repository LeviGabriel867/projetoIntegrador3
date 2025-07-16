// Este arquivo é responsável por criar e "conectar" todas as peças da nossa aplicação.
import OrderController from './controllers/OrderController.js';
import MongooseOrderRepository from '../database/repositories/MongooseOrderRepository.js';
import CreateOrderUseCase from '../../domain/use-cases/createOrder/CreateOrderUseCase.js';
import GetActiveOrdersUseCase from '../../domain/use-cases/createOrder/GetActiveOrdersUseCase.js';
import ConcludeOrderUseCase from '../../domain/use-cases/concludeOrder/ConcludeOrderUseCase.js';
import { configureOrderRoutes } from './routes/orderRoutes.js';

export const setupFactories = () => {
  // 1. Criar a instância do Repositório (a camada de dados)
  const orderRepository = new MongooseOrderRepository();

  // 2. Criar as instâncias dos Casos de Uso, injetando o repositório
  const createOrderUseCase = new CreateOrderUseCase(orderRepository);
  const getActiveOrdersUseCase = new GetActiveOrdersUseCase(orderRepository);
  const concludeOrderUseCase = new ConcludeOrderUseCase(orderRepository);

  // 3. Criar a instância do Controller, injetando os casos de uso
  const orderController = new OrderController(
    createOrderUseCase,
    getActiveOrdersUseCase,
    concludeOrderUseCase
  );

  // 4. Configurar as rotas, injetando o controller
  const orderRoutes = configureOrderRoutes(orderController);

  // Retorna o roteador pronto para ser usado pelo app.js
  return { orderRoutes };
};