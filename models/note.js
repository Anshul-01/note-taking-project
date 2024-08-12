const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

noteSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
