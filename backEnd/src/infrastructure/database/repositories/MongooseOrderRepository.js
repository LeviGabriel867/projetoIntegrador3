import OrderModel from "../models/OrderModel.js";
import Order from "../../../domain/entities/Order.js";
import { IOrderRepository } from "../../../domain/repositories/IOrderRepository.js";

export default class MongooseOrderRepository extends IOrderRepository {
  // Cria um novo pedido com status padrão 'EM_ESPERA'
  async create(orderData) {
    try {
      const newOrder = await OrderModel.create({
        mesa: orderData.mesa,
        descricao: orderData.descricao,
        status: 'EM_ESPERA',  // status inicial fixo
      });
      return new Order(newOrder.id, newOrder.mesa, newOrder.descricao, newOrder.status);
    } catch (error) {
      console.error("❌ [REPOSITÓRIO] ERRO AO CRIAR NO MONGODB:", error);
      throw error;
    }
  }

  // Busca pedidos aplicando filtros opcionais e ordena do mais novo para o mais antigo
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

  // Busca um pedido pelo seu ID
  async findById(id) {
    try {
      const orderFromDB = await OrderModel.findById(id);
      if (!orderFromDB) {
        return null;
      }
      return new Order(orderFromDB.id, orderFromDB.mesa, orderFromDB.descricao, orderFromDB.status);
    } catch (error) {
      console.error("❌ [REPOSITÓRIO] ERRO AO BUSCAR POR ID NO MONGODB:", error);
      throw error;
    }
  }

  /**
   * Atualiza um pedido por ID e retorna o pedido atualizado
   * @param {string} id - ID do pedido
   * @param {object} updateData - Campos para atualizar (ex: { status: 'PREPARANDO' })
   * @returns {Promise<Order|null>}
   */
  async update(id, updateData) {
  try {
    const updatedOrderFromDB = await OrderModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    console.log("[REPOSITÓRIO] Updated order from DB:", updatedOrderFromDB);

    if (!updatedOrderFromDB) {
      return null;
    }

    return new Order(
      updatedOrderFromDB.id,
      updatedOrderFromDB.mesa,
      updatedOrderFromDB.descricao,
      updatedOrderFromDB.status
    );
  } catch (error) {
    console.error("❌ [REPOSITÓRIO] ERRO AO ATUALIZAR NO MONGODB:", error);
    throw error;
  }
}

}
