export const OrderStatus = Object.freeze({
  EM_ESPERA: 'EM_ESPERA',
  PREPARANDO: 'PREPARANDO',
  FINALIZADO: 'FINALIZADO',
});

export default class Order {
  constructor(id, mesa, descricao) {
    this.id = id || null;
    this.mesa = mesa;
    this.descricao = descricao;    
    this.status = OrderStatus.EM_ESPERA; 
    this.createdAt = new Date();
  }
}