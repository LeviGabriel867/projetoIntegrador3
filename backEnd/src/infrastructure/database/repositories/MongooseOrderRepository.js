

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
  
  // ... outros métodos
}