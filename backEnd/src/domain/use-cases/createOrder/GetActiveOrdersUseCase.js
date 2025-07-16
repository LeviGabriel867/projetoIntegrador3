export default class GetActiveOrdersUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute() {
    const activeOrdersFilter = {
      status: { $in: ['EM_ESPERA', 'PREPARANDO'] }
    };
    return this.orderRepository.find(activeOrdersFilter);
  }
}