import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { password, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const doc = new UserModel({
      email,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      { 
        _id: user._id,
      },
      'secretKeyForUser',
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.status(201).json({
      token,
      ...userData,
    });
  } catch (error) {
    console.log('register Error:', error);

    res.status(500).json({
      message: 'Register failed',
    });
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isPasswordValue = await bcrypt.compare(
      password,
      user._doc.passwordHash,
    );

    if (!isPasswordValue) {
      return res.status(404).json({
        message: 'Wrong email or password',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secretKeyForUser',
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.status(200).json({
      token,
      ...userData,
    });
  } catch (error) {
    console.log('login Error:', error);

    res.status(500).json({
      message: 'Login failed',
    });
  }
}

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.status(200).json({ ...userData });
  } catch (error) {
    console.log('getUserInfo Error:', error);

    res.status(500).json({
      message: 'Data fetching failed',
    });
  }
}
