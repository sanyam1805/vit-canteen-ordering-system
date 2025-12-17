const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    items: [
      {
        name: String,
        qty: Number,
        price: Number
      }
    ],
    paymentMethod: {
      type: String,
      enum: ['upi', 'cash']
    },
    paid: {
      type: Boolean,
      default: false
    },
    totals: {
      subtotal: Number,
      tax: Number,
      grand: Number
    },
    status: {
      type: String,
      enum: ['Pending', 'Ready', 'Delivered'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
