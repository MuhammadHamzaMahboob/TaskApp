import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import secretKey from '../config.js';

export const signup = async (req, res, next) => {
  const { name, email, password, group } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res.status(500).json({ message: 'Signup failed. Please try again later.' });
  }

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  let hashedPassword;
  try {
    const saltRounds = 10;
    hashedPassword = await bcrypt.hash(password, saltRounds);
  } catch (err) {
    return res.status(500).json({ message: 'Signup failed. Please try again later.' });
  }

  const user = new User({
    name,
    email,
    password: hashedPassword,
    group,
  });

  try {
    await user.save();
  } catch (err) {
    return res.status(500).json({ message: 'Signup failed. Please try again later.' });
  }
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    secretKey,
    { expiresIn: '1h' } // Token will expire in 1 hour
  );
  return res.status(201).json({ user, token });
};



export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed. Please try again later.' });
  }

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
  }

  let passwordMatch;
  try {
    passwordMatch = await bcrypt.compare(password, user.password);
  } catch (err) {
    return res.status(500).json({ message: 'Login failed. Please try again later.' });
  }

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    secretKey,
    { expiresIn: '1h' } // Token will expire in 1 hour
  );



  return res.status(200).json({ message: 'Login successful!', user, token });
};

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found." })
  }
  return res.status(200).json({ users })
};
