import { orderEvents } from '../createOrder/CreateOrderUseCase.js';

export default class ConcludeOrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute(orderId) {
    const updatedOrder = await this.orderRepository.update(orderId, { status: 'FINALIZADO' });
    if (!updatedOrder) {
      throw new Error("Pedido não encontrado.");
    }
    orderEvents.emit('orderUpdated', updatedOrder);
    return updatedOrder;
  }
}