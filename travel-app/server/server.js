const express = require("express");
const Booking = require("../models/Bookings");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Message = require("../models/Messages");

const ADMIN = {
  username: "admin",
  password: bcrypt.hashSync("123456", 10)
};

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//middleware to verify token

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // remove "Bearer"

  try {
    jwt.verify(token, "SECRET_KEY_123");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// POST REQUESTS

// Route
app.post("/contact", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();

    res.json({ message: "Message saved in DB" });
  } catch (err) {
    res.status(500).json({ message: "Error Saving Message" });
  }
});

//admin
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN.username) {
    return res.status(401).json({ message: "Invalid username" });
  }

  const isMatch = await bcrypt.compare(password, ADMIN.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { username },
    "SECRET_KEY_123",
    { expiresIn: "2h" }
  );

  res.json({ token });
});
// Booking
app.post("/book", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();

    console.log("Booking saved:", newBooking);

    res.json({ message: "Booking saved in database!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving booking" });
  }
});

// GET REQUESTS

// Get all bookings
app.get("/bookings", verifyToken, async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// Get all messages
app.get("/messages", verifyToken, async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

// Delete all bookings
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

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});