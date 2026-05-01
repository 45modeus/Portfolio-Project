const express = require("express");
const Booking = require("../models/Bookings");
const Message = require("../models/Messages");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

const path = require("path");

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

/* -----------------------------
   ADMIN CONFIG
----------------------------- */
const ADMIN = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "testpassword"
};

/* -----------------------------
   CORS CONFIG
----------------------------- */
const allowedOrigins = [
  "http://localhost:3000",
  "https://island-escape-sy8e.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.some(o => origin.startsWith(o))) {
      return callback(null, true);
    }

    return callback(null, true); // fallback safe
  },
  credentials: true,
  methods: ["GET", "POST", "DELETE"]
}));

app.use(express.json());

/* -----------------------------
   DB CONNECTION
----------------------------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log(err));

/* -----------------------------
   JWT VERIFY
----------------------------- */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

/* -----------------------------
   ROUTES
----------------------------- */

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Backend running ✅" });
});

/* LOGIN */
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN.username) {
    return res.status(401).json({ message: "Invalid username" });
  }

  if (password !== ADMIN.password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({ token });
});

/* CONTACT */
app.post("/contact", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();

    res.json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error sending message" });
  }
});

/* BOOKING */
app.post("/book", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();

    res.json({ message: "Booking made successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving booking" });
  }
});

/* ADMIN PROTECTED ROUTES */

// Get bookings
app.get("/bookings", verifyToken, async (req, res) => {
  const bookings = await Booking.find().sort({ _id: -1 });
  res.json(bookings);
});

// Get messages
app.get("/messages", verifyToken, async (req, res) => {
  const messages = await Message.find().sort({ _id: -1 });
  res.json(messages);
});

// Delete booking
app.delete("/bookings/:id", verifyToken, async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Booking deleted" });
});

// Delete message
app.delete("/messages/:id", verifyToken, async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ message: "Message deleted" });
});

/* -----------------------------
   START SERVER
----------------------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});