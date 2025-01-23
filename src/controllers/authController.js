import axios from "axios";
import User from "../models/user.js";
import { BANK_ACCOUNTS_API } from "../../app.js";


export const signup = async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !password || !username) {
        return res.status(400).send('Faltan campos requeridos: email, password, username');
    }

    const user = new User(email, username, password);
    const apiURL = BANK_ACCOUNTS_API + "/auth/signup";

    try {
        const response = await axios.post(apiURL, user);

        if (response.data === 'Username already taken') {
            return res.status(400).send('El nombre de usuario ya está registrado');
        }

        res.redirect('/auth/login');
    } catch (error) {
        res.status(401).send(error.response.data || 'Error al registrar usuario');
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email y contraseña son requeridos');
    }

    const user = new User(email, null, password);
    const apiURL = BANK_ACCOUNTS_API + "/auth/login";

    try {
        const response = await axios.post(apiURL, user);

        if (!response.data || !response.data.id || !response.data.token) {
            return res.status(500).send('Error al recibir los datos de autenticación');
        }

        const { id, token } = response.data;

        req.session.userId = id;
        req.session.token = token;

        res.redirect('/');
    } catch (error) {
        res.status(401).send(error.response.data || 'Error de autenticación');
    }
};