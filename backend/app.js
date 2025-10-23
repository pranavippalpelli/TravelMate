

// backend/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const listingsRouter = require("./routes/listings");
const authRouter = require("./routes/auth");
const reviewsRouter = require("./routes/reviews");
const bookingsRouter = require("./routes/bookings");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000", credentials: true }));

// MongoDB
mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/TravelMate").then(() => console.log("✅ Connected to DB"));

// Routes
app.use("/api/listings", listingsRouter);
app.use("/api/auth", authRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/bookings", bookingsRouter);

app.get("/", (req, res) => res.json({ message: "API running..." }));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

