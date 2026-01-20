import mongoose, { Schema, model, models } from 'mongoose';

const ReviewSchema = new Schema({
  author: { type: String, required: true }, // Pl: "Kovács Kinga"
  text: { type: String, required: true },   // A vélemény szövege
  rating: { type: Number, default: 5 },     // Hány csillag?
  date: { type: String, default: '2 órája' }, // Mikor írta (kamu idő)
  likes: { type: Number, default: 0 },      // Hány like van rajta
  hasPhoto: { type: Boolean, default: false }, // Van-e csatolt kép?
  verified: { type: Boolean, default: true } // "Igazolt vásárló"
}, { timestamps: true });

const Review = models.Review || model('Review', ReviewSchema);

export default Review;
