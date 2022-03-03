const Todo = require('../models/Todo');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-errors');

const getAllTodos = asyncWrapper(async (req, res) => {
  const todos = await Todo.find({});

  res.status(200).json(todos);
});

const getTodo = asyncWrapper(async (req, res, next) => {
  const { id: todoID } = req.params;
  const todo = await Todo.findOne({ _id: todoID });

  if (!todo) {
    return next(
      createCustomError(
        `Il n'y a pas de tâche correspondant à l'id: ${todoID}`,
        404
      )
    );
  }

  res.status(200).json({ todo });
});

const updateTodo = asyncWrapper(async (req, res, next) => {
  const { id: todoID } = req.params;
  const todo = await Todo.findOneAndUpdate({ _id: todoID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    return next(
      createCustomError(
        `Il n'y a pas de tâche correspondant à l'id: ${todoID}`,
        404
      )
    );
  }

  res.status(201).json({ todo });
});

const createTodo = asyncWrapper(async (req, res) => {
  const todo = await Todo.create(req.body);

  res.status(201).json({ todo });
});

const deleteTodo = asyncWrapper(async (req, res, next) => {
  const { id: todoID } = req.params;
  const todo = await Todo.findOneAndDelete({ id: todoID });

  if (!todo) {
    return next(
      createCustomError(
        `Il n'y a pas de tâche correspondant à l'id: ${todoID}`,
        404
      )
    );
  }

  res.status(200).json({ todo });
});

module.exports = {
  getAllTodos,
  getTodo,
  updateTodo,
  createTodo,
  deleteTodo,
};
