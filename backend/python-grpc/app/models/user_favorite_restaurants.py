from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class UserFavoriteRestaurant(Base):
    __tablename__ = "user_favorite_restaurants"
    
    id = Column(Integer, primary_key=True, index=True, comment="Unique identifier for the favorite restaurant record")
    
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False, comment="Foreign key to the user")
    restaurant_id = Column(Integer, ForeignKey('restaurants.id'), nullable=False, comment="Foreign key to the restaurant")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), comment="Timestamp when the record was created")
    
    user = relationship("User", back_populates="favorite_restaurants")
    restaurant = relationship("Restaurant", back_populates="favorited_by_users")
