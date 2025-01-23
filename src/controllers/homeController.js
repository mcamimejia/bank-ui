import axios from "axios";
import User from "../models/user.js";
import { BANK_ACCOUNTS_API } from "../../app.js";

export const getAccountDetails = async (req, res) => {
    const { token, userId } = req.session;
    const apiURL = BANK_ACCOUNTS_API + `/api/users/${userId}`;

    try {
        const response = await axios.get(apiURL, {
            headers: {
                'Authorization': token
            }
        });

        const {username, email} = response.data;

        const user = new User(email, username);
        res.render('account', { user });
    } catch (error) {
        res.status(500).send('Error al obtener los datos del usuario');
    }
}