import enum
from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey, Enum, func
from sqlalchemy.orm import relationship
from app.database import Base

class ApprovalStatus(enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"

class Restaurant(Base):
    __tablename__ = 'restaurants'
    
    id = Column(Integer, primary_key=True, index=True, comment="Unique identifier for the restaurant")
    
    name = Column(String(255), nullable=False, comment="Restaurant name")
    street = Column(String(255), nullable=False, comment="Street address and number")
    city = Column(String(100), nullable=False, comment="City")
    state = Column(String(100), nullable=True, comment="State/region (optional)")
    country = Column(String(100), nullable=False, comment="Country")
    postal_code = Column(String(20), nullable=True, comment="Postal code")
    phone = Column(String(50), nullable=True, comment="Phone number")
    description = Column(Text, nullable=True, comment="Restaurant description")
    cuisine = Column(String(100), nullable=True, comment="Cuisine type (e.g., Italian, Asian)")
    rating = Column(Float, default=0, comment="Average rating")
    opening_hours = Column(String(100), nullable=True, comment="Opening hours")
    logo_url = Column(String(255), nullable=True, comment="URL to the restaurant logo/icon")
    
    approval_status = Column(Enum(ApprovalStatus), default=ApprovalStatus.pending, nullable=False,
                               comment="Application status: pending, approved, or rejected")
    admin_comment = Column(Text, nullable=True,
                             comment="Administrator comment when approving or rejecting the submission")
    submitted_by = Column(Integer, ForeignKey('users.id'), nullable=True,
                            comment="ID of the user who submitted the restaurant")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), comment="Record creation timestamp")
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), comment="Record update timestamp")
    
    menus = relationship(
        "Menu", 
        back_populates="restaurant")
    
    favorited_by_users = relationship(
        "UserFavoriteRestaurant", 
        back_populates="restaurant",
        cascade="all, delete-orphan")
    
    submitted_user = relationship(
        "User", 
        back_populates="submitted_restaurants")
    
    orders = relationship(
        "Order", 
        back_populates="restaurant", 
        cascade="all, delete-orphan")
