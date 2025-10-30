// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Order = require('../models/OrderModel');
const { protect } = require('../middleware/authMiddleware'); 

// Helper to generate next sequential Order ID (FIXED LOGIC)
const getNextOrderId = async () => {
    // 1. Use aggregation to find the highest numeric part of the orderId
    const maxOrder = await Order.aggregate([
        { 
            $project: {
                // Extract the numeric part of the orderId string ("CKO-00X")
                orderNum: { $toInt: { $substr: ["$orderId", 4, -1] } } 
            }
        },
        { $sort: { orderNum: -1 } }, // Sort descending to put the highest number first
        { $limit: 1 } // Take only the highest one
    ]);
    
    // 2. Determine the starting point
    let lastNumber = 0;
    if (maxOrder && maxOrder.length > 0) {
        lastNumber = maxOrder[0].orderNum;
    }
    
    // 3. Calculate the new sequential ID and pad it to three digits
    const nextNumber = lastNumber + 1;
    return `CKO-${String(nextNumber).padStart(3, '0')}`;
};


// @desc    Place a new order
// @route   POST /api/orders
// @access  Public
router.post('/', asyncHandler(async (req, res) => {
    const { brand, items, total, customerInfo } = req.body;

    // CRITICAL VALIDATION CHECK
    if (!brand || !items || items.length === 0 || !total) {
        res.status(400);
        throw new Error('Order data missing required fields (brand, items, or total).');
    }

    // Generate the unique, sequential Order ID using the fixed logic
    const orderId = await getNextOrderId(); 

    const newOrder = new Order({
        orderId,
        brand,
        // Ensure total is a number (safety check)
        total: typeof total === 'string' ? parseFloat(total) : total, 
        items,
        customerInfo: customerInfo || { name: "Guest", email: "guest@example.com" }, 
        status: 'Pending', 
    });

    try {
        const createdOrder = await newOrder.save();
        
        // Success response (201 Created)
        res.status(201).json({ orderId: createdOrder.orderId }); 

    } catch (error) {
        // Log the Mongoose error details to the backend console
        console.error("Mongoose DB SAVE FAILURE (Order Routes):", error.message);
        
        // Send a generic 500 error response to the frontend
        res.status(500).json({ message: 'Internal Server Error: Failed to save order.' });
        return; 
    }
}));


// @desc    Get all orders (Admin Dashboard)
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', protect, asyncHandler(async (req, res) => {
    const orders = await Order.find({}).sort({ createdAt: -1 }); 
    res.json(orders);
}));

// @desc    Update order status (Admin Dashboard action)
// @route   PUT /api/orders/:orderId/status
// @access  Private/Admin
router.put('/:orderId/status', protect, asyncHandler(async (req, res) => {
    const { newStatus } = req.body;
    
    const order = await Order.findOne({ orderId: req.params.orderId });

    if (order) {
        order.status = newStatus;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
}));


module.exports = router;