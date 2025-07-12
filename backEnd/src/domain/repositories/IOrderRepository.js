export class IOrderRepository {
  async create(order) {
    throw new Error("Método 'create' não implementado.");
  }

  async findAll() {
    throw new Error("Método 'findAll' não implementado.");
  }

  async updateStatus(orderId, status) {
    throw new Error("Método 'updateStatus' não implementado.");
  }
}