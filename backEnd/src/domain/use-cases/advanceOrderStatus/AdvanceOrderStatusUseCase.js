// src/domain/use-cases/advanceOrderStatus/AdvanceOrderStatusUseCase.js
import orderEvents from '../../events/orderEvents.js';

export default class AdvanceOrderStatusUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderId) {
    const currentOrder = await this.orderRepository.findById(orderId);

    if (!currentOrder) {
      throw new Error("Pedido não encontrado.");
    }

    console.log(`[USE CASE] Pedido ${orderId} encontrado com status: ${currentOrder.status}`);

    let nextStatus;
    switch (currentOrder.status) {
      case 'EM_ESPERA':
        nextStatus = 'PREPARANDO';
        break;
      case 'PREPARANDO':
        nextStatus = 'FINALIZADO';
        break;
      default:
        console.log(`[USE CASE] Pedido ${orderId} já está finalizado. Nenhuma ação tomada.`);
        throw new Error("O pedido não pode mais ser avançado.");
    }

    console.log(`[USE CASE] Avançando status para: ${nextStatus}`);

    const updatedOrder = await this.orderRepository.update(orderId, { status: nextStatus });
console.log("[USE CASE] updatedOrder antes de emitir evento:", updatedOrder);
orderEvents.emit('orderUpdated', JSON.parse(JSON.stringify(updatedOrder)));
    console.log(`[USE CASE] Pedido ${updatedOrder.id} atualizado para o status: ${updatedOrder.status}`);
    console.log(`[USE CASE] Emitindo evento 'orderUpdated' para o pedido ${updatedOrder.id}`);

    return updatedOrder;
  }
}
