import express from "express";
import { getAllUser, signup,login } from "../controllers/user-controller.js";
import jwt from 'jsonwebtoken';
import secretKey from '../config.js';
import { refreshTokenSecret, accessTokenExpiresIn } from '../config.js';

const router = express.Router();
router.get("/", getAllUser);
router.post("/signup", signup)
router.post("/login", login)

router.post('/refresh-token', async (req, res) => {
  const refreshToken = req.body.refreshToken;

  try {
    const decoded = jwt.verify(refreshToken, refreshTokenSecret);

    const accessToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email },
      secretKey,
      { expiresIn: accessTokenExpiresIn }
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.log('Refresh token error:', error);
    return res.status(401).json({ message: 'Invalid refresh token.' });
  }
});

export default router;
