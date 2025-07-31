import { Router } from 'express';
import orderEvents from '../../../domain/events/orderEvents.js';

export const configureOrderRoutes = (orderController) => {
  const router = Router();

  router.post('/orders', (req, res) => orderController.create(req, res));
  router.get('/orders/active', (req, res) => orderController.getActiveOrders(req, res));
  router.patch('/orders/:id/advance-status', (req, res) => orderController.advanceStatus(req, res));
  router.patch('/orders/:id', (req, res) => orderController.update(req, res));

  router.get('/orders/stream', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
      'Access-Control-Allow-Origin': '*' 
    });

    res.write(':heartbeat\n\n');
    console.log(`[SSE] Nova conexão estabelecida - Client IP: ${req.ip}`);

    const formatEvent = (event, data) => {
      return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    };

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
    
    if (res.flush) res.flush();
    
  } catch (err) {
    console.error('[SSE] Erro ao enviar atualização:', err);
  }
};

    const sendSystemEvent = (type, message) => {
      res.write(formatEvent('system', { type, message }));
    };

    orderEvents.on('orderUpdated', sendOrderUpdate);
    console.log(`[SSE] Listeners ativos - orderUpdated: ${orderEvents.listenerCount('orderUpdated')}`);

    const heartbeatInterval = setInterval(() => {
      res.write(':ping\n\n');
    }, 30000);

    req.on('close', () => {
      clearInterval(heartbeatInterval);
      orderEvents.off('orderUpdated', sendOrderUpdate);
      console.log('[SSE] Conexão fechada pelo cliente');
      
      console.log(`[SSE] Listeners restantes - orderUpdated: ${orderEvents.listenerCount('orderUpdated')}`);
    });

    req.socket.on('error', (err) => {
      console.error('[SSE] Erro na conexão:', err);
      res.end();
    });

    sendSystemEvent('connection', 'Conectado ao servidor de eventos');
  });

  return router;
};