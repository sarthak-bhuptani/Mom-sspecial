const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Menu = require('./models/Menu');

dotenv.config();

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:8080", "https://momspecial.netlify.app"],
    credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Seed Data (Initial Menu) - Run once if DB is empty
const initialLunch = [
    { day: "Monday", roti: "✔️", sabji: "Choli Bateta", dal: "Dal", rice: "✔️" },
    { day: "Tuesday", roti: "✔️", sabji: "Guvar Bateta", dal: "Dal", rice: "✔️" },
    { day: "Wednesday", roti: "✔️", sabji: "Choli Pulses", dal: "Dal", rice: "✔️" },
    { day: "Thursday", roti: "✔️", sabji: "Ringana Bateta", dal: "Dal", rice: "✔️" },
    { day: "Friday", roti: "✔️", sabji: "Vatana Bateta", dal: "Dal", rice: "✔️" },
    { day: "Saturday", roti: "Bajiri no Rotlo", sabji: "Adad ni Dal", dal: "-", rice: "-" },
    { day: "Sunday", roti: "✔️", sabji: "Bhinda", dal: "Dal", rice: "✔️" },
];

const initialDinner = [
    { day: "Monday", roti: "✔️", sabji: "Sev Tameta" },
    { day: "Tuesday", roti: "Thepla", sabji: "Bateta" },
    { day: "Wednesday", roti: "Bhakhri", sabji: "Dahi Tikhari" },
    { day: "Thursday", roti: "✔️", sabji: "Duddhi Bateta" },
    { day: "Friday", roti: "✔️", sabji: "Bhinda" },
    { day: "Saturday", roti: "Bajri Rotlo", sabji: "Bengan ka Bharta" },
    { day: "Sunday", roti: "✔️", sabji: "Sev Tameta" },
];

const initialOptional = [
    { roti: "✔️", sabji: "Dungli Bateta" },
    { roti: "✔️", sabji: "Guvar Bateta" },
    { roti: "✔️", sabji: "Dal Bati" },
    { roti: "✔️", sabji: "Any Seasonal Item" },
];

// Routes

// GET Menu
app.get('/api/menu', async (req, res) => {
    try {
        let menu = await Menu.findOne();
        if (!menu) {
            // Create initial if not exists
            menu = new Menu({
                lunch: initialLunch,
                dinner: initialDinner,
                optional: initialOptional
            });
            await menu.save();
        }
        res.json(menu);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Verify Password Route
app.post('/api/verify', (req, res) => {
    const { password } = req.body;

    if (password === process.env.ADMIN_PASSWORD) {
        return res.json({ success: true });
    } else {
        return res.status(401).json({ success: false, message: "Invalid Password" });
    }
});

// UPDATE Menu (Protected by simple password in body for simplicity as requested "simple")
app.put('/api/menu', async (req, res) => {
    const { password, lunch, dinner, optional } = req.body;

    if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ message: "Invalid Admin Password" });
    }

    try {
        let menu = await Menu.findOne();
        if (!menu) {
            menu = new Menu({});
        }

        if (lunch) menu.lunch = lunch;
        if (dinner) menu.dinner = dinner;
        if (optional) menu.optional = optional;
        menu.lastUpdated = Date.now();

        await menu.save();
        res.json(menu);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
