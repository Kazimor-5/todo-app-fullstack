const express = require('express');
const router = express.Router();

const {
  getAllTodos,
  getTodo,
  updateTodo,
  createTodo,
  deleteTodo,
} = require('../controllers/todo');

router.route('/').get(getAllTodos).post(createTodo);
router.route('/:id').get(getTodo).patch(updateTodo).delete(deleteTodo);

module.exports = router;
