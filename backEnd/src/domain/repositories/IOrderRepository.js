export class IOrderRepository {
  async create(orderData) {
    throw new Error("Método 'create' não implementado.");
  }
  async find(filters) {
    throw new Error("Método 'find' não implementado.");
  }
  async update(orderId, updateData) {
    throw new Error("Método 'update' não implementado.");
  }
}