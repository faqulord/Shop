import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  
  // --- ÚJ MEZŐK A SZERKESZTŐHÖZ ---
  originalPrice: { type: Number, required: true }, // Az áthúzott ár
  discountText: { type: String }, // Pl: "-50% AKCIÓ"
  imageUrl: { type: String, required: true }, // A termék képe
  
  reviewsCount: { type: Number, default: 0 },
  rating: { type: Number, default: 5 }
}, { timestamps: true });

const Product = models.Product || model('Product', ProductSchema);

export default Product;
