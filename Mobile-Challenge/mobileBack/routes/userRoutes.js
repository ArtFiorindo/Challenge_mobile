const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota para cadastro de usuário
router.post('/register', userController.registerUser);

// Rota para login de usuário
router.post('/login', userController.loginUser);

// Rota para redefinição de senha
router.post('/reset-password', userController.resetPassword);

// Rotas protegidas (requerem autenticação)
router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/update-email', authMiddleware, userController.updateUserEmail);

module.exports = router;