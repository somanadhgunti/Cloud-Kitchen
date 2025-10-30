const mongoose = require('mongoose');

// Schema for individual items within an order
const orderItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const orderSchema = mongoose.Schema(
    {
        orderId: { type: String, required: true, unique: true }, 
        brand: { type: String, required: true },
        items: [orderItemSchema],
        total: { type: Number, required: true },
        status: { 
            type: String, 
            required: true, 
            enum: ['Pending', 'Preparing', 'Ready for Pickup', 'Delivered', 'Cancelled'],
            default: 'Pending',
        },
        // Captures basic info for the order
        customerInfo: {
            name: { type: String },
            address: { type: String },
            phone: { type: String },
            email: { type: String },
        }
    },
    { timestamps: true } 
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;