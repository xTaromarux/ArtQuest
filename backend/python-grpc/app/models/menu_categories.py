from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class MenuCategory(Base):
    __tablename__ = "menu_categories"
    
    id = Column(Integer, primary_key=True, index=True, comment="Unique identifier for the category")
    
    name = Column(String(255), nullable=False, comment="Category name")
    description = Column(Text, nullable=True, comment="Optional description of the category")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), comment="Timestamp when the category was created")
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), comment="Timestamp when the category was last updated")
    
    items = relationship("MenuItem", back_populates="category", cascade="all, delete-orphan", comment="Relationship to menu items in this category")
