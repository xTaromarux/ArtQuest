import grpc
from prometheus_client import Counter
import sentry_sdk
from config import SENTRY_DSN
from repository import get_task, create_task
import task_pb2
import task_pb2_grpc

# Inicjalizacja Sentry, jeśli DSN jest podany
if SENTRY_DSN:
    sentry_sdk.init(SENTRY_DSN)

# Inicjalizacja licznika Prometheus
REQUEST_COUNTER = Counter('grpc_requests_total', 'Total number of gRPC requests')

# Import OpenTelemetry – ustawienie tracera
from opentelemetry import trace
tracer = trace.get_tracer(__name__)

class TaskService(task_pb2_grpc.TaskServiceServicer):
    def GetTask(self, request, context):
        with tracer.start_as_current_span("GetTask"):
            REQUEST_COUNTER.inc()
            task = get_task(request.id)
            if task:
                return task_pb2.TaskResponse(
                    id=task.id,
                    title=task.title,
                    description=task.description
                )
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details('Task not found')
            return task_pb2.TaskResponse()

    def CreateTask(self, request, context):
        with tracer.start_as_current_span("CreateTask"):
            REQUEST_COUNTER.inc()
            new_task = create_task(request.title, request.description)
            return task_pb2.TaskResponse(
                id=new_task.id,
                title=new_task.title,
                description=new_task.description
            )
