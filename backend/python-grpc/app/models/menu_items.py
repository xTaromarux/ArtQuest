from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class MenuItem(Base):
    __tablename__ = "menu_items"
    
    id = Column(Integer, primary_key=True, index=True, comment="Unique identifier for the menu item")
    
    menu_id = Column(Integer, ForeignKey('menus.id'), nullable=False, comment="Foreign key to the menu")
    name = Column(String(255), nullable=False, comment="Name of the menu item")
    description = Column(Text, nullable=True, comment="Description of the menu item")
    price = Column(Float, nullable=False, comment="Price of the menu item")
    currency = Column(String(20), nullable=False, comment="Currency of the price")
    image_url = Column(String(255), nullable=True, comment="URL for the image/icon of the menu item")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), comment="Timestamp when the item was created")
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), comment="Timestamp when the item was last updated")
    
    menu = relationship("Menu", back_populates="items", comment="Relationship to the parent menu")
    category = relationship("MenuCategory", back_populates="items", comment="Relationship to the menu category")
    favorited_by_users = relationship("UserFavoriteMenuItem", back_populates="menu_item", cascade="all, delete-orphan",
                                      comment="Relationship to users who favorited this menu item")
