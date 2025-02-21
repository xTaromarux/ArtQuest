import grpc
from instrumentation import REQUEST_COUNTER, tracer
from repository.task_repository import get_task, create_task
import task_pb2
import task_pb2_grpc


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
