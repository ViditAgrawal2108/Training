from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware 
app = FastAPI()

models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:3001"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

## basically allpws to take information from the different routes and use it in the database 

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

class Item(BaseModel):
    name : str = Field(min_length=1)
    price : int = Field(gt=-1)
    description: str = Field(min_length=1, max_length=100)
    rating: int = Field(gt=-1, le=5)
    category: str = Field(min_length=1, max_length=100)
    quantity: int = Field(gt=-1) 

class User(BaseModel):

    name: str = Field(min_length=1, max_length=100)
    email: str = Field(min_length=1, max_length=100)
    password: str = Field(min_length=2, max_length=100)
    user_type : str = Field(min_length=1, max_length=100)

class Order(BaseModel):
    user_id: int = Field(gt=0)
    total_price: int = Field(gt=-1)

class Cart(BaseModel):
    user_id: int = Field(gt=0)
    product_id: int = Field(gt=0)
    total_price: int = Field(gt=-1)

@app.get("/all_items")
def get_items(db: Session = Depends(get_db)):
    return db.query(models.items).all()

@app.get("/category_items{category}")
def get_items(category : str , db: Session = Depends(get_db)):
    return db.query(models.items).filter(models.items.category == category ).all()

@app.post("/items")
def create_Item(item: Item, db: Session = Depends(get_db)):

    Item_model = models.items()
    Item_model.name = item.name
    Item_model.description = item.description
    Item_model.rating = item.rating
    Item_model.category = item.category
    Item_model.price = item.price
    Item_model.quantity = item.quantity
    db.add(Item_model)
    db.commit()

    return item

@app.put("/items{item_id}")
def update_Item(item_id: int, item : Item, db: Session = Depends(get_db)):

    Item_model = db.query(models.items).filter(models.items.id == item_id).first()

    if Item_model is None:
        raise HTTPException(
            status_code=404,
            detail=f"ID {item_id} : Does not exist"
        )
    
    Item_model.name = item.name
    Item_model.description = item.description
    Item_model.rating = item.rating
    Item_model.category = item.category
    Item_model.price = item.price
    Item_model.quantity = item.quantity
    
    db.add(Item_model)
    db.commit()

    return item


@app.delete("/items{Item_id}")
def delete_Item(Item_id : int, db: Session = Depends(get_db)):

    Item_model = db.query(models.items).filter(models.items.id == Item_id).first()

    if Item_model is None:
        raise HTTPException(
            status_code=404,
            detail=f"ID {Item_id} : Does not exist"
        )

    db.query(models.items).filter(models.items.id == Item_id).delete()
    db.commit()

@app.get("/users")
def get_user(db: Session = Depends(get_db)):
    return db.query(models.users).all()

@app.post("/users")
def create_user(user: User, db: Session = Depends(get_db)):

    user_model = models.users()
    user_model.name = user.name
    user_model.email = user.email
    user_model.password = user.password
    user_model.user_type = user.user_type
    db.add(user_model)
    db.commit()

    return user

@app.put("/users{user_id}")
def update_user(user_id: int, user: User, db: Session = Depends(get_db)):

    user_model = db.query(models.users).filter(models.users.id == user_id).first()

    if user_model is None:
        raise HTTPException(
            status_code=404,
            detail=f"ID {user_id} : Does not exist"
        )
    
    user_model.name = user.name
    user_model.email = user.email
    user_model.password = user.password
    user_model.user_type = user.user_type
    db.add(user_model)
    db.commit()

    return user

@app.get("/orders")
def get_orders(db: Session = Depends(get_db)):
    return db.query(models.orders).all()

# @app.get("/cart/{user_id}")
# def get_cart(db: Session = Depends(get_db) , user_id: int = None): 
#     if user_id is not None:
#         return db.query(models.Cart).filter(models.Cart.user_id == user_id).all()

@app.get("/cart/{user_id}")
def get_cart(user_id: int, db: Session = Depends(get_db)):
    cart_items = (
        db.query(models.Cart, models.items)
        .join(models.items, models.Cart.product_id == models.items.id)
        .filter(models.Cart.user_id == user_id)
        .all()
    )

    return [
        {
            "name": item.name,
            "category": item.category,
            "description": item.description,
            "rating": item.rating,
            "price": cart.total_price  # Or item.price, if desired
        }
        for cart, item in cart_items
    ]
@app.post("/cart")
def create_cart(cart: Cart, db: Session = Depends(get_db)):

    cart_model = models.Cart()
    cart_model.user_id = cart.user_id
    cart_model.product_id = cart.product_id
    cart_model.total_price = cart.total_price
    db.add(cart_model)
    db.commit()

    return cart

@app.post("/all_orders")
def create_order(order: Order, db: Session = Depends(get_db)):

    order_model = models.orders()
    order_model.user_id = order.user_id
    order_model.total_price = order.total_price
    db.add(order_model)
    db.commit()

    return order

