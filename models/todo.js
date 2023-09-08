import mongoose from 'mongoose';

const schema = mongoose.Schema({ title: String, desc: String });
export const todoModel = mongoose.model('todos', schema);
