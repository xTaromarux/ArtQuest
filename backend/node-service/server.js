require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Inicjalizacja Sentry
const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_DSN || '' });
app.use(Sentry.Handlers.requestHandler());

// Inicjalizacja Zipkin – middleware śledzenia
const { expressMiddleware: zipkinMiddleware } = require('./src/services/tracing');
app.use(zipkinMiddleware);

app.use(express.json());

// Prosta trasa główna
app.get('/', (req, res) => {
  res.send('Node-service działa!');
});

// Endpoint do metryk Prometheus
const metricsService = require('./src/services/metricsService');
app.get('/metrics', metricsService.metricsEndpoint);

// Routing API (np. zadania)
const routes = require('./src/routes');
app.use('/api', routes);

// Konfiguracja Swaggera – dokumentacja API
const { swaggerUi, specs } = require('./src/docs/swagger');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Obsługa błędów przez Sentry
app.use(Sentry.Handlers.errorHandler());

app.listen(port, () => {
  console.log(`Node-service uruchomiony na porcie ${port}`);
});
