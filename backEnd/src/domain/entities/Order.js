class Order {
  constructor(id, tableId, items, status) {
    this.id = id;
    this.tableId = tableId;
    this.items = items;
    this.status = status;
  }
}
module.exports = Order;
