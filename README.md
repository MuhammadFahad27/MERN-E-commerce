🛍️ MERN Stack E-Commerce Platform
A full-featured MERN stack e-commerce web application with advanced user and admin functionalities, modern UI with Tailwind CSS, secure authentication using JWT, efficient global state management using Redux Toolkit, and robust REST APIs.
Tech Stack
Frontend: React.js, Tailwind CSS, Redux Toolkit
Backend: Node.js, Express.js
Database: MongoDB 
Authentication: JSON Web Token (JWT)
APIs: RESTful API Architecture
🔒 Authentication & Security
Secure user login and registration using JWT tokens
Protected routes for users and admins
Token stored securely in HTTP-only cookies
👥 User Features
🛍️ Browse Products: View all available products with details
🔎 Search & Filter: Search by product name, filter by category, sort by price, rating, etc.
🛒 Add to Cart: Easily add/remove items from cart
📦 Place Orders: Order products securely
👤 Profile Management: Update profile information and change password
🚚 Track Orders: See all orders with status updates (Pending, Shipped, Delivered, etc.)
⭐ Product Reviews:
Leave reviews and ratings for purchased products
View reviews from other customers
🛠️ Admin Panel Features
📦 Product Management:
Add, edit, or delete products (CRUD)
📂 Category Management:
Create, update, and delete categories
👥 User Management:
View all users
Read and delete users/customers
📦 Order Management:
View and manage all orders
Update order status (Processing, Shipped, Delivered, Cancelled)
⭐ Review Moderation:
View all reviews for every product
Delete inappropriate or abusive reviews
├── frontend              # React frontend
│   ├── components
│   ├── pages
│   ├── redux
│   ├── Hooks
│   └── ...
├── backend             # Node.js backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   └── ...
├── .env
├── package.json
└── README.md


