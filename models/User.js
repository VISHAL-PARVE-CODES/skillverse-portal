const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  dob: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' },
  status: { type: String, default: 'Active' },
  createdAt: { type: Date, default: Date.now }
}, { strict: false }); // Kisi bhi field ko reject nahi karega

module.exports = mongoose.model('User', userSchema);