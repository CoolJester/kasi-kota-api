const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  orderId: {
    type: String,
    required: [true],
    unique: true,
  },
  userId: {
    type: String
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: {
    type: String,
    required: [true]
  },
  paymentMethod: {
    type: String,
    required: [true]
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  delivary: {
    type: String
  },
  notes: {
    type: String,
    default: 'No additional instructions'
  }
},
{
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);