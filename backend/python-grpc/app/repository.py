from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Task
from config import DATABASE_URL

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)

def get_task(task_id: int):
    session = Session()
    task = session.query(Task).filter(Task.id == task_id).first()
    session.close()
    return task

def create_task(title: str, description: str):
    session = Session()
    new_task = Task(title=title, description=description)
    session.add(new_task)
    session.commit()
    session.refresh(new_task)
    session.close()
    return new_task
