const express = require('express');
const router = express.Router();
/**
 * Imports the 'register' and 'login' controller functions from the authController module.
 * These functions handle user registration and login logic for authentication routes.
 */
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
