// server.js
require('dotenv').config(); // Ładowanie zmiennych środowiskowych
const express = require('express');
const passport = require('passport');
const app = express();
const port = process.env.PORT || 4000;

// Parsowanie JSON w żądaniach
app.use(express.json());

// Inicjalizacja Passport
require('./src/middlewares/passportConfig');
app.use(passport.initialize());

// Konfiguracja dokumentacji Swagger (pod /docs)
const { swaggerUi, specs } = require('./src/docs/swagger');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Prosta trasa główna, dostępna pod "/"
app.get('/', (req, res) => {
  res.send('Auth Service is running.');
});

// Routing dla endpointów autoryzacyjnych (pod /api/auth)
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Auth-service uruchomiony na porcie ${port}`);
});
