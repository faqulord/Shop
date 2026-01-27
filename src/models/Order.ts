import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true }, // Irányítószám, Város, Utca, Házszám egyben
  product: { type: String, default: "Lipses Lip Plumper" },
  status: { 
    type: String, 
    enum: ['uj', 'feldolgozva', 'kiszallitva'], 
    default: 'uj' 
  },
  price: { type: Number, default: 12990 }, // Ár példa
  createdAt: { type: Date, default: Date.now },
});

// Ha már létezik a modell, ne hozza létre újra (Next.js hiba elkerülése)
const Order = models.Order || model('Order', OrderSchema);

export default Order;