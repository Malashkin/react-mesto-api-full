const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

require('dotenv').config();

const PORT = 3001;

const CORS_CONFIG = {
  credentials: true,
  origin: [
    'http://malashkin.nomoredomains.xyz',
    'https://malashkin.nomoredomains.xyz',
    'https://localhost:3000',
    'http://localhost:3000',
  ],
  method: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(CORS_CONFIG));
app.use(limiter);
app.use(helmet());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', auth);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', () => {
  throw new NotFoundError('Страницы не существует.');
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listener on port ${PORT}`);
  });
}

main();
