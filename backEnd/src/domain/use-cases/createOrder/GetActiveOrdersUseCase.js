// useCases/GetActiveOrdersUseCase.js

export default class GetActiveOrdersUseCase {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    async execute() {
        return this.orderRepository.findActiveOrders();
    }
}