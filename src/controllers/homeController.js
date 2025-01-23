import axios from "axios";
import User from "../models/user.js";
import { BANK_ACCOUNTS_API } from "../../app.js";
import { delay } from "../../app.js";

export const getAccountDetails = async (req, res) => {
    const { token, userId } = req.session;
    const apiURL = BANK_ACCOUNTS_API + `/api/users/${userId}`;

    try {
        req.io.emit('progress', 'Conectando con el servidor...');
        await delay(2000);// Simular retraso en respuestas para el loader
        const response = await axios.get(apiURL, {
            headers: {
                'Authorization': token
            }
        });

        const {username, email} = response.data;

        const user = new User(email, username);

        req.io.emit('progress', 'Datos de usuario obtenidos exitosamente. Redirigiendo...');
        await delay(2000);// Simular retraso en respuestas para el loader
        res.render('account', { user });
    } catch (error) {
        req.io.emit('progress', 'Error al obtener datos del usuario.');
        await delay(2000);// Simular retraso en respuestas para el loader
        res.status(500).render('home', {error: 'Error al obtener los datos del usuario'});
    }
}