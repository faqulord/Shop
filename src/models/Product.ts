import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discountText: { type: String, default: '-50% AKCIÓ' },
  imageUrl: { type: String, default: '/product.jpg' },
  reviewsCount: { type: Number, default: 1240 },
  rating: { type: Number, default: 4.9 },
}, { timestamps: true });

// Ha már létezik a modell, ne hozza létre újra (Next.js hiba elkerülése)
const Product = models.Product || model('Product', ProductSchema);

export default Product;
