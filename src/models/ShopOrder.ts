import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  products: [{
    name: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Feldolgozás alatt' },
}, { timestamps: true });

// Itt is átírjuk a hivatkozást ShopOrder-re
const Order = models.ShopOrder || model('ShopOrder', OrderSchema);

export default Order;
