const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: String,
    veg: Boolean,
    description: String,
    imageUrl: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);
