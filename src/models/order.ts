import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  
  // Cím adatok
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  
  // Mit vett?
  products: [{
    name: String,
    price: Number,
    quantity: Number
  }],
  
  // Pénzügyek
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Feldolgozás alatt' }, // Státuszok: Feldolgozás alatt, Szállítás alatt, Kézbesítve
}, { timestamps: true });

// Kisbetűs hivatkozás, hogy biztosan működjön
const Order = models.Order || model('Order', OrderSchema);

export default Order;
    