module.exports = {
  dsn: process.env.SENTRY_DSN || 'https://examplePublicKey@o0.ingest.sentry.io/0',
  environment: process.env.NODE_ENV || 'development',
  release: 'artquest@1.0.0',
  tracesSampleRate: 1.0
};
