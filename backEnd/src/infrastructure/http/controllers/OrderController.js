// Controller for order actions
export default class OrderController {
  constructor(createOrderUseCase) {
    this.createOrderUseCase = createOrderUseCase;
    // Quando criar os outros, adicione-os aqui:
    // this.listOrdersUseCase = listOrdersUseCase;
  }

  async create(request, response) {
    const { mesa, descricao } = request.body;

    try {
      const order = await this.createOrderUseCase.execute({ mesa, descricao });
      const orderResponse = {
        id: order.id,
        mesa: order.mesa,
        descricao: order.descricao,
        status: order.status,
        createdAt: order.createdAt,
      };
      response.status(201).json(orderResponse);
    } catch (error) {
      return response.status(400).json({ message: error.message || "Erro inesperado." });
    }
  }

}