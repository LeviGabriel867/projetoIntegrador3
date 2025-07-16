import OrderModel from "../models/OrderModel.js";
import Order from "../../../domain/entities/Order.js";
import { IOrderRepository } from "../../../domain/repositories/IOrderRepository.js";

export default class MongooseOrderRepository extends IOrderRepository {
  async create(orderData) {
    try {
      const newOrder = await OrderModel.create({
        mesa: orderData.mesa,
        descricao: orderData.descricao,
        status: 'EM_ESPERA',
      });
      return new Order(newOrder.id, newOrder.mesa, newOrder.descricao, newOrder.status);
    } catch (error) {
      console.error("❌ [REPOSITÓRIO] ERRO AO CRIAR NO MONGODB:", error);
      throw error;
    }
  }

  async find(filters = {}) {
    try {
      const ordersFromDB = await OrderModel.find(filters).sort({ createdAt: -1 }).exec();
      return ordersFromDB.map(
        (order) => new Order(order.id, order.mesa, order.descricao, order.status)
      );
    } catch (error) {
      console.error("❌ [REPOSITÓRIO] ERRO AO BUSCAR NO MONGODB:", error);
      throw error;
    }
  }

  async update(id, updateData) {
    try {
      const updatedOrderFromDB = await OrderModel.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedOrderFromDB) {
        return null;
      }
      return new Order(updatedOrderFromDB.id, updatedOrderFromDB.mesa, updatedOrderFromDB.descricao, updatedOrderFromDB.status);
    } catch (error) {
      console.error("❌ [REPOSITÓRIO] ERRO AO ATUALIZAR NO MONGODB:", error);
      throw error;
    }
  }
}