from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class UserFavoriteMenuItem(Base):
    __tablename__ = "user_favorite_menu_items"
    
    id = Column(Integer, primary_key=True, index=True, comment="Unique identifier for the favorite menu item record")
    
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False, comment="Foreign key to the user")
    menu_item_id = Column(Integer, ForeignKey('menu_items.id'), nullable=False, comment="Foreign key to the menu item")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), comment="Timestamp when the record was created")
    
    user = relationship("User", back_populates="favorite_menu_items", comment="Relationship to the User model")
    menu_item = relationship("MenuItem", back_populates="favorited_by_users", comment="Relationship to the MenuItem model")
