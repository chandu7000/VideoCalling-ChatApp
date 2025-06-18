import express from 'express';
import { login, logout, signup, onboard }from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// why the post method is used here?
// The POST method is used for creating new resources on the server.
// In this case, the POST method is used for signing up a new user
// and logging in an existing user.
// POST method is for operations that change the server state
// or create new resources, while GET method is for retrieving data
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.post('/onboarding', protectRoute, onboard);

// Protect the onboarding route with the protectRoute middleware
// The protectRoute middleware will check if the user is authenticated
// Get method is used to retrieve data from the server
router.get('/me', protectRoute, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
});

export default router;