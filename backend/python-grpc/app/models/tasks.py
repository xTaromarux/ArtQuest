from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database import Base

class Task(Base):
    __tablename__ = 'tasks'
    
    id = Column(Integer, primary_key=True, comment="Unique identifier for the task")
    
    title = Column(String(255), nullable=False, comment="Title of the task")
    description = Column(String(1024), comment="Detailed description of the task")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), comment="Timestamp when the task was created")
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), comment="Timestamp when the task was last updated")
