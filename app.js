import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import authRoutes from './src/routes/authRoutes.js';
import homeRoutes from './src/routes/homeRoutes.js';

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)); // Simular retraso en respuestas para el loader

dotenv.config();
const app = express();
const __dirname = path.resolve();

const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME;
const SESSION_SECRET = process.env.SESSION_SECRET;
export const BANK_ACCOUNTS_API = process.env.BANK_ACCOUNTS_API;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(express.static('public'));

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/', homeRoutes);
app.use('/auth', authRoutes);

server.listen(PORT, () => {
    console.log(`Server ${APP_NAME} is running on port ${PORT}`);
});