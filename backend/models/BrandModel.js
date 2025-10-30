const mongoose = require('mongoose');

// Schema for individual menu items (embedded)
const menuItemSchema = mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
});

const brandSchema = mongoose.Schema(
    {
        brandId: { type: String, required: true, unique: true }, 
        name: { type: String, required: true },
        desc: { type: String, required: true },
        img: { type: String, required: true },
        menu: [menuItemSchema], // Array of embedded menu items
    },
    { timestamps: true }
);

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;