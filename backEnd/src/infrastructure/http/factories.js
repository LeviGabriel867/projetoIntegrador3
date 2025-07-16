// Este arquivo é responsável por criar e "conectar" todas as peças da nossa aplicação.
import OrderController from './controllers/OrderController.js';
import MongooseOrderRepository from '../database/repositories/MongooseOrderRepository.js';
import CreateOrderUseCase from '../../domain/use-cases/createOrder/CreateOrderUseCase.js';
import GetActiveOrdersUseCase from '../../domain/use-cases/createOrder/GetActiveOrdersUseCase.js';
import AdvanceOrderStatusUseCase  from '../../domain/use-cases/advanceOrderStatus/AdvanceOrderStatusUseCase.js';
import { configureOrderRoutes } from './routes/orderRoutes.js';

export const setupFactories = () => {
  const orderRepository = new MongooseOrderRepository();

  const createOrderUseCase = new CreateOrderUseCase(orderRepository);
  const getActiveOrdersUseCase = new GetActiveOrdersUseCase(orderRepository);
  // Instancia o novo Use Case
  const advanceOrderStatusUseCase = new AdvanceOrderStatusUseCase(orderRepository);

  // Injeta o novo Use Case no Controller
  const orderController = new OrderController(
    createOrderUseCase,
    getActiveOrdersUseCase,
    advanceOrderStatusUseCase // Passando o novo caso de uso
  );

  const orderRoutes = configureOrderRoutes(orderController);
  return { orderRoutes };
};