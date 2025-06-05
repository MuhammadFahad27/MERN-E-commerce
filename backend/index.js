
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const env = require('dotenv').config({})
const app = express()
// app.use(cors({
//     origin:process.env.FRONTEND_URL,
//     credentials:true
// }))
app.use(cors({
  origin: true, // or specific origins
  credentials: true // THIS IS CRUCIAL FOR JWT
}));

mongoose.connect(process.env.MONGO_DB_URL, {
    connectTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000, // 45 seconds
})
.then(() => console.log("MongoDB Connected!"))
.catch(err => console.error("MongoDB Connection Error:", err));



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
    




