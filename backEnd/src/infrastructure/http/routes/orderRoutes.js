import { Router } from 'express';
// ✅ Correto:
import orderEvents from '../../../domain/events/orderEvents.js';

export const configureOrderRoutes = (orderController) => {
  const router = Router();

  // Rotas CRUD e operações normais
  router.post('/orders', (req, res) => orderController.create(req, res));
  router.get('/orders/active', (req, res) => orderController.getActiveOrders(req, res));
  router.patch('/orders/:id/advance-status', (req, res) => orderController.advanceStatus(req, res));

  // Rota SSE para streaming dos pedidos atualizados
  router.get('/orders/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // Listener que envia dados ao cliente quando o evento é emitido
    const listener = (updatedOrder) => {
        console.log("[SSE] Enviando pedido atualizado:", updatedOrder);

      res.write(`data: ${JSON.stringify(updatedOrder)}\n\n`);
    };

    orderEvents.on('orderUpdated', listener);

    req.on('close', () => {
      orderEvents.removeListener('orderUpdated', listener);
      res.end();
    });
  });

  return router;
};
