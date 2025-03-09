const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Recipe = require('./models/Recipe');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = "supersecretkey"; // Change this in production

app.use(express.json());
app.use(cors());

// ✅ Check MongoDB Connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ DB connected successfully.."))
    .catch((err) => console.log("❌ DB connection error: ", err));

// ✅ Home Page
app.get('/', (req, res) => {
    res.send("<h1 align=center>Welcome to the Recipe Book API</h1>");
});

//register page
app.post('/register', async (req, res) => {
    console.log("Received Registration Data: ", req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // 🔥 Fix: Ensure password is properly hashed
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        console.log("User registered:", user);

        res.status(201).json({ message: "User Registered Successfully" });
    } catch (err) {
        console.log("Registration Error:", err);
        res.status(500).json({ message: "Error registering user" });
    }
});

//login page
app.post('/login', async (req, res) => {
    console.log("Received Login Data: ", req.body);
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        console.log("❌ User Not Found: ", email);
        return res.status(400).json({ message: "Invalid Credentials" });
    }

    console.log("✅ User Found: ", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log("❌ Password Mismatch!");
        return res.status(400).json({ message: "Invalid Credentials" });
    }

    console.log("✅ Login Successful!");
    const token = jwt.sign({ id: user._id, username: user.username }, "supersecretkey", { expiresIn: "1h" });

    res.json({ message: "Login Successful", token, username: user.username });
});

// 📌 **Middleware: Verify JWT Token**
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// 📌 **Add Recipe API (Protected)**
app.post('/recipes', verifyToken, async (req, res) => {
    try {
        const recipe = new Recipe(req.body);
        await recipe.save();
        res.json({ message: "Recipe Added Successfully!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error adding recipe" });
    }
});

// 📌 **Get All Recipes API**
app.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching recipes" });
    }
});

// 📌 **Start Server**
app.listen(PORT, () => console.log(`🚀 Server is running on port: ${PORT}`));
