import os

# Łącze do bazy danych PostgreSQL (zmień dane w zależności od środowiska)
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://user:password@localhost:5432/artquest')

# Port, na którym uruchamiany będzie serwer gRPC
GRPC_PORT = int(os.getenv('GRPC_PORT', 50051))

# Port, na którym wystawiane są metryki Prometheus
PROMETHEUS_PORT = int(os.getenv('PROMETHEUS_PORT', 8000))

# DSN do Sentry (opcjonalnie)
SENTRY_DSN = os.getenv('SENTRY_DSN', '')
