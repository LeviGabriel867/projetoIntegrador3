// src/domain/use-cases/updateOrder/UpdateOrderUseCase.js
import orderEvents from "../../events/orderEvents.js";

export default class UpdateOrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderId, updateData) {
    console.log(
      `[USE CASE - Update] Recebido para o ID ${orderId}:`,
      updateData
    );

    if (updateData.mesa !== undefined && !updateData.mesa.trim()) {
      throw new Error("O campo 'mesa' não pode ser vazio.");
    }
    if (updateData.descricao !== undefined && !updateData.descricao.trim()) {
      throw new Error("O campo 'descrição' não pode ser vazio.");
    }

    const orderToUpdate = await this.orderRepository.findById(orderId);
    if (!orderToUpdate) {
      throw new Error("Pedido não encontrado.");
    }

    const cleanUpdateData = {};
    if (updateData.mesa) cleanUpdateData.mesa = updateData.mesa;
    if (updateData.descricao) cleanUpdateData.descricao = updateData.descricao;

    if (Object.keys(cleanUpdateData).length === 0) {
      console.log(
        `[USE CASE - Update] Nenhum dado válido para atualizar foi fornecido.`
      );
      throw new Error("Nenhum dado para atualizar foi fornecido.");
    }

    const updatedOrder = await this.orderRepository.update(
      orderId,
      cleanUpdateData
    );

    const eventData = {
      ...updatedOrder,
      id: updatedOrder._id ? updatedOrder._id.toString() : updatedOrder.id,
      createdAt: updatedOrder.createdAt.toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log(`[USE CASE] Verificando listeners para orderUpdated...`);
    const listenerCount = orderEvents.listenerCount('orderUpdated');
    console.log(`[USE CASE] Listeners ativos: ${listenerCount}`);

    if (listenerCount === 0) {
      console.warn('[USE CASE] Aviso: Nenhum listener ativo para orderUpdated');
    } else {
      console.log('[USE CASE] Enviando evento para listeners ativos:',
        JSON.stringify(eventData, null, 2));
      
      if (typeof orderEvents.emit !== 'function') {
        console.error('orderEvents.emit não é uma função!');
        throw new Error('Erro interno: sistema de eventos não disponível');
      }
      
      orderEvents.emit("orderUpdated", eventData);
      console.log('[USE CASE] Evento emitido com sucesso');
    }

    return updatedOrder;
  }
}