// backend/routes/brandRoutes.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Brand = require('../models/BrandModel');

// @desc    Get all brands
// @route   GET /api/brands
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    const brands = await Brand.find({});
    res.json(brands);
}));

// @desc    Get a single brand by ID
// @route   GET /api/brands/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
    const brand = await Brand.findOne({ brandId: req.params.id });

    if (brand) {
        res.json(brand);
    } else {
        res.status(404);
        throw new Error('Brand not found');
    }
}));

module.exports = router;