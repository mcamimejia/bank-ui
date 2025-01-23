import axios from "axios";
import User from "../models/user.js";
import { BANK_ACCOUNTS_API } from "../../app.js";


export const signup = async (req, res) => {
    const { email, username, password } = req.body;

    if (!username || username.length < 6) {
        return res.status(400).render('signup', { error: 'El nombre de usuario debe tener al menos 6 caracteres.' });
    }

    if (!password || password.length < 6) {
        return res.status(400).render('signup', { error: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).render('signup', {error: 'El formato del correo electrónico no es válido'});
    }

    const user = new User(email, username, password);
    const apiURL = BANK_ACCOUNTS_API + "/auth/signup";

    try {
        const response = await axios.post(apiURL, user);

        if (response.data === 'Username already taken') {
            return res.status(400).render('signup', {error:'El nombre de usuario ya está registrado'});
        }

        res.redirect('/auth/login');
    } catch (error) {
        res.status(401).render('signup', {error: error.response.data || 'Error al registrar usuario'});
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || username.length < 6) {
        return res.status(400).render('login', { error: 'El nombre de usuario debe tener al menos 6 caracteres.' });
    }

    if (!password || password.length < 6) {
        return res.status(400).render('login', { error: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    const user = new User(null, username, password);
    const apiURL = BANK_ACCOUNTS_API + "/auth/login";

    try {
        const response = await axios.post(apiURL, user);

        if (!response.data || !response.data.id || !response.data.token) {
            return res.status(500).render('login', {error:'Error al recibir los datos de autenticación'});
        }

        const { id, token } = response.data;

        req.session.userId = id;
        req.session.token = token;

        res.redirect('/');
    } catch (error) {
        res.status(401).render('login', {error: error.response.data || 'Error de autenticación'});
    }
};

export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).render('home', {error: 'Error al cerrar sesión'});
        }
        res.redirect('/auth/login');
    });
}