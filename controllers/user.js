import { userModel } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ErrorHanlder } from '../utils/errorHanlder.js';
export const userRegisteration = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return next(new ErrorHanlder('User Already Exists', 400));
    } else {
      const hashedPass = await bcrypt.hash(password, 10);
      const user = await userModel.create({ name, email, password: hashedPass });

      const token = jwt.sign(user.id, 'loginToken');
      res.status(201).json({ success: true, user, token: token });
    }
  } catch (error) {
    return console.log(error.errors.message);
    // next(error.errors.message);
  }
};
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    const decodePass = await bcrypt.compare(password, user.password);
    if (decodePass) {
      const token = jwt.sign(user.id, 'loginToken');

      // res.cookie('_id', token).json({ user, token: token });
      res.cookie('token', token, { sameSite: 'none', secure: true }).json({ success: true, message: 'logged' });
    } else {
      res.status(500).json({ message: 'Invalid Credentials!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Invalid Credentials!' });
  }
};
export const userLogout = async (req, res) => {
  const token = req.headers.authorization;
  try {
    const id = jwt.verify(token.split(' ')[1], 'loginToken');
    const user = await userModel.findById(id);
    res.json({ message: 'Logged Out' });
  } catch (error) {
    res.status(500).json({ message: 'Unauthorized' });
  }
};
