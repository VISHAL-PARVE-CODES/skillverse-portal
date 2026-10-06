const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String, default: 'tulsi dhandhal' },
  price: { type: Number, default: 499 },
  description: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['public', 'private', 'Public', 'Private'], 
    default: 'public' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);