import { todoModel } from '../models/todo.js';

export const getAllTodos = () => async (req, res) => {
  try {
    const todos = await todoModel.find({});
    res.json({ todos });
  } catch (error) {
    res.status(404).json({ message: 'error while fetching' });
  }
};
export const getTodoById = () => async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await todoModel.findById(id);
    res.json({ todo });
  } catch (error) {
    res.status(404).json({ message: 'Todo not found' });
  }
};
export const addTodo = () => async (req, res) => {
  const { title, desc } = req.body;

  try {
    await todoModel.create({ title, desc });
    res.status(201).json({ message: 'Todo Added' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to insert' });
  }
};
export const updateTodo = () => async (req, res) => {
  const id = req.params.id;
  const { title, desc } = req.body;
  try {
    await todoModel.findByIdAndUpdate(id, { title, desc });
    res.json({ message: 'Todo Updated' });
  } catch (error) {
    res.status(501).json({ message: 'Failed to update' });
  }
};
export const deleteTodo = () => async (req, res) => {
  const id = req.params.id;
  try {
    await todoModel.findByIdAndDelete(id);
    res.json({ message: 'Todo Deleted' });
  } catch (error) {
    res.status(501).json({ message: 'Failed to delete' });
  }
};
