from fastapi import FastAPI,HTTPException,Depends
from sqlalchemy.orm import Session
from database import get_db
from pydantic import BaseModel
from models.product_orm_model import Productnew
from fastapi.middleware.cors import CORSMiddleware
from models.product import Product
from models.ProductWithoutConstructor   import Product as ProductWithoutConstructor
app = FastAPI()
#cors technique because of different ports of  
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
"""Depends tells the fastapi before running the endpoint give me the dependancy which the endpoint needs"""

# Pydantic model for API request
class ProductRequest(BaseModel):
    name: str
    description: str
    price: float
    image_url:str

#product update model 
class ProductUpdate(BaseModel):
    name:str |None=None
    description:str |None=None
    price:float | None=None
    image_url:str |None=None
# --------------------------------
# Product without constructor
# --------------------------------

p2 = ProductWithoutConstructor()

p2.id = 10
p2.name = "Notebook"
p2.description = "Classmates notebooks are good"
p2.price = 900


# --------------------------------
# Products using normal OOP class
# --------------------------------

products = [
    Product(
        1,
        "iPhone",
        "It is very expensive but we can afford it",
        100000
    ),

    Product(
        2,
        "Laptop",
        "A powerful laptop",
        80000
    )
]

# --------------------------------
# GET /
# --------------------------------

@app.get("/")
def greet(db:Session=Depends(get_db)):
    return "Welcome to Product Management System"


# --------------------------------
# GET /products
# --------------------------------

@app.get("/products")
def get_all_products(db:Session=Depends(get_db)):
    products=db.query(Productnew).all()
    return products


# --------------------------------
# GET /product/{id}
# --------------------------------

@app.get("/product/{id}")
def get_selected_product(id: int,db:Session=Depends(get_db)):
    #get products by using the alchemy query 
    product=db.query(Productnew).filter(Productnew.id==id).first()
    
    if product is None:
        raise HTTPException(status_code=404,detail="product not found")
    return product
    
        

    """for product in products:

        if product.id == id:
            return product"""
            

    raise HTTPException(
        status_code=404,
        detail="Product not found"
        
    )


# --------------------------------
# POST /products
# --------------------------------

@app.post("/products")
def add_new_product(product: ProductRequest,db:Session=Depends(get_db)):
    new_product = Productnew(
    name=product.name,
    description=product.description,
    price=product.price,
    image_url=product.image_url
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    existing_product = db.query(Productnew).filter(Productnew.id == id).first()
    if existing_product:
            raise HTTPException(
            status_code=400,
            detail=f"Product with ID {new_product.id} already exists"
        )
    
    return product

@app.put("/product")
def update_product(id:int,product:ProductRequest,db:Session=Depends(get_db)):
    
    #by using the alchemy put 
    product_to_update=db.query(Productnew).filter(Productnew.id==id).first()
    if product_to_update is None:
        raise HTTPException(status_code=404,detail="Product with id: {id }is not present")     
    product_to_update.name=product.name
    product_to_update.description=product.description
    product_to_update.price=product.price
    product_to_update.image_url=product.image_url
    db.commit()
    return product_to_update
    """ for i in range(len(products)):
        if products[i].id==id:
            products[i]=product
            return "Your product updated successfully
        raise HTTPException(
        status_code=404,
        detail="Product not found"
    )
    """
    
@app.patch("/product")
def update_product_name(id:int,product:ProductUpdate,db:Session=Depends(get_db)):
    for i in range(len(products)):
        if products[i].id==id :
            products[i].name=product.name
            return "Your product name updated successfully"
        if product.description is not None:
            products[i].description=product.description
        if product.price is not None:
            products[i].price=product.price
        if product.image_url is not None:
            products[i].image_url=product.image_url
    raise HTTPException(
        status_code=404,
        detail="Product not found"
    )
#Delete
@app.delete("/product")
def delete_product(id:int,db:Session=Depends(get_db)):
    product_to_delete=db.query(Productnew).filter(Productnew.id==id).first()
    if product_to_delete is None:
        raise HTTPException(status_code=404,detail="not found")
    db.delete(product_to_delete)
    db.commit()
    return {"message": "Product deleted successfully"}
    #return product_to_delete
        
    
""" for i in range(len(products)):
        if products[i].id==id:
            del products[i]
            return "Product Deleted"
    raise HTTPException(
        status_code=404,
        detail="Product not found"
    )
    """