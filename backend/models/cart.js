const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    items: [
        {
            menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
            quantity: Number
        }
    ]
});

module.exports = mongoose.model('Cart', CartSchema);