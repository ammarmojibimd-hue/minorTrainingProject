const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  amenities: { type: [String], default: [] },
  rating: { type: Number, default: 4.5 },
  applied: { type: Boolean, default: false },
  owner: {
    name: { type: String, default: 'Property owner' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
  },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
