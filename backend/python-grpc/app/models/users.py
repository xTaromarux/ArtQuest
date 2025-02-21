from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True, comment="Unique identifier for the user")
    
    email = Column(String(255), unique=True, nullable=False, index=True, comment="User email address")
    hashed_password = Column(String(255), nullable=True, comment="User's hashed password")
    login = Column(String(255), nullable=True, comment="User login identifier")
    google_id = Column(String(255), nullable=True, comment="User identifier from Google")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), comment="Timestamp when the user was created")
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), comment="Timestamp when the user was last updated")
    
    favorite_restaurants = relationship(
        "UserFavoriteRestaurant",
        back_populates="user",
        cascade="all, delete-orphan",
        comment="Relationship to the user's favorite restaurants"
    )
    favorite_menu_items = relationship(
        "UserFavoriteMenuItem",
        back_populates="user",
        cascade="all, delete-orphan",
        comment="Relationship to the user's favorite menu items"
    )
    submitted_restaurants = relationship(
        "Restaurant",
        back_populates="submitted_user",
        comment="Relationship to restaurants submitted by the user"
    )
    orders = relationship(
        "Order", 
        back_populates="user", 
        cascade="all, delete-orphan", 
        comment="Orders placed by the user")
