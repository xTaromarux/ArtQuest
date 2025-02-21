from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class Menu(Base):
    __tablename__ = "menus"
    
    id = Column(Integer, primary_key=True, index=True, comment="Unique identifier for the menu")
                                    
    restaurant_id = Column(Integer, ForeignKey('restaurants.id'), nullable=False, comment="Foreign key to the restaurant")
    name = Column(String(255), nullable=False, comment="Name of the menu")
    description = Column(Text, nullable=True, comment="Description of the menu")
                  
    created_at = Column(DateTime(timezone=True), server_default=func.now(), comment="Timestamp when the menu was created")
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), comment="Timestamp when the menu was last updated")
    
    restaurant = relationship("Restaurant", back_populates="menus", comment="Relationship to the restaurant")
    items = relationship("MenuItem", back_populates="menu", cascade="all, delete-orphan", comment="Relationship to the menu items")
