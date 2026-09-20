# Product Management System

A full-stack Product Management System built with **React + Vite** for the frontend and **FastAPI + SQLAlchemy + MySQL** for the backend.

The application allows users to manage products through a modern web interface and REST APIs. Products are stored persistently in a MySQL database.

---

## 📌 Project Overview

This project was developed to learn and implement a complete full-stack application workflow:

```
React Frontend
      ↓
   Axios API
      ↓
FastAPI Backend
      ↓
SQLAlchemy ORM
      ↓
MySQL Database
```

The frontend provides the user interface, FastAPI handles HTTP requests and business logic, SQLAlchemy communicates with MySQL, and MySQL stores the product data permanently.

## ✨ Features

- Add new products
- View all products
- View a product by ID
- Update existing products
- Delete products
- Automatically generated product IDs
- Product name, description and price
- Product image URL support
- Product image preview
- Search products
- Responsive product-card interface
- Loading states
- Delete confirmation
- Toast notifications
- REST API documentation through FastAPI Swagger UI
- MySQL persistent storage
- SQLAlchemy ORM for database operations
- CORS support for React frontend

## 🛠️ Technology Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- Lucide React
- JavaScript
- React Functional Components
- React Hooks (useState, useEffect)

### Backend
- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- PyMySQL
- Pydantic

### Database
- MySQL

### Development Tools
- Visual Studio Code
- Git
- GitHub
- MySQL

## 📂 Project Structure

### Frontend

```
product-management-frontend/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductModal.jsx
│   │   ├── DeleteConfirmModal.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   └── Toast.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
└── vite.config.js
```

### Backend

```
FastAPI/
│
├── main.py
├── database.py
├── models.py
├── schemas.py
├── fastapi_project/
└── ...
```

## 🗄️ Database

The project uses a MySQL database named:

```
product_management
```

The main table is:

```
products
```

### Product Table

| Column      | Type          | Description                     |
|-------------|---------------|---------------------------------|
| id          | INT           | Primary key, auto-increment     |
| name        | VARCHAR(100)  | Product name                    |
| description | TEXT          | Product description             |
| price       | DECIMAL(10,2) | Product price                   |
| image_url   | VARCHAR(500)  | Optional product image URL      |

The `id` is generated automatically by MySQL when a new product is inserted.

## 🔌 API Endpoints

The backend currently uses the following endpoints.

### 1. Get All Products

```
GET /products
```

Returns all products.

### 2. Get Product by ID

```
GET /product?id={id}
```

Example:

```
GET /product?id=1
```

### 3. Create Product

```
POST /products
```

Request body:

```json
{
  "name": "Laptop",
  "description": "Business laptop",
  "price": 55000,
  "image_url": "https://example.com/laptop.jpg"
}
```

The `id` is not provided by the frontend because MySQL generates it automatically.

### 4. Update Product

```
PUT /product?id={id}
```

Example:

```
PUT /product?id=1
```

Request body:

```json
{
  "name": "Updated Laptop",
  "description": "Updated description",
  "price": 60000,
  "image_url": "https://example.com/laptop.jpg"
}
```

### 5. Delete Product

```
DELETE /product?id={id}
```

Example:

```
DELETE /product?id=1
```

## 📖 API Documentation

FastAPI automatically provides interactive API documentation.

After starting the backend, open:

```
http://localhost:8000/docs
```

You can use Swagger UI to test the API endpoints directly.

## 🚀 Installation and Setup

### Prerequisites

Make sure the following are installed:

- Python
- Node.js and npm
- MySQL
- Git
- Visual Studio Code

### 🔹 Backend Setup

Navigate to the backend project:

```bash
cd D:\Placement\FastAPI
```

Create/activate the virtual environment if required:

```bash
fastapi_project\Scripts\activate
```

Install the required Python packages:

```bash
pip install fastapi uvicorn sqlalchemy pymysql
```

#### Configure MySQL

Create the database:

```sql
CREATE DATABASE product_management;
```

Select it:

```sql
USE product_management;
```

Create the `products` table:

```sql
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2),
    image_url VARCHAR(500)
);
```

Example database connection:

```
mysql+pymysql://root:root@localhost:3306/product_management
```

> Do not commit real database passwords or secrets to GitHub. Use environment variables for sensitive configuration in a production application.

#### Run FastAPI

From the backend directory:

```bash
uvicorn main:app --reload
```

The backend will normally run at:

```
http://127.0.0.1:8000
```

Swagger documentation:

```
http://127.0.0.1:8000/docs
```

### 🔹 Frontend Setup

Open another terminal and navigate to:

```bash
cd D:\Placement\FastAPI\product-management-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL, for example:

```
http://localhost:5174
```

The port may be different if the default Vite port is already being used.

### 🔔 Frontend API Configuration

The Axios service is located at:

```
src/services/api.js
```

For local development, the backend base URL is:

```js
baseURL: "http://localhost:8000"
```

The frontend communicates with FastAPI through Axios.

### 🔐 CORS Configuration

Because the frontend and backend run on different ports, FastAPI needs CORS configuration.

Example:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

For production, it is better to allow only the specific frontend domain.

## 🧠 How the Application Works

### Creating a Product

```
User
 ↓
React Form
 ↓
Axios POST request
 ↓
FastAPI
 ↓
Pydantic validation
 ↓
SQLAlchemy ORM
 ↓
MySQL
 ↓
Auto-generated Product ID
 ↓
Response to React
 ↓
Product displayed in UI
```

### Reading Products

```
React
 ↓
GET /products
 ↓
FastAPI
 ↓
SQLAlchemy
 ↓
MySQL
 ↓
Product records
 ↓
JSON response
 ↓
React Product Cards
```

### Updating a Product

```
User clicks Edit
 ↓
React loads product information
 ↓
User changes data
 ↓
PUT request
 ↓
FastAPI
 ↓
SQLAlchemy finds product by ID
 ↓
Database record updated
 ↓
MySQL COMMIT
 ↓
Updated product returned
```

### Deleting a Product

```
User clicks Delete
 ↓
Confirmation modal
 ↓
DELETE request
 ↓
FastAPI
 ↓
SQLAlchemy finds product by ID
 ↓
db.delete()
 ↓
db.commit()
 ↓
Product removed from MySQL
```

## 🧩 Important Concepts Learned

This project demonstrates practical understanding of:

- Client-server architecture
- REST APIs
- HTTP methods
- FastAPI
- Pydantic request validation
- Dependency Injection
- SQLAlchemy ORM
- SQLAlchemy sessions
- CRUD operations
- MySQL
- Primary keys
- Auto-increment IDs
- Database persistence
- Axios
- React Hooks
- Component-based architecture
- CORS
- API testing with Swagger
- Frontend-backend integration

## 🏗️ Architecture

```
                    PRODUCT MANAGEMENT SYSTEM

┌──────────────────────────────────────────────┐
│                 React Frontend               │
│                                              │
│  Navbar → Product Grid → Product Cards       │
│                    ↓                         │
│              Product Modal                   │
└──────────────────────┬───────────────────────┘
                       │
                       │ Axios / HTTP
                       ▼
┌──────────────────────────────────────────────┐
│                 FastAPI Backend              │
│                                              │
│  API Routes → Pydantic → SQLAlchemy          │
└──────────────────────┬───────────────────────┘
                       │
                       │ SQLAlchemy + PyMySQL
                       ▼
┌──────────────────────────────────────────────┐
│                  MySQL                       │
│                                              │
│              products table                  │
└──────────────────────────────────────────────┘
```

## 📸 Screenshots

You can add project screenshots here.

Example:

```
screenshots/
├── dashboard.png
├── add-product.png
├── edit-product.png
└── swagger-api.png
```

Then reference them using:

```markdown
![Dashboard](screenshots/dashboard.png)
```

## 🔮 Future Improvements

Possible future enhancements:

- User authentication and authorization
- Admin dashboard
- Product categories
- Inventory/stock management
- Pagination
- Advanced filtering
- Sorting
- Image upload instead of image URLs
- Environment variables for configuration
- Automated testing
- Docker support
- CI/CD pipeline
- Cloud deployment

## 🎯 Learning Objective

The main objective of this project was to understand how a modern frontend communicates with a Python backend and how the backend performs persistent database operations using an ORM.

The complete flow is:

```
Frontend
   ↓
API
   ↓
Backend
   ↓
ORM
   ↓
Database
```

## 👩‍💻 Author

**Dipali Gaikwad**

MCA Student | Software Development & AI Enthusiast

### Technologies Explored
- Python
- FastAPI
- SQLAlchemy
- MySQL
- React
- JavaScript
- REST APIs
- AI/ML

## 📄 License

This project is created for educational and portfolio purposes.