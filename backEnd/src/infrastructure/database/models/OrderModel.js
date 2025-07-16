import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  mesa: { type: String, required: true },
  descricao: { type: String, required: true },
  status: {
    type: String,
    enum: ['EM_ESPERA', 'PREPARANDO', 'FINALIZADO'],
    default: 'EM_ESPERA',
  },
}, { timestamps: true });

const OrderModel = mongoose.model('Order', OrderSchema);

export default OrderModel;