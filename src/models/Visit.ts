import mongoose, { Schema, model, models } from 'mongoose';

const VisitSchema = new Schema({
  date: { type: Date, default: Date.now },
  page: { type: String, default: 'home' }
});

const Visit = models.Visit || model('Visit', VisitSchema);

export default Visit;