const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Menu = require('./models/Menu');

// Load environment variables from .env file relative to this script
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:8080", "http://127.0.0.1:5173", "http://127.0.0.1:8080", "https://momspecial.netlify.app"],
    credentials: true
}));
app.use(express.json());

// Connect to MongoDB with fallback URI to prevent crash if undefined
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mom-special';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB connection error:', err.message));

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
    { roti: "✔️", sabji: "Sev Tameta" },
    { roti: "✔️", sabji: "Bhinda" },
    { roti: "✔️", sabji: "Dahi Tikhari" },
    { roti: "✔️", sabji: "Seasonal Shak" },
];

// Fallback local file management if MongoDB is not available
const FALLBACK_FILE = path.join(__dirname, 'menu_fallback.json');

const getFallbackMenu = () => {
    try {
        if (fs.existsSync(FALLBACK_FILE)) {
            const data = fs.readFileSync(FALLBACK_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error('Error reading fallback menu file:', err);
    }
    return {
        lunch: initialLunch,
        dinner: initialDinner,
        optional: initialOptional,
        lastUpdated: new Date()
    };
};

const saveFallbackMenu = (menuData) => {
    try {
        fs.writeFileSync(FALLBACK_FILE, JSON.stringify(menuData, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error('Error writing fallback menu file:', err);
        return false;
    }
};

// Routes

// Welcome and Status Route
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Mom's Special Backend API!",
        status: "Running",
        database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected (Running on Local Fallback Mode)",
        endpoints: {
            getMenu: "GET /api/menu",
            verifyPassword: "POST /api/verify",
            updateMenu: "PUT /api/menu"
        }
    });
});

// Fallback GET /goal endpoint to give a helpful message
app.get('/goal', (req, res) => {
    res.json({
        message: "The /goal command was run successfully in the AI chat! This is a backend HTTP endpoint; the actual goal processing runs inside your IDE's AI assistant."
    });
});

// GET Menu
app.get('/api/menu', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
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
            return res.json(menu);
        } else {
            console.log('MongoDB not connected, serving from local fallback file');
            const menu = getFallbackMenu();
            return res.json(menu);
        }
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
        if (mongoose.connection.readyState === 1) {
            let menu = await Menu.findOne();
            if (!menu) {
                menu = new Menu({});
            }

            if (lunch) menu.lunch = lunch;
            if (dinner) menu.dinner = dinner;
            if (optional) menu.optional = optional;
            menu.lastUpdated = Date.now();

            await menu.save();
            return res.json(menu);
        } else {
            console.log('MongoDB not connected, saving to local fallback file');
            const menu = getFallbackMenu();
            if (lunch) menu.lunch = lunch;
            if (dinner) menu.dinner = dinner;
            if (optional) menu.optional = optional;
            menu.lastUpdated = new Date();

            saveFallbackMenu(menu);
            return res.json(menu);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
