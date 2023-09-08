import mongoose from 'mongoose';

let schema = new mongoose.Schema({
  name: { type: String, required: true, minlength: [5, 'this is error'] },
  email: { type: String, unique: [true, 'email must be different'] },
  password: { type: String, required: true, minlength: [5, 'this is pass error'] },
});
export const userModel = mongoose.model('users', schema);
