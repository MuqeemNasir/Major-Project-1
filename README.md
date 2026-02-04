# 🎨 Artify - Paintings Store

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black.svg)](https://vercel.com/)

Artify is a full-stack E-Commerce application designed for buying and selling fine art and paintings. Built using the MERN stack (MongoDB, Express, React, Node.js), it features a seamless shopping experience with product filtering, cart management, wishlist functionality, and a secure checkout process.

## Live Demo
- **Frontend**: [https://artify-client.vercel.app](https://arify-frontend.vercel.app/)<br>
- **Backend API**: [https://major-project-1-mauve.vercel.app](https://major-project-1-mauve.vercel.app/)

## Environment Setup
To run this project locally, you must configure the following environment variables:
### Backend (/backend/.env)
```
MONGODB_URI=mongodb+srv://neoGStudent:MUqeem786%24@neog.aqqwr1m.mongodb.net/ecommerceDB?retryWrites=true&w=majority&appName=neoG
PORT=3000
NODE_ENV=development
```

### Frontend (/frontend/.env)
```
VITE_API_URL=https://major-project-1-mauve.vercel.app || http://localhost:3000/api/events
```

## Quick Start

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone <https://github.com/MuqeemNasir/Major-Project-1>
cd Major-Project-1

# Setup Backend
cd backend
npm install
npm run start 

# Setup Frontend
cd ../frontend
npm install
npm run dev
```

## Technologies
- React 18 (Vite)
- React Router 6
- Node.js
- Express
- MongoDB
- Mongoose
- Bootstrap 5
- React-Toastify
- Lucide/Fa-React Icons

##  Tech Stack

- **Frontend**: React (Vite), React Router DOM, Axios, Bootstrap 5, React Toastify.<br>
- **Backend**: Node.js, Express.js, Express-Validator, CORS.<br>
- **Database**: MongoDB Atlas with Mongoose ODM.<br>
- **State Management**: React Context API (Cart, Wishlist, Address Contexts) with useReducer patterns.<br>

## Demo Video
Watch a walkthrough of all major features of this app:<br>
[Watch Video Demo](https://drive.google.com/file/d/1mN9LW8A4aw0j3Rrp9NeHKYagmgd_QMFw/view?usp=sharing)

##  Features

### Immersive Gallery (Discovery)
- Showcases curated art collections via an engaging hero carousel.
- Filters artworks simultaneously by category, price range, and star rating.
- Searches instantly for painting names, artists, or descriptions in real-time.
- Sorts collections dynamically by price (Low-High / High-Low).

### Dynamic Cart & Wishlist Engine
- Calculates subtotals, discounts (50% OFF logic), and delivery charges automatically.
- Moves items seamlessly between the shopping cart and wishlist.
- Manages stock quantities to prevent invalid user inputs.
- Redirects users via a custom UI when the shopping cart is empty.

### Checkout & Order Management
- Allows users to create, update, and delete multiple shipping addresses.
- Displays a sticky price summary for constant visibility during checkout.
- Tracks past orders chronologically with status badges and item breakdowns.

### Product Details (Super Feature)
- Recommends similar paintings based on the current product view.
- Enables dynamic size selection for specific artworks.
- Indicates "In Cart" or "In Wishlist" status visually on the product page.

## API Reference
### GET /api/products
Fetch all products.<br>
Query Params: category, search, minPrice, maxPrice.<br>
Sample Response:
```
{ 
    "_id": "65b1...", 
    "name": "Abstract Waves", 
    "price": 12000, 
    "rating": 4.5,
    "image": "https://example.com/art.jpg" 
  },
  { ... }
```

### GET /api/products/:id
Fetch a single product's detailed.<br>
Sample Response:
```
{
  "_id": "65b1...",
  "name": "Abstract Waves",
  "artist": "John Doe",
  "description": "A beautiful representation of ocean waves...",
  "price": 12000,
  "sizes": ["M", "L", "XL"],
  "stock": 5
}
```

### GET /api/carts
Fetch the current user's shopping cart with product details.<br>
Sample Response:
```
{
  "_id": "65c2...",
  "user": "65a1...",
  "items": [
    {
      "product": {
        "_id": "65b1...",
        "name": "Abstract Waves",
        "price": 12000,
        "image": "https://example.com/art.jpg"
      },
      "quantity": 1,
      "size": "L",
      "_id": "65d3..."
    }
  ]
}
```

### POST /api/orders
Place a new order. Clears the cart upon success.<br>
Request Body:
```
{
  "shippingAddressId": "65e4...",
  "items": [
    { "product": "65b1...", "quantity": 1, "size": "L" }
  ],
  "totalAmount": 12499
}
```
Sample Response:
```
{
  "message": "Order Placed Successfully!",
  "order": {
    "_id": "65f5...",
    "status": "placed",
    "totalAmount": 12499
  }
}
```

### GET /api/orders
Fetch order history for the logged-in user.<br>
Sample Response:
```
[
  {
    "_id": "65f5...",
    "createdAt": "2024-02-20T10:00:00Z",
    "status": "placed",
    "totalAmount": 12499,
    "items": [
      {
        "product": { "name": "Abstract Waves", "image": "..." },
        "quantity": 1,
        "priceAtPurchase": 12000
      }
    ]
  }
]
```


### POST /api/address
Add a new shipping address to the user's profile.<br>
Request Body:
```
{
  "label": "Office",
  "name": "Jane Doe",
  "phone": "9876543210",
  "line1": "456 Corp Park",
  "city": "Bangalore",
  "state": "Karnataka",
  "postalCode": "560001",
  "country": "India",
  "isDefault": false
}
```
Sample Response:
```
{
  "message": "Address added successfully",
  "data": {
    "address": {
      "_id": "65f1...",
      "label": "Office",
      "city": "Bangalore",
      "createdAt": "2024-02-21T12:00:00Z"
    }
  }
}
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| ![](https://img.shields.io/badge/GET-0d6efd) | `/api/products` | Fetch all products (supports queries) |
| ![](https://img.shields.io/badge/GET-0d6efd) | `/api/products/:id` | Get single product details |
| ![](https://img.shields.io/badge/GET-0d6efd) | `/api/categories` | Get all product categories |
| ![](https://img.shields.io/badge/GET-0d6efd) | `/api/carts` | Get user's cart |
| ![](https://img.shields.io/badge/POST-198754) | `/api/carts` | Add item to cart |
| ![](https://img.shields.io/badge/GET-0d6efd) | `/api/wishlist` | Get user's wishlist |
| ![](https://img.shields.io/badge/POST-198754) | `/api/orders` | Place a new order |
| ![](https://img.shields.io/badge/GET-0d6efd) | `/api/address` | Get user addresses |

## Folder Structure 

```
Major-Project-1/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── pages/
    │   └── services/
    └── App.jsx
```

## Contact
For bugs or feature requests, please reach out to mac786m@gmail.com