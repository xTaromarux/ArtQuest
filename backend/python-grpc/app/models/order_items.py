
from sqlalchemy import Column, Integer, DateTime, Float, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(Integer, primary_key=True, comment="Unique identifier for the order item")
    
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False, comment="Foreign key to the order")
    menu_item_id = Column(Integer, ForeignKey("menu_items.id"), nullable=False, comment="Foreign key to the menu item")
    quantity = Column(Integer, nullable=False, comment="Quantity of the menu item ordered")
    unit_price = Column(Float, nullable=False, comment="Unit price of the menu item at the time of order")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), comment="Timestamp when the order item was created")
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), comment="Timestamp when the order item was last updated")
    
    order = relationship(
        "Order",
        back_populates="items")
    
    menu_item = relationship(
        "MenuItem")
