
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const env = require('dotenv').config({})
const app = express()
const path = require('path')
const fs = require('fs');






mongoose.connect(process.env.MONGO_DB_URL)
.then(() => console.log("MongoDB Connected!"))
.catch(err => console.error("MongoDB Connection Error:", err));
app.use(cors({origin:process.env.FRONTEND_URL,credentials:true}))


const { HandleError } = require('./Middlewares/error');
const productRoutes = require('./Routes/product.route');
const categoryRoutes = require('./Routes/category.route');
const authRoutes = require('./Routes/auth.route');
const userRoutes = require('./Routes/user.route');
const orderRoutes = require('./Routes/order.route');
const adminRoutes = require('./Routes/admin.route');
const cartRoutes = require('./Routes/cart.route');



app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

// Routes
app.use('/api/v1', productRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', adminRoutes);
app.use('/api/v1', cartRoutes);
app.use(express.static(path.join(__dirname, '/frontend/dist')));



// Serve frontend only in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, 'frontend', 'dist');
  
  // Check if frontend files exist
  if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(frontendPath, 'index.html'), err => {
        if (err) {
          console.error('Frontend delivery error:', err);
          res.status(500).json({ message: 'Frontend not available' });
        }
      });
    });
  } else {
    console.warn('Production: Frontend build not found at', frontendPath);
  }
}

















// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'), err => {
//     if (err) {
//       console.error('Error sending index.html:', err);
//       res.status(500).send('Something went wrong');
//     }
//   });
// });
app.use(HandleError);
app.listen(process.env.PORT,()=>{
        
        console.log('server running ')
    })
    




