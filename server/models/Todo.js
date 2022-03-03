const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'vous devez donner un nom'],
    trim: true,
    maxlength: [20, 'le nom ne peut pas avoir plus de 20 caractères'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Todo', TodoSchema);
