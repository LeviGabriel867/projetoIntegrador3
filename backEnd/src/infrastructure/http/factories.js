// src/infra/http/factories.js

import { MongooseOrderRepository } from '../database/repositories/MongooseOrderRepository.js';
import { CreateOrderUseCase } from '../../domain/use-cases/createOrder/CreateOrderUseCase.js';
import { OrderController } from './controllers/OrderController.js';

// 1. Instanciar o Repositório
const mongooseOrderRepository = new MongooseOrderRepository();

// 2. Instanciar os Casos de Uso com o repositório
const createOrderUseCase = new CreateOrderUseCase(mongooseOrderRepository);
// const listOrdersUseCase = new ListOrdersUseCase(mongooseOrderRepository);
// const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(mongooseOrderRepository);

// 3. Instanciar o Controller com os casos de uso
// Quando tiver mais casos de uso, passe-os para o construtor do controller.
const orderController = new OrderController(createOrderUseCase);

// Exportamos a instância pronta para ser usada nas rotas.
export { orderController };