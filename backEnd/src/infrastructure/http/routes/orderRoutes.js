import { Router } from 'express';
import { orderEvents } from '../../../domain/use-cases/createOrder/CreateOrderUseCase.js';

// Esta função recebe o controller já pronto da factory
export const configureOrderRoutes = (orderController) => {
  const router = Router();

  // Rotas de Comandos e Consultas (permanecem iguais)
  router.post('/orders', (req, res) => orderController.create(req, res));
  router.get('/orders/active', (req, res) => orderController.getActiveOrders(req, res));
  router.patch('/orders/:id/conclude', (req, res) => orderController.conclude(req, res));

  // --- Rota de Streaming (SSE) - CORREÇÃO APLICADA AQUI ---
  router.get('/orders/stream', (req, res) => {
    // 1. CONFIGURA OS HEADERS CORRETOS PARA SSE
    //    Isso diz ao navegador: "Estou enviando um fluxo de eventos, não um JSON".
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    // 2. ENVIA OS HEADERS IMEDIATAMENTE PARA O CLIENTE
    //    Isso "abre" o canal de comunicação.
    res.flushHeaders();

    // Função que será chamada quando um evento acontecer no nosso sistema
    const listener = (updatedOrder) => {
      // Formata a mensagem no padrão SSE (data: {json}\n\n) e a envia
      res.write(`data: ${JSON.stringify(updatedOrder)}\n\n`);
    };

    // "Inscreve" a função para ouvir o evento 'orderUpdated'
    orderEvents.on('orderUpdated', listener);

    // Quando o cliente fecha a conexão (ex: fecha a aba do navegador)
    req.on('close', () => {
      // Remove o ouvinte para evitar vazamento de memória (memory leak)
      orderEvents.removeListener('orderUpdated', listener);
      res.end(); // Encerra a resposta do lado do servidor
    });
  });

  return router;
};