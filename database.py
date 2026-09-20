from sqlalchemy import create_engine,MetaData,Table,Column
from sqlalchemy.orm import sessionmaker,declarative_base
Database_URL="mysql+pymysql://root:root@localhost:3306/product_management"
engine=create_engine(Database_URL)
#Dont write raw sql code instead of that use the classes(metadata important class ) inside the sqlalchemy
#metadata class keeps the information about the tables,columns and constraints
try:
    with engine.connect() as connection:
        print("Database connection with MySQL has done successfully")
except Exception as e:
    print("Database connection with MySQL has failed")
#session to interact with the ORM (Like sql query to insteract with the tables)
#here we used the local variable to store the sessionmaker object and we pass the engine means a connection
#to create the session objects we the sessionmaker function 
sessionLocal=sessionmaker(bind=engine)
#db is the global session variable used to make the session for all the requests and same for all the users/states or requests

#db=sessionLocal()
"""one global session cannot be good for the thread safety ,information may get steal,transactions not gets isolated,memory leak problem is there and connection pooling problem and concurrency will not be maintained.
Hence maintain one session for one unit of work .One session can make the one transaction and make the data isolated from each transaction"""
#Dependancy Injection 
def get_db():
    db=sessionLocal()
    try:
       yield db
    finally:
        db.close()
        
"""sessionLocal() → CREATES the Session
Session→ TYPE of the Session(imported in fastapi main.py)
Depends(get_db)→ TELLS FastAPI where to GET the Session"""
#create the ORM model 
#make first the Base Object

Base=declarative_base()

    
