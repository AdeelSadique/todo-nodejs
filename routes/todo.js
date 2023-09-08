import express from 'express';
import cors from 'cors';

import { addTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from '../controllers/todo.js';

const router = express.Router();
router.use(express.json());
router.use(cors({ origin: '*' }));

router.get('/todo', getAllTodos());
router.get('/todo/:id', getTodoById());
router.post('/todo', addTodo());
router.put('/todo/:id', updateTodo());
router.delete('/todo/:id', deleteTodo());

export default router;
