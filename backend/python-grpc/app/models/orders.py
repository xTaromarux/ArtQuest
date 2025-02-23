from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, comment="Unique identifier for the order")
    
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, comment="Foreign key to the user who placed the order")
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"), nullable=True, comment="Foreign key to the restaurant (if applicable)")
    total_amount = Column(Float, nullable=True, comment="Total amount of the order")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), comment="Timestamp when the order was created")
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), comment="Timestamp when the order was last updated")
    
    items = relationship(
        "OrderItem", 
        back_populates="order", 
        cascade="all, delete-orphan")
    
    user = relationship(
        "User", 
        back_populates="orders")
    
    restaurant = relationship(
        "Restaurant", 
        back_populates="orders")