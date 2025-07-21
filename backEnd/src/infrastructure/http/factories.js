// Este arquivo é responsável por criar e "conectar" todas as peças da nossa aplicação.
import OrderController from './controllers/OrderController.js';
import MongooseOrderRepository from '../database/repositories/MongooseOrderRepository.js';
import CreateOrderUseCase from '../../domain/use-cases/createOrder/CreateOrderUseCase.js';
import GetActiveOrdersUseCase from '../../domain/use-cases/createOrder/GetActiveOrdersUseCase.js';
import AdvanceOrderStatusUseCase  from '../../domain/use-cases/advanceOrderStatus/AdvanceOrderStatusUseCase.js';
import UpdateOrderUseCase from '../../domain/use-cases/updateOrder/UpdateOrder.js';
import { configureOrderRoutes } from './routes/orderRoutes.js';

export const setupFactories = () => {
  const orderRepository = new MongooseOrderRepository();

  const createOrderUseCase = new CreateOrderUseCase(orderRepository);
  const getActiveOrdersUseCase = new GetActiveOrdersUseCase(orderRepository);
  const advanceOrderStatusUseCase = new AdvanceOrderStatusUseCase(orderRepository);
  const updateOrderUseCase = new UpdateOrderUseCase(orderRepository); // <<< INSTANCIAR

  // Injeta o novo Use Case no Controller
  const orderController = new OrderController(
    createOrderUseCase,
    getActiveOrdersUseCase,
    advanceOrderStatusUseCase,
    updateOrderUseCase
  );

  const orderRoutes = configureOrderRoutes(orderController);
  return { orderRoutes };
};