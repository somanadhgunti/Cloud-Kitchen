const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors'); 

// Import Models
const User = require('./models/userModel');
const Brand = require('./models/BrandModel');
const Post = require('./models/PostModel');
const Order = require('./models/OrderModel');

// Import Mock Data 
// NOTE: Make sure you have copied src/data/mock.js to backend/data/mock.js
const { BRANDS, POSTS, ADMIN_CREDENTIALS, INITIAL_ORDERS } = require('./data/mock'); 

// Configuration
dotenv.config();
const connectDB = require('./config/db');
connectDB();

// --- Data Preparation ---
const adminUser = {
    name: 'Admin User',
    email: 'admin@cloudkitchen.com',
    password: ADMIN_CREDENTIALS.password, // password123 from your mock data
    isAdmin: true,
};

const initialOrders = INITIAL_ORDERS.map(order => ({
    ...order,
    orderId: order.id, 
}));

const initialBrands = BRANDS.map(brand => ({
    ...brand,
    brandId: brand.id, 
}));

const initialPosts = POSTS.map(post => ({
    ...post,
    slug: post.id,
    // Add dummy content for full blog view
    content: `This is the full content for the post: ${post.title}. This MERN stack is ready to go!`, 
}));


// --- Import Data Function ---
const importData = async () => {
    try {
        await Order.deleteMany();
        await Brand.deleteMany();
        await Post.deleteMany();
        await User.deleteMany();
        console.log('Data destroyed!'.red.inverse);

        await Brand.insertMany(initialBrands);
        await Post.insertMany(initialPosts);
        await Order.insertMany(initialOrders);

        // This creates the Admin user with the password being hashed automatically
        await User.create(adminUser);

        console.log('Data imported successfully!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`Error during import: ${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Brand.deleteMany();
        await Post.deleteMany();
        await User.deleteMany();

        console.log('Data destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}