export default class OrderController {
  constructor(
    createOrderUseCase,
    getActiveOrdersUseCase,
    advanceOrderStatusUseCase
  ) {
    this.createOrderUseCase = createOrderUseCase;
    this.getActiveOrdersUseCase = getActiveOrdersUseCase;
    this.advanceOrderStatusUseCase = advanceOrderStatusUseCase;
  }

  async create(request, response) {
    try {
      const { mesa, descricao } = request.body;
      const order = await this.createOrderUseCase.execute({ mesa, descricao });
      return response.status(201).json(order);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async getActiveOrders(request, response) {
    try {
      const orders = await this.getActiveOrdersUseCase.execute();
      return response.status(200).json(orders);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async advanceStatus(request, response) {
    try {
      const { id } = request.params;
      await this.advanceOrderStatusUseCase.execute(id); // Chama o novo use case
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
