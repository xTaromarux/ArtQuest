import sentry_sdk
from prometheus_client import Counter
from opentelemetry import trace
from config import SENTRY_DSN

# Inicjalizacja Sentry (jeśli DSN jest podany)
if SENTRY_DSN:
    sentry_sdk.init(SENTRY_DSN)

# Inicjalizacja licznika Prometheus
REQUEST_COUNTER = Counter('grpc_requests_total', 'Total number of gRPC requests')

# OpenTelemetry tracer
tracer = trace.get_tracer(__name__)
