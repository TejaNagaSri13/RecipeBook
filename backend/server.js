import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const router = express.Router();
app.use("/", router);
const PORT = process.env.PORT || 3000;
const SECRET_KEY = "supersecretkey";// Change this in production

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
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body; // ✅ Include email

    const userExists = await UserModel.findOne({ email }); // ✅ Check by email
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ email, username, password: hashedPassword }); // ✅ Save email
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});


//login page
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // ✅ Use email instead of username
    const user = await UserModel.findOne({ email }); // ✅ Search by email

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, userID: user._id });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// 📌 **Middleware: Verify JWT Token**
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    req.user = decoded;
    next();
  });
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
