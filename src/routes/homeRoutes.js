import express from 'express';
import { getAccountDetails } from '../controllers/homeController';

const router = express.Router();

const checkSession = (req, res, next) => {
    if (!req.session.token || !req.session.userId ) {
        return res.redirect('/auth/login');
    }
    next();
}

router.get('/', checkSession, (req, res) => {
    res.render('home');
});

router.get('/account', checkSession, getAccountDetails);

export default router;