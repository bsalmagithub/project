const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemName: { type: String, required: true },
    // Other wishlist item details
});

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);
