export default class OrderController {
  constructor(
    createOrderUseCase,
    getActiveOrdersUseCase,
    advanceOrderStatusUseCase,
    updateOrderUseCase
  ) {
    this.createOrderUseCase = createOrderUseCase;
    this.getActiveOrdersUseCase = getActiveOrdersUseCase;
    this.advanceOrderStatusUseCase = advanceOrderStatusUseCase;
    this.updateOrderUseCase = updateOrderUseCase;
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
      await this.advanceOrderStatusUseCase.execute(id); 
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

   async update(request, response) {
    try {
      console.log(`[CONTROLLER] Requisição PATCH recebida para o ID: ${request.params.id}`);

      const { id } = request.params;
      const updateData = request.body;
      
      await this.updateOrderUseCase.execute(id, updateData);
      
      return response.status(204).send();
    } catch (error) {
      console.error(`[CONTROLLER] Erro no método update:`, error);
      return response.status(400).json({ message: error.message });
    }
  }
}
