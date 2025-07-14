export class IOrderRepository {
  async create(order) {
    throw new Error("Método 'create' não implementado.");
  }

  async findAllOrders(order) {
    throw new Error("Método 'findAllOrders' não implementado.");
  }

  async updateStatus(orderId, status) {
    throw new Error("Método 'updateStatus' não implementado.");
  }
}