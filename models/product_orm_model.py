#here Base tells the sqlalchemy that this class will going to be a database model 
#here the Product is Sqlalchemy Model
#create the Product ORM model

from database import Base
from sqlalchemy import Column,table,DATE,String,INTEGER,Text ,DECIMAL
#this is SQLAlchmey Python class (special class)
#table creation in alchemy
class Productnew(Base):
    
    __tablename__="products"
    id=Column(INTEGER,primary_key=True,autoincrement=True)
    name=Column(String(100))
    description=Column(Text(300))
    price=Column(DECIMAL(10,2))
    image_url = Column(String(500), nullable=True)
    