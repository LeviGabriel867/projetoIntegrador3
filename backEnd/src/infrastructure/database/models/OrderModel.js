import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    mesa: {type: Number, required: true},
    descricao: {type: String, required: true},
    status: {
        type: String,
        enum: ['EM_ESPERA', 'PREPARANDO', 'FINALIZADO'],
        default: 'EM_ESPERA',
        required: true
    },
}, {
    timestamps: true
})
const OrderModel = mongoose.model('Order', OrderSchema, 'orders');
export default OrderModel;