const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
  name: {
    type: String,
    default: 'base',
    trim: true,
    required: [true],
    unique: true,
  },
  price: {
    type: Number,
  },
  imageUrl: {
    type: String  
  },
  items: [{type: String}]
},
{
    timestamps: true
});

module.exports = mongoose.model('Menu', menuSchema);