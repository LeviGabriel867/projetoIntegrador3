import express from 'express';
import OrderRepositoryMongo from '../../database/repositories/MongooseOrderRepository.js';
import CreateOrderUseCase from '../../../domain/use-cases/createOrder/CreateOrderUseCase.js';
import OrderController from '../../../infrastructure/http/controllers/OrderController.js';

const router = express.Router();

const userRepo = new OrderRepositoryMongo();
const createOrderUseCase = new CreateOrderUseCase(userRepo);
const orderController = new OrderController(createOrderUseCase);
 

router.post('/orders', (req, res) => orderController.create(req, res));

export default router;