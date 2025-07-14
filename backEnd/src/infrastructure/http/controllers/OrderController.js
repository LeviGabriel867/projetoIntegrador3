// infrastructure/http/controllers/OrderController.js

import CreateOrderUseCase from '../../../domain/use-cases/createOrder/CreateOrderUseCase.js';
// A linha abaixo busca o arquivo GetActiveOrdersUseCase DENTRO da pasta createOrder
import GetActiveOrdersUseCase from '../../../domain/use-cases/createOrder/GetActiveOrdersUseCase.js';

// ... resto do seu controller
export default class OrderController {
  constructor(createOrderUseCase, getActiveOrdersUseCase) {
    this.createOrderUseCase = createOrderUseCase;
    this.getActiveOrdersUseCase = getActiveOrdersUseCase; // Agora injetamos o caso de uso correto
  }

  /**
   * Rota para criar um novo pedido.
   */
  async create(request, response) {
    const { mesa, descricao } = request.body;

    try {
      const order = await this.createOrderUseCase.execute({ mesa, descricao });
      
      // Mapeia a entidade de domínio para uma resposta JSON limpa (DTO)
      const orderResponse = {
        id: order.id,
        mesa: order.mesa,
        descricao: order.descricao,
        status: order.status,
      };
      
      return response.status(201).json(orderResponse);
    } catch (error) {
      return response.status(400).json({ message: error.message || "Erro ao criar pedido." });
    }
  }

  /**
   * Rota para buscar TODOS os pedidos ativos (EM_ESPERA ou PREPARANDO).
   * Renomeado de getAll para getActiveOrders para maior clareza.
   */
  async getActiveOrders(request, response) {
    // 1. Removido: Não precisamos mais de parâmetros do request para esta busca específica.
    // const {mesa, descricao, status} = request.body; 

    try {
      // 2. Chamada ao Use Case correto, que não precisa de parâmetros.
      const orders = await this.getActiveOrdersUseCase.execute();
      
      // 3. Mapeia a lista de entidades para uma resposta JSON limpa.
      const ordersResponse = orders.map(order => ({
        id: order.id,
        mesa: order.mesa,
        descricao: order.descricao,
        status: order.status
      }));

      return response.status(200).json(ordersResponse);
    } catch (error) {
      return response.status(500).json({ message: error.message || "Erro ao buscar pedidos." });
    }
  }
}