import grpc
from concurrent import futures
import time
from app import task_pb2_grpc
from services.tasks_service import TaskService
from config import GRPC_PORT, PROMETHEUS_PORT
from prometheus_client import start_http_server

from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor, ConsoleSpanExporter

trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)
span_processor = BatchSpanProcessor(ConsoleSpanExporter())
trace.get_tracer_provider().add_span_processor(span_processor)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    task_pb2_grpc.add_TaskServiceServicer_to_server(TaskService(), server)
    server.add_insecure_port(f'[::]:{GRPC_PORT}')
    server.start()
    print(f"gRPC server running on port {GRPC_PORT}")

    start_http_server(PROMETHEUS_PORT)
    print(f"Prometheus metrics available on port {PROMETHEUS_PORT}")

    try:
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    serve()
