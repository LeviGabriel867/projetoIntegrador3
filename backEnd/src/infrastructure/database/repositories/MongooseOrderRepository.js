

import OrderModel from "../models/OrderModel.js";
import Order from "../../../domain/entities/Order.js";

export default class MongooseOrderRepository {
  async create(orderData) {

    try {
      const newOrder = await OrderModel.create({
        mesa: orderData.mesa,
        descricao: orderData.descricao,
        status: orderData.status,
      });


      // O 'newOrder' do Mongoose terá um _id. O 'id' do Mongoose é um getter para o _id.
      // Vamos garantir que estamos criando a entidade de volta com o ID do banco.
      return new Order(newOrder._id, newOrder.mesa, newOrder.descricao, newOrder.status);

    } catch (error) {
      console.error('❌ [REPOSITÓRIO] ERRO AO SALVAR NO MONGODB:', error);
      // É crucial relançar o erro ou lidar com ele para que as camadas superiores saibam.
      throw error;
    }
  }
    
    /**
   * Busca todos os pedidos que estão com status 'EM_ESPERA' ou 'PREPARANDO'.
   * @returns {Promise<Order[]>}
   */
  async findActiveOrders() {
    try {
      // Usamos o operador $in do MongoDB para buscar documentos
      // cujo valor de 'status' esteja dentro do array fornecido.
      const activeStatuses = ["EM_ESPERA", "PREPARANDO"];
      const ordersFromDB = await OrderModel.find({
        status: { $in: activeStatuses }
      }).exec();

      // Mapeia para a entidade de domínio, como você já faz corretamente
      return ordersFromDB.map(order => new Order(order._id, order.mesa, order.descricao, order.status));
    } catch (error) {
      console.error('❌ [REPOSITÓRIO] ERRO AO BUSCAR PEDIDOS ATIVOS:', error);
      throw error;
    }
  }
}
