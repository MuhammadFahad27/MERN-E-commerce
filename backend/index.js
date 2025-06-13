const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { HandleError } = require('./Middlewares/error');
const env = require('dotenv').config({});
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: true, 
  credentials: true
}));

mongoose.connect(process.env.MONGO_DB_URL, {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

  
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });

})
.catch(err => {
  console.error("MongoDB Connection Error:", err);
});
