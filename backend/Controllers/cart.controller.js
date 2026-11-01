const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const Cart = require("../Models/cart.model");
const ErrorHandler = require("../Utils/handleError");

const addToCart = catchAsyncErrors(async (req, res, next) => {
    const effectiveUserId = req.user.id;
    const { id } = req.params;
    let message = 'Added to Cart';

    if (!id) {
        return next(new ErrorHandler('Product ID is required', 400));
    }

    let cart = await Cart.findOne({ user: effectiveUserId });

    if (!cart) {
        cart = new Cart({
            products: [{ product: id, quantity: 1 }],
            user: effectiveUserId
        });
    } else {
        const productInCart = cart.products.find((p) => p.product.toString() === id);

        if (productInCart) {
            productInCart.quantity += 1;
            message = 'Item quantity increased in cart';
        } else {
            cart.products.push({ product: id, quantity: 1 });
        }
    }

    await cart.populate('products.product');

    cart.totalProducts = cart.products.reduce((acc, item) => acc + item.quantity, 0);
    cart.totalPrice = cart.products.reduce((acc, item) => {
        const price = item.product?.price || 0;
        return acc + (price * item.quantity);
    }, 0);

    await cart.save();

    // Return only the current user's cart in array format for frontend compatibility
    const item = await Cart.find({ user: effectiveUserId }).populate('products.product');

    return res.status(200).json({
        success: true,
        message,
        item
    });
});

const removeFromCart = catchAsyncErrors(async (req, res, next) => {
    const effectiveUserId = req.user.id;
    const { id } = req.params;

    if (!id) {
        return next(new ErrorHandler('Product ID is required', 400));
    }

    let cart = await Cart.findOne({ user: effectiveUserId });

    if (!cart) {
        return res.status(404).json({
            success: false,
            message: "Cart not found"
        });
    }

    const product = cart.products.find((p) => p.product.toString() === id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found in cart'
        });
    }

    if (product.quantity <= 1) {
        cart.products = cart.products.filter((p) => p.product.toString() !== id);
    } else {
        product.quantity -= 1;
    }

    await cart.populate('products.product');

    cart.totalPrice = cart.products.reduce((acc, item) => {
        const price = item.product?.price || 0;
        return acc + (price * item.quantity);
    }, 0);

    cart.totalProducts = cart.products.reduce((acc, item) => acc + item.quantity, 0);

    await cart.save();

    const item = await Cart.find({ user: effectiveUserId }).populate('products.product');

    return res.status(200).json({
        success: true,
        message: 'Cart updated',
        item
    });
});

const cartItems = catchAsyncErrors(async (req, res, next) => {
    const effectiveUserId = req.user.id;
    const item = await Cart.find({ user: effectiveUserId }).populate('products.product');

    return res.status(200).json({
        success: true,
        message: "All Cart items",
        item
    });
});

const removeProduct = catchAsyncErrors(async (req, res, next) => {
    const effectiveUserId = req.user.id;
    const { id } = req.params;

    if (!id) {
        return next(new ErrorHandler('Product ID is required', 400));
    }

    let cart = await Cart.findOne({ user: effectiveUserId });

    if (!cart) {
        return res.status(404).json({
            success: false,
            message: "Cart not found"
        });
    }

    cart.products = cart.products.filter((p) => p.product.toString() !== id);

    await cart.populate('products.product');

    cart.totalPrice = cart.products.reduce((acc, item) => {
        const price = item.product?.price || 0;
        return acc + (price * item.quantity);
    }, 0);

    cart.totalProducts = cart.products.reduce((acc, item) => acc + item.quantity, 0);

    await cart.save();

    const item = await Cart.find({ user: effectiveUserId }).populate('products.product');

    return res.status(200).json({
        success: true,
        message: 'Product removed from cart',
        item
    });
});

const deleteCart = catchAsyncErrors(async (req, res, next) => {
    const effectiveUserId = req.user.id;
    await Cart.deleteOne({ user: effectiveUserId });

    return res.status(200).json({
        success: true,
        message: 'Cart cleared successfully'
    });
});

module.exports = { addToCart, removeFromCart, cartItems, removeProduct, deleteCart };
