const client = require('prom-client');
client.collectDefaultMetrics();

module.exports = {
  metricsEndpoint: async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  }
};
