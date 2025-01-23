import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';
import homeRoutes from './routes/homeRoutes.js';

dotenv.config();
const app = express();
const __dirname = path.resolve();

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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server ${APP_NAME} is running on port ${PORT}`);
});