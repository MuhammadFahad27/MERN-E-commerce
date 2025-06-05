
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const env = require('dotenv').config({})
const app = express()

const express = require('express');
const cors = require('cors');


const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000'
].filter(Boolean); 

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or curl) or from allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));




mongoose.connect(process.env.MONGO_DB_URL)
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
    




