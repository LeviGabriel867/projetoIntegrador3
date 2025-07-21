import { Router } from 'express';
import orderEvents from '../../../domain/events/orderEvents.js';

export const configureOrderRoutes = (orderController) => {
  const router = Router();

  // Rotas CRUD padrão
  router.post('/orders', (req, res) => orderController.create(req, res));
  router.get('/orders/active', (req, res) => orderController.getActiveOrders(req, res));
  router.patch('/orders/:id/advance-status', (req, res) => orderController.advanceStatus(req, res));
  router.patch('/orders/:id', (req, res) => orderController.update(req, res));

  // Rota SSE aprimorada para streaming de pedidos
  router.get('/orders/stream', (req, res) => {
    // Configuração robusta de headers SSE
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
      'Access-Control-Allow-Origin': '*' // Em desenvolvimento apenas
    });

    // Envia um heartbeat inicial para testar a conexão
    res.write(':heartbeat\n\n');
    console.log(`[SSE] Nova conexão estabelecida - Client IP: ${req.ip}`);

    // Formatação padronizada de eventos
    const formatEvent = (event, data) => {
      return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    };

    // Handler para envio de atualizações
    const sendOrderUpdate = (order) => {
  try {
    const eventData = {
      id: order._id ? order._id.toString() : order.id,
      ...order,
      _timestamp: Date.now()
    };
    
    res.write(`id: ${eventData.id}\n`);
    res.write(`event: orderUpdated\n`);
    res.write(`data: ${JSON.stringify(eventData)}\n\n`);
    
    // Forçar envio imediato
    if (res.flush) res.flush();
    
  } catch (err) {
    console.error('[SSE] Erro ao enviar atualização:', err);
  }
};

    // Handler para eventos de sistema
    const sendSystemEvent = (type, message) => {
      res.write(formatEvent('system', { type, message }));
    };

    // Registra listeners
    orderEvents.on('orderUpdated', sendOrderUpdate);
    console.log(`[SSE] Listeners ativos - orderUpdated: ${orderEvents.listenerCount('orderUpdated')}`);

    // Heartbeat para manter conexão ativa
    const heartbeatInterval = setInterval(() => {
      res.write(':ping\n\n');
    }, 30000);

    // Tratamento de desconexão
    req.on('close', () => {
      clearInterval(heartbeatInterval);
      orderEvents.off('orderUpdated', sendOrderUpdate);
      console.log('[SSE] Conexão fechada pelo cliente');
      
      // Verificação final de listeners
      console.log(`[SSE] Listeners restantes - orderUpdated: ${orderEvents.listenerCount('orderUpdated')}`);
    });

    // Tratamento de erro
    req.socket.on('error', (err) => {
      console.error('[SSE] Erro na conexão:', err);
      res.end();
    });

    // Envia evento de conexão estabelecida
    sendSystemEvent('connection', 'Conectado ao servidor de eventos');
  });

  return router;
};