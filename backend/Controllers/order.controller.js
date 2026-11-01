const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const Order = require("../Models/order.model");
const ErrorHandler = require("../Utils/handleError");
const Product = require('../Models/product.model');

const createOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        name,
        country,
        address,
        phone,
        city,
        orderItems,
        paymentMethod,
        shippingMethod
    } = req.body;

    const userId = req.user?.id || req.body.user;

    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
        return next(new ErrorHandler('Order must contain at least one item', 400));
    }

    if (!name || !address || !phone || !city) {
        return next(new ErrorHandler('Shipping details (name, address, phone, city) are required', 400));
    }

    // Server-side verification of products and recalculation of total price to prevent price tampering
    let calculatedTotalPrice = 0;
    let validatedOrderItems = [];

    for (const item of orderItems) {
        const productId = item.product?._id || item.product || item._id;
        const requestedQuantity = Number(item.quantity) || 1;

        const dbProduct = await Product.findById(productId);
        if (!dbProduct) {
            return next(new ErrorHandler(`Product not found: ${productId}`, 404));
        }

        if (dbProduct.stock < requestedQuantity) {
            return next(new ErrorHandler(`Insufficient stock for "${dbProduct.name}". Only ${dbProduct.stock} remaining.`, 400));
        }

        // Deduct inventory stock
        dbProduct.stock -= requestedQuantity;
        await dbProduct.save({ validateBeforeSave: false });

        const itemTotal = dbProduct.price * requestedQuantity;
        calculatedTotalPrice += itemTotal;

        validatedOrderItems.push({
            product: dbProduct._id,
            name: dbProduct.name,
            price: dbProduct.price,
            quantity: requestedQuantity,
            image: dbProduct.images?.[0] || item.image || 'https://via.placeholder.com/150'
        });
    }

    const order = await Order.create({
        name,
        country: country || 'Default',
        address,
        phone,
        city,
        user: userId,
        totalPrice: calculatedTotalPrice,
        totalProducts: validatedOrderItems.reduce((acc, i) => acc + i.quantity, 0),
        orderItems: validatedOrderItems,
        shippingMethod: shippingMethod || 'Standard',
        paymentMethod: paymentMethod || 'Cash On Delivery',
        orderStatus: 'processing'
    });

    return res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        order
    });
});

// For customer: get single order details
const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const orderId = req.params.id;

    if (!orderId) {
        return next(new ErrorHandler('Order ID is required', 400));
    }

    const order = await Order.findById(orderId).populate('user', 'username email');

    if (!order) {
        return next(new ErrorHandler('Order not found', 404));
    }

    // Ensure non-admins only see their own orders
    if (req.user.role !== 'admin' && order.user?._id?.toString() !== req.user.id?.toString()) {
        return next(new ErrorHandler('Unauthorized access to this order', 403));
    }

    return res.status(200).json({
        success: true,
        message: 'Order found',
        order
    });
});

// For customer: get all their orders
const getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        message: 'All Orders',
        order: orders
    });
});

// For admin: get all platform orders
const Orders = catchAsyncErrors(async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(new ErrorHandler('Unauthorized: Admin access required', 403));
    }

    const orders = await Order.find().populate('user', 'username email').sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        Orders: orders
    });
});

// For admin: update order status
const updateStatus = catchAsyncErrors(async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(new ErrorHandler('Unauthorized: Admin access required', 403));
    }

    const { id } = req.params;
    const { orderStatus } = req.body;

    if (!id || !orderStatus) {
        return next(new ErrorHandler('Order ID and status are required', 400));
    }

    const order = await Order.findByIdAndUpdate(
        id,
        { orderStatus },
        { new: true, runValidators: true }
    );

    if (!order) {
        return next(new ErrorHandler('Order not found', 404));
    }

    return res.status(200).json({
        success: true,
        message: 'Order status updated successfully',
        order
    });
});

module.exports = { createOrder, getSingleOrder, getAllOrders, Orders, updateStatus };
