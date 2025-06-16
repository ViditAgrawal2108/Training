from sqlalchemy import Column, Integer, String , ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from database import Base


class items(Base):
    __tablename__ = "Items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    price = Column(Integer)
    description = Column(String)
    rating = Column(Integer)
    category = Column(String)
    quantity = Column(Integer, default=0)  # Added quantity field for stock management

class users(Base):
    __tablename__ = "Users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    password = Column(String)
    user_type = Column(String)  # e.g., 'admin', 'customer' 


class orders(Base):
    __tablename__ = "Orders"

    order_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer ,  ForeignKey('Users.id'))
    total_price = Column(Integer)  

class Cart(Base):
    __tablename__ = "Cart"

    cart_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('Users.id'))
    product_id =  Column(Integer, ForeignKey('Items.id')) 
    total_price = Column(Integer, default=0) 

