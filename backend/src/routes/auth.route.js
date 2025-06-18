import express from 'express';
import {
  login,
  logout,
  signup,
  onboard,
} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// AUTH ROUTES

// Signup - Registers a new user
router.post('/signup', signup);

// Login - Authenticates user
router.post('/login', login);

// Logout - Clears user session or token
router.post('/logout', logout);

// Onboarding - Requires authentication (user must be logged in)
router.post('/onboarding', protectRoute, onboard);

// Get current authenticated user info
router.get('/me', protectRoute, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;
