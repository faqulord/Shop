import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  product: { type: String, default: "Lipses Lip Plumper" },
  status: { type: String, default: 'fizetesre_var' }, // Most már elfogadja ezt is!
  price: { type: Number, default: 12990 },
  createdAt: { type: Date, default: Date.now },
});

const Order = models.Order || model('Order', OrderSchema);

export default Order;