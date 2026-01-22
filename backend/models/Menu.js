const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    day: { type: String, required: true }, // Monday, Tuesday, etc.
    sabji: { type: String, default: "" },
    dal: { type: String, default: "" },
    roti: { type: String, default: "✔️" },
    rice: { type: String, default: "✔️" },
    special: { type: String, default: "" } // Optional extra field
});

const MenuSchema = new mongoose.Schema({
    lunch: [MenuItemSchema],
    dinner: [MenuItemSchema],
    optional: [{
        sabji: String,
        roti: String
    }],
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Menu', MenuSchema);
