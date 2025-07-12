export default class CreateOrderUseCase {
 
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({ mesa, descricao }) {
    if (!mesa || mesa <= 0) {
      throw new Error("O número da mesa deve ser válido.");
    }
    if (!descricao) {
      throw new Error("A descrição do pedido é obrigatória.");
    }

    return this.orderRepository.create({mesa, descricao});

  }
}