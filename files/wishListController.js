const express = require('express');
const router = express.Router();
const WishlistItem = require('../models/wishlistItem');

// GET user's wishlist
router.get('/wishlists', async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in request after authentication
        const wishlist = await WishlistItem.find({ user: userId });
        res.json(wishlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create new wishlist item
router.post('/wishlists', async (req, res) => {
    const wishlistItem = new WishlistItem({
        user: req.user.id, // Assuming user ID is available in request after authentication
        itemName: req.body.itemName
    });
    try {
        const newItem = await wishlistItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE remove wishlist item by ID
router.delete('/wishlists/:id', async (req, res) => {
    try {
        await WishlistItem.findByIdAndRemove(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
