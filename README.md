# 🎨 Artify - Paintings Store

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black.svg)](https://vercel.com/)

Artify is a full-stack E-Commerce application designed for buying and selling fine art and paintings. Built using the MERN stack (MongoDB, Express, React, Node.js), it features a seamless shopping experience with product filtering, cart management, wishlist functionality, and a secure checkout process.

## Live Demo
- **Frontend**: [https://artify-client.vercel.app](https://arify-frontend.vercel.app/)<br>
- **Backend API**: [https://major-project-1-mauve.vercel.app](https://major-project-1-mauve.vercel.app/)

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
- **Visual Hero Carousel**: Engaging landing page with curated art collections.
- **Advanced Filtering Engine**: Filter artworks by Category, Price Range, and Star Rating simultaneously.
- **Global Search**: Instant text-based search for painting names, artists, or descriptions.
- **Smart Sorting**: Sort collections by Price (Low-High / High-Low).

### Dynamic Cart & Wishlist Engine
- **Real-time Calculations**: Automatic computation of subtotals, discounts (50% OFF logic), and delivery charges.
- **Persistent Wishlist**: Move items between Cart and Wishlist seamlessly.
- **Stock Management**: Quantity adjusters preventing invalid inputs.
- **Empty State Handling**: Custom UI for empty carts with "Shop Now" redirection.

### Checkout & Order Management
- **Address Book System**: Full CRUD (Create, Read, Update, Delete) for shipping addresses.
- **Order Summary**: "Sticky" price details sidebar ensuring visibility during checkout.
- **Order History**: Chronological list of past orders with status badges (Placed, Delivered) and detailed item breakdowns.

### Product Details (Super Feature)
- **Related Products**: A recommendation engine suggesting similar paintings based on the current view.
- **Size Selection**: Dynamic size toggles for artworks.
- **Status Indicators**: Visual cues for "In Cart" or "In Wishlist" directly on the product page.

## API Reference
### GET /api/products
Fetch all products. Supports query parameters for filtering.<br>
Query Params: category, search, minPrice, maxPrice.<br>
Sample Response:
```
{ "_id": "...", "name": "Abstract Waves", "price": 12000, "category": "..." }
```

### GET /api/products/:id
Fetch a single product's detailed metadata, including available sizes and artist info.

### GET /api/carts
Fetch the current user's active shopping cart with populated product details.

### POST /api/orders
Place a new order. Clears the cart upon success.<br>
Sample Response:
```
{
  "shippingAddressId": "65b...",
  "items": [{ "product": "...", "quantity": 1 }],
  "totalAmount": 15499
}
```

### GET /api/orders
Fetch order history for the logged-in user, sorted by newest first.


### POST /api/address
Add a new shipping address to the user's profile.

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