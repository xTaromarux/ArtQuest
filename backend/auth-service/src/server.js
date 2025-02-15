require('dotenv').config();
const express = require('express');
const passport = require('passport');
const authRoutes = require('./src/routes/authRoutes');

// Inicjalizacja konfiguracji Passport (strategia local)
require('./src/middlewares/passportConfig');

const app = express();
const PORT = process.env.PORT || 4000;

// Parsowanie JSON i danych z formularza
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Inicjalizacja Passport
app.use(passport.initialize());

// Konfiguracja dokumentacji Swagger
const { swaggerUi, specs } = require('./src/docs/swagger');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Endpointy autoryzacyjne
app.use('/api/auth', authRoutes);

// Prosta trasa główna
app.get('/', (req, res) => {
  res.send('Auth Service is running.');
});

app.listen(PORT, () => {
  console.log(`Auth-service uruchomiony na porcie ${PORT}`);
});
