const { Tracer, BatchRecorder, jsonEncoder: { JSON_V2 } } = require('zipkin');
const CLSContext = require('zipkin-context-cls');
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;

const ctxImpl = new CLSContext('zipkin');

// Poprawiony logger z metodą logSpan
const logger = {
  logSpan: (span) => {
    console.log('Zipkin span:', span);
  }
};

const recorder = new BatchRecorder({ logger });

const tracer = new Tracer({
  ctxImpl,
  recorder,
  localServiceName: 'node-service',
  jsonEncoder: JSON_V2
});

module.exports = {
  expressMiddleware: zipkinMiddleware({ tracer })
};
