const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { HandleError } = require('./Middlewares/error');
require('dotenv').config({});

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://mern-e-commerce-2sxf.vercel.app'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive for local development
    }
  },
  credentials: true
}));

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

mongoose.connect(process.env.MONGO_DB_URL, {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log("✅ MongoDB Connected");

  const productRoutes = require('./Routes/product.route');
  const categoryRoutes = require('./Routes/category.route');
  const authRoutes = require('./Routes/auth.route');
  const userRoutes = require('./Routes/user.route');
  const orderRoutes = require('./Routes/order.route');
  const adminRoutes = require('./Routes/admin.route');
  const cartRoutes = require('./Routes/cart.route');

  app.use('/api/v1', productRoutes);
  app.use('/api/v1', categoryRoutes);
  app.use('/api/v1', authRoutes);
  app.use('/api/v1', orderRoutes);
  app.use('/api/v1', userRoutes);
  app.use('/api/v1', adminRoutes);
  app.use('/api/v1', cartRoutes);

  app.use(HandleError);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error("MongoDB Connection Error:", err);
});
