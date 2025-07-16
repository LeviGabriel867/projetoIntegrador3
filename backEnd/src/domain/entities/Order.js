export default class Order {
  constructor(id, mesa, descricao, status, createdAt) {
    this.id = id;
    this.mesa = mesa;
    this.descricao = descricao;
    this.status = status;   // Usa o status passado corretamente
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
  }
}
