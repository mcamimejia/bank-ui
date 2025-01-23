import express from 'express';
import { signup, login, logout } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/login', (req, res) => {
    res.render('login', {error: null});
});

router.get('/signup', (req, res) => {
    res.render('signup', {error: null});
});

export default router;